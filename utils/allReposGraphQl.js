import { gql } from '@apollo/client';

export const ALL_REPOSITORIES_QUERY = gql`
  query GetAllRepositories($login: String!, $language: String, $orderBy: RepositoryOrder) {
    user(login: $login) {
      repositories(first: 50, orderBy: $orderBy) {
        edges {
          node {
            id
            name
            description
            url
            updatedAt
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;