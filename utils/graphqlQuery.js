import { gql } from '@apollo/client';

const USER_QUERY = gql`
  query GetUser($login: String!, $cursor: String, $count: Int) {
    user(login: $login) {
      avatarUrl
      name
      url
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: $count, after: $cursor) {
        totalCount
        edges {
          node {
            id
            name
            url
            primaryLanguage {
              name
            }
            updatedAt
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export default USER_QUERY;