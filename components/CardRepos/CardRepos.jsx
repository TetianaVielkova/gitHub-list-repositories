import { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader';
import { Row, Col } from 'antd';
import Link from 'next/link';
import Date from '../Date/date';
import { boxStyle, colStyle, langStyle, linkStyle, rowStyle, selectStyle } from './CardRepos.style';
import { useRouter } from 'next/router';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import { filterRepositoriesByLanguage } from './../../utils/helpers/filterRepositoriesByLanguage';
import { sortRepositories } from './../../utils/helpers/sortRepositories';
import ButtonLoadMore from '../Button/button';

export default function CardRepos({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState(data.user.repositories.edges);
  const [allRepositories, setAllRepositories] = useState([]);
  const [filteredLanguage, setFilteredLanguage] = useState(null);
  const [sortingOption, setSortingOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedRepositories, setDisplayedRepositories] = useState([]);
  const [sortedRepositories, setSortedRepositories] = useState([]); 

  const router = useRouter();

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
    setSortedRepositories(sorted);
    setDisplayedRepositories(sorted.slice(0, 9));
  }, [allRepositories, filteredLanguage, sortingOption]);

  const handleRepoClick = (name) => {
    setIsLoading(true);
    router.push(`/repositories/${name}`);
  };

  const handleLanguageChange = (value) => {
    setFilteredLanguage(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortingOption(value);
    setCurrentPage(1);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * 9;
    const endIndex = nextPage * 9;

    setDisplayedRepositories([
      ...displayedRepositories,
      ...sortedRepositories.slice(startIndex, endIndex),
    ]);
    setCurrentPage(nextPage);
  };

  return (
    <div style={boxStyle}>
      {isLoading && <Loader />}
      <div style={selectStyle}>
        <Filter handleLanguageChange={handleLanguageChange} />
        <Sort handleSortChange={handleSortChange} />
      </div>
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
      {sortedRepositories.length > displayedRepositories.length && 
        <ButtonLoadMore loadMore={loadMore} loading={isLoading} />
      }
    </div>
  );
}
