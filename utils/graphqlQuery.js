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
            description
            url
            updatedAt
            ref(qualifiedName: "main") {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
            defaultBranchRef {
              name
            }
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

export default USER_QUERY;
