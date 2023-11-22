import { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader';
import { Row, Col } from 'antd';
import Link from 'next/link';
import Date from '../Date/date';
import { boxStyle, colStyle, langStyle, linkStyle, rowStyle, selectStyle } from './CardRepos.style';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { ALL_REPOSITORIES_QUERY } from '../../utils/allReposGraphQl';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import { filterRepositoriesByLanguage } from './../../utils/helpers/filterRepositoriesByLanguage';
import { sortRepositories } from './../../utils/helpers/sortRepositories';

export default function CardRepos({ repositories }) {
  const [isLoading, setIsLoading] = useState(false);
  const [allRepositories, setAllRepositories] = useState([]);
  const [filteredLanguage, setFilteredLanguage] = useState(null);
  const [sortingOption, setSortingOption] = useState(null);
  const router = useRouter();

  const { loading, data } = useQuery(ALL_REPOSITORIES_QUERY, {
    variables: {
      login: process.env.LOGIN,
      language: filteredLanguage,
      orderBy: {
        field: sortingOption === 'alphabetical' ? 'NAME' : 'UPDATED_AT',
        direction: sortingOption === 'alphabetical' ? 'ASC' : 'DESC',
      },
    },
    skip: !filteredLanguage && !sortingOption, 
  });

  useEffect(() => {
    setIsLoading(loading);
    if (!loading && data) {
      setAllRepositories(data.user.repositories.edges);
    }
  }, [loading, data]);

  useEffect(() => {
    if (repositories?.length > 0) {
      setAllRepositories(repositories);
    }
  }, [repositories]);

  const handleRepoClick = (name) => {
    setIsLoading(true);
    router.push(`/repositories/${name}`);
  };

  const handleLanguageChange = (value) => {
    setFilteredLanguage(value);
  };

  const handleSortChange = (value) => {
    setSortingOption(value);
  };

  const filteredRepositories = filterRepositoriesByLanguage(allRepositories, filteredLanguage);
  let sortedRepositories = sortRepositories(filteredRepositories, sortingOption);

  return (
    <div style={boxStyle}>
      {isLoading && <Loader />}
      <div style={selectStyle}>
        <Filter handleLanguageChange={handleLanguageChange} />
        <Sort handleSortChange={handleSortChange} />
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={rowStyle}>
        {sortedRepositories.map(({ node }) => (
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
    </div>
  );
}
