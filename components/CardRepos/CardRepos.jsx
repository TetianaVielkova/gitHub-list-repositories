import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col } from 'antd';
import { boxStyle, colStyle, langStyle, linkStyle, rowStyle, selectStyle } from './CardRepos.style';
import { Loader } from '../Loader/Loader';
import Date from '../Date/date';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import SearchName from '../Search/Search';
import PaginationButtons from '../PaginationButtons/PaginationButtons';
import { filterRepositoriesByLanguage } from './../../utils/helpers/filterRepositoriesByLanguage';
import { sortRepositories } from './../../utils/helpers/sortRepositories';
import { updateDisplayedButtons } from '../../utils/helpers/updateDisplayedButtons';
import { handleSearchRepositories } from '../../utils/helpers/searchRepositories';

export default function CardRepos({ data }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState(data.user.repositories.edges);
  const [allRepositories, setAllRepositories] = useState(repositories || []);
  const [filteredLanguages, setFilteredLanguages] = useState(router.query.language || '');
  const [sortingOption, setSortingOption] = useState(router.query.sort || '');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page) || 1);
  const [displayedRepositories, setDisplayedRepositories] = useState([]);
  const [displayedButtons, setDisplayedButtons] = useState([]);
  const [sortedRepositories, setSortedRepositories] = useState([]); 
  const [searchText, setSearchText] = useState(router.query.search || '');

  const repositoriesPerPage = 6;

  const handleRepoClick = (name) => {
    setIsLoading(true);
    router.push(`/repositories/${name}`);
  };

  useEffect(() => {
    setIsLoading(true);
    if (repositories?.length > 0) {
      setAllRepositories(repositories);
      setIsLoading(false);
    }
  }, [repositories]);

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
        {displayedRepositories.map(({ node }) => (
          <Col xs={24} sm={12} md={11} lg={8} xl={8} key={node.id} style={colStyle}>
            <Link href={`/repositories/${node.name}`}>
              <div onClick={() => handleRepoClick(node.name)} style={linkStyle}>
                {node.name}
                <div style={langStyle}>{node.primaryLanguage ? node.primaryLanguage.name : ''}</div>
                <Date dateString={node.updatedAt} />
              </div>
            </Link>
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

