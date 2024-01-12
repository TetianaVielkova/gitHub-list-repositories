import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col} from 'antd';
import { ref, onValue, off, remove, update, get} from 'firebase/database';
import database from './../../firebaseConfig';
import { boxStyle, colStyle, langStyle, linkStyle, rowStyle, selectStyle } from './CardRepos.style';
import { Loader } from '../Loader/Loader';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import SearchName from '../Search/Search';
import RepositoryDeletion from '../RepositoryDeletion/RepositoryDeletion';
import RepositoryEditing from '../RepositoryEditing/RepositoryEditing';
import PaginationButtons from '../PaginationButtons/PaginationButtons';
import { filterRepositoriesByLanguage } from './../../utils/helpers/filterRepositoriesByLanguage';
import { sortRepositories } from './../../utils/helpers/sortRepositories';
import { updateDisplayedButtons } from '../../utils/helpers/updateDisplayedButtons';
import { handleSearchRepositories } from '../../utils/helpers/searchRepositories';

export default function CardRepos({ data }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [allRepositories, setAllRepositories] = useState(data.user.repositories.edges || []);
  const [filteredLanguages, setFilteredLanguages] = useState(router.query.language || '');
  const [sortingOption, setSortingOption] = useState(router.query.sort || '');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page) || 1);
  const [displayedRepositories, setDisplayedRepositories] = useState([]);
  const [displayedButtons, setDisplayedButtons] = useState([]);
  const [sortedRepositories, setSortedRepositories] = useState([]); 
  const [searchText, setSearchText] = useState(router.query.search || '');
  const [repositoryToDelete, setRepositoryToDelete] = useState(null);

  const repositoriesPerPage = 6;

//==========Add===========================================================================

  useEffect(() => {
    const repositoriesRef = ref(database, 'repositories');
  
    onValue(repositoriesRef, (snapshot) => {
      const fetchedRepositories = [];
      snapshot.forEach((childSnapshot) => {
        const repository = childSnapshot.val();
        fetchedRepositories.push(repository);
      });
  
      setAllRepositories((prevRepositories) => {
        const uniqueRepositories = fetchedRepositories.filter(
          (newRepo) => !prevRepositories.some((existingRepo) => existingRepo.node.id === newRepo.node.id)
        );
        return [...prevRepositories, ...uniqueRepositories];
      });
    });
  
    return () => {
      off(repositoriesRef);
    };
  }, []);
//====================================================================================================
  const handleRepoClick = (name) => {
    setIsLoading(true);
    router.push(`/repositories/${name}`);
  };
  
  useEffect(() => {
    let filtered = handleSearchRepositories(allRepositories, searchText);
    filtered = filterRepositoriesByLanguage(filtered, filteredLanguages);
    const sorted = sortRepositories(filtered, sortingOption);
    const totalFilteredPages = Math.ceil(sorted.length / repositoriesPerPage);
    setTotalPages(totalFilteredPages);
    setCurrentPage((currentPage) => Math.min(currentPage, totalFilteredPages));
    const startIndex = (currentPage - 1) * repositoriesPerPage;
    const endIndex = currentPage * repositoriesPerPage;
    const displayed = sorted.slice(startIndex, endIndex);
    setDisplayedRepositories(displayed);
    setSortedRepositories(sorted);
    setDisplayedButtons(updateDisplayedButtons(totalFilteredPages, currentPage));
    
  }, [allRepositories, filteredLanguages, sortingOption, currentPage, totalPages, searchText]);

  useEffect(() => {
    const { query } = router;
    const currentPageFromQuery = parseInt(query.page) || 1;
    const filteredLanguageFromQuery = query.language || '';
    const sortingOptionFromQuery = query.sort || '';
  
    setCurrentPage(currentPageFromQuery);
    setFilteredLanguages(filteredLanguageFromQuery);
    setSortingOption(sortingOptionFromQuery);
  }, [router]);

  useEffect(() => {
    const query = {};
    if (currentPage > 1) {
      query.page = currentPage;
    }
    if (filteredLanguages !== '') {
      query.language = filteredLanguages;
    }
    if (sortingOption !== '') {
      query.sort = sortingOption;
    }
    if (searchText !== '') {
      query.search = searchText;
    }
    const delayTime = 500; 
    const timeoutId = setTimeout(() => {
      router.replace({
        pathname: router.pathname,
        query,
      });
    }, delayTime);
    return () => clearTimeout(timeoutId);
  }, [currentPage, filteredLanguages, sortingOption, searchText, router]);

  const handleLanguageChange = (values) => {
    setFilteredLanguages(values ? values.join(',') : '');
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortingOption(value);
    setCurrentPage(1);
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    let filtered = handleSearchRepositories(allRepositories, searchText);
    filtered = filterRepositoriesByLanguage(filtered, filteredLanguages);
    const sorted = sortRepositories(filtered, sortingOption);
    setSortedRepositories(sorted);
    setDisplayedRepositories(sorted.slice(0, repositoriesPerPage));
    setCurrentPage(1);
  };

  const handleButtonClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //==========Edit========================================================
  const handleUpdateRepo = async (repoId, updatedData) => {
    try {
      const repositoryRef = ref(database, `repositories/${repoId}`);
      const snapshot = await get(repositoryRef);
  
      if (!snapshot.exists()) {
        console.error(`Repository with ID ${repoId} not found in Firebase.`);
        return;
      }
      const RepoId = snapshot.key;
      const updatedFields = {
        "__typename": "RepositoryEdge",
          "node": {
            "__typename": "Repository",
            "id": RepoId,
            "name": updatedData.name ? updatedData.name.toUpperCase() : "",
            "description": updatedData.description || null,
            "url": "https://github.com/repository",
            "updatedAt": updatedData.updatedAt || "default value if updatedAt is undefined",
            "ref": {
              "__typename": "Commit",
              "history": {
              "__typename": "CommitHistoryConnection",
              "totalCount": updatedData.commitCount || 0
              }
            },
            "defaultBranchRef": {
              "__typename": "ref",
              "name": updatedData.defaultBranch || "defaultBranchValue"
            },
            "primaryLanguage": {
              "__typename": "Language",
              "name": updatedData.primaryLanguage || "defaultValue"
            },
            isFirebase: true
          }
      }
      await update(repositoryRef, updatedFields);
      onValue(repositoryRef, (updatedSnapshot) => {
        const updatedRepository = updatedSnapshot.val();
        setAllRepositories((prevRepositories) =>
          prevRepositories.map((repo) =>
            repo.node.id === updatedRepository.node.id ? { ...repo, node: updatedRepository.node } : repo
          )
        );
      });
    } catch (error) {
      console.error('Error updating repository:', error);
      throw error;
    }
  };
  //=============Delete=================================================================================
  const handleDeleteRepo = async (deletedRepoId) => {
    try {
      const repositoryRef = ref(database, `repositories/${deletedRepoId}`);
      await remove(repositoryRef);
      const updatedRepositories = allRepositories.filter((repo) => repo.node.id !== deletedRepoId);
      setAllRepositories(updatedRepositories);
    } catch (error) {
      console.error('Error deleting repository:', error);
    }
  };
//====================================================================================================
  return (
    <div style={boxStyle}>
      {isLoading && <Loader />}
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={selectStyle}>
        <Col xs={24} sm={12} md={11} lg={8} xl={8} style={colStyle}>
          <Filter handleLanguageChange={handleLanguageChange} filteredLanguages={filteredLanguages}/>
        </Col>
        <Col xs={24} sm={12} md={11} lg={8} xl={8} style={colStyle}>
          <SearchName handleSearch={handleSearch} searchText={searchText}/>
        </Col>
        <Col xs={24} sm={12} md={11} lg={8} xl={8} style={colStyle}>
          <Sort handleSortChange={handleSortChange} sortingOption={sortingOption}/>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={rowStyle}>
        {displayedRepositories.map(({node}) => (
          <Col xs={24} sm={12} md={11} lg={8} xl={8} key={node.id} style={colStyle}>
            <Link href={`/repositories/${node.name}`}>
              <div style={linkStyle} onClick={() => handleRepoClick(node.name)}>
                {node.name}
              <div style={langStyle}>{node.primaryLanguage ? node.primaryLanguage.name : ''}</div>
              <div>{node.updatedAt.slice(0, 10)}</div> 
              </div>
            </Link>
            {node.isFirebase ? (
              <div>
                <RepositoryEditing repository={node} onUpdateRepo={handleUpdateRepo}/>
                <RepositoryDeletion  onDeleteRepo={handleDeleteRepo} repoId={node.id}/>
              </div>
          ) : ''}
          </Col>
        ))}
      </Row>
      <PaginationButtons
        displayedButtons={displayedButtons}
        currentPage={currentPage}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
}

