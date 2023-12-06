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
import { handleSearchRepositories } from '../../utils/helpers/searchRepositories';
import { updateDisplayedButtons } from '../../utils/helpers/updateDisplayedButtons';

export default function CardRepos({ data }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [allRepositories, setAllRepositories] = useState([]);
  const [filteredLanguage, setFilteredLanguage] = useState('');
  const [sortingOption, setSortingOption] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedRepositories, setDisplayedRepositories] = useState([]);
  const [displayedButtons, setDisplayedButtons] = useState([]);

  const repositories = data.user.repositories.edges;

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
    const filtered = filterRepositoriesByLanguage(allRepositories, filteredLanguage);
    const sorted = sortRepositories(filtered, sortingOption);
    const startIndex = (currentPage - 1) * 6;
    const endIndex = currentPage * 6;
    setDisplayedRepositories(sorted.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(sorted.length / 6));
    setDisplayedButtons(updateDisplayedButtons(totalPages, currentPage));
  }, [allRepositories, filteredLanguage, sortingOption, currentPage, totalPages]);

  const handleLanguageChange = (values) => {
    setFilteredLanguage(values || []); 
    setCurrentPage(1);
  };
  const handleSortChange = (value) => {
    setSortingOption(value);
    setCurrentPage(1);
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    let filtered = handleSearchRepositories(allRepositories, searchText);
    filtered = filterRepositoriesByLanguage(filtered, filteredLanguage);
    const sorted = sortRepositories(filtered, sortingOption);
    setSortedRepositories(sorted);
    setDisplayedRepositories(sorted.slice(0, 6));
    setCurrentPage(1);
  };

  const handleChange = (e) => {
    const searchText = e.target.value;
    handleSearch(searchText);
  };

  const handleButtonClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const { query } = router;
    const currentPageFromQuery = parseInt(query.page) || 1;
    const filteredLanguageFromQuery = query.language || '';
    const sortingOptionFromQuery = query.sort || '';

    setCurrentPage(currentPageFromQuery);
    setFilteredLanguage(filteredLanguageFromQuery);
    setSortingOption(sortingOptionFromQuery);
  }, [router]);

  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: currentPage,
        language: filteredLanguage,
        sort: sortingOption,
      },
    });
  }, [currentPage, filteredLanguage, sortingOption, router]);

  return (
    <div style={boxStyle}>
      {isLoading && <Loader />}
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={selectStyle}>
        <Col xs={24} sm={12} md={11} lg={8} xl={8} style={colStyle}>
          <Filter handleLanguageChange={handleLanguageChange} filteredLanguages={filteredLanguage} />
        </Col>
        <Col xs={24} sm={12} md={11} lg={8} xl={8} style={colStyle}>
          <SearchName handleSearch={handleSearch} handleChange={handleChange} />
        </Col>
        <Col xs={24} sm={12} md={11} lg={8} xl={8} style={colStyle}>
          <Sort handleSortChange={handleSortChange} sortingOption={sortingOption} />
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

