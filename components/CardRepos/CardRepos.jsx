import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, Button } from 'antd';
import { boxStyle, btnBoxStyle, colStyle, iconStyle, iconStyleDelete, langStyle, linkStyle, rowStyle, selectStyle } from './CardRepos.style';
import { Loader } from '../Loader/Loader';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import SearchName from '../Search/Search';
import PaginationButtons from '../PaginationButtons/PaginationButtons';
import { filterRepositoriesByLanguage } from './../../utils/helpers/filterRepositoriesByLanguage';
import { sortRepositories } from './../../utils/helpers/sortRepositories';
import { updateDisplayedButtons } from '../../utils/helpers/updateDisplayedButtons';
import { handleSearchRepositories } from '../../utils/helpers/searchRepositories';
import {DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
 
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
  const [storageData, setStorageData] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [repositoryToDelete, setRepositoryToDelete] = useState(null);

  const repositoriesPerPage = 6;

  //=============================================================================
  useEffect(() => {
    const localStorageDataFormat = (localStorageData) => {
      if (!localStorageData) {
        console.log('No data found in local storage.');
        return null;
      }
    
      try {
        const parsedData = JSON.parse(localStorageData);

        const storageRepositories = parsedData.map((repo) => {
          return {
            "node": {
              "id": repo.id,
              "name": repo.name.toUpperCase(),
              "description": repo.description || null,
              "updatedAt": repo.updatedAt, 
              "ref": {
                "history": {
                  "totalCount": repo.commitCount
                }
              },
              "defaultBranchRef": {
                "name": repo.defaultBranch
              },
              "primaryLanguage": {
                "name": repo.primaryLanguage
              },
              "isLocalStorage": true
            }
          };
        });
        return storageRepositories;
      } catch (error) {
        console.error('Error parsing data from localStorage:', error);
        return null;
      }
    };
  
    const getLocalDataFromStorage = () => {
      try {
        const data = localStorage.getItem('repositories');
        const formattedData = localStorageDataFormat(data);
        setStorageData(formattedData);
      } catch (error) {
        console.error('Error fetching from localStorage:', error);
        setStorageData(null);
      }
    };
    getLocalDataFromStorage(); 
  }, []);


//====================================================================================================
useEffect(() => {
  setIsLoading(true);
  if (Array.isArray(storageData) && storageData.length > 0) {
    setAllRepositories((prevRepositories) => [...prevRepositories, ...storageData]);
  }
  setIsLoading(false);
}, [storageData]);

  const handleRepoClick = (name) => {
    setIsLoading(true);
    router.push(`/repositories/${name}`);
  };

  const handleLocalRepoClick = (id) => {
    setIsLoading(true);
    router.push(`/local-repositories/${id}`);
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

  const handleDeleteRepo = (id) => {
    setRepositoryToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (repositoryToDelete) {
      const updatedStorageData = storageData.filter(
        (repo) => repo.node.id !== repositoryToDelete
      );
      localStorage.setItem('repositories', JSON.stringify(updatedStorageData));
      setAllRepositories(allRepositories.filter(
        (repo) => repo.node.id !== repositoryToDelete
      ));
      setDisplayedRepositories(displayedRepositories.filter(
        (repo) => repo.node.id !== repositoryToDelete
      ));
      setDeleteModalVisible(false);
    }
  };

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
          {node.isLocalStorage ? (
          <><Link href={{ pathname: `/local-repositories/${node.id}` }}>
                <div onClick={() => handleLocalRepoClick(node.id)} style={linkStyle}>
                  <div style={btnBoxStyle}>
                    {node.name}

                  </div>
                  <div style={langStyle}>{node.primaryLanguage ? node.primaryLanguage.name : ''}</div>
                  <div>{node.updatedAt.slice(0, 10)}</div>
                </div>
              </Link><div>
                    <Button style={iconStyleDelete}><EditOutlined style={{ fontSize: '20px' }}/></Button>
                  <Button  style={iconStyle}><DeleteOutlined style={{ fontSize: '20px' }} onClick={() =>  handleDeleteRepo(node.id)} /></Button>
                  
                </div></>
        ) : (<Link href={{pathname: `/repositories/${node.name}`}}>
              <div onClick={() => handleRepoClick(node.name)} style={linkStyle}>
                {node.name}
                <div style={langStyle}>{node.primaryLanguage ? node.primaryLanguage.name : ''}</div>
                <div>{node.updatedAt.slice(0, 10)}</div> 
              </div>
            </Link>)}
          </Col>
        ))}
      </Row>
      <PaginationButtons
        displayedButtons={displayedButtons}
        currentPage={currentPage}
        handleButtonClick={handleButtonClick}
      />
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Repository"
        content="Are you sure you want to delete this repository?"
        handleOk={handleConfirmDelete}
        handleCancel={() => setDeleteModalVisible(false)}
      />
    </div>
  );
}

