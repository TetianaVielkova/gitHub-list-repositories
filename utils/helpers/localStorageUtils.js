import { v4 as uuidv4 } from 'uuid';

export const saveDataToLocalStorage = (parsedData) => {
  try {
    const existingRepositories = JSON.parse(localStorage.getItem('repositories')) || [];

    const newFormattedRepositories = parsedData.map((data) => {
        return {
          "__typename": "RepositoryEdge",
          "node": {
            "__typename": "Repository",
            "id": uuidv4(),
            "name": data.name.toUpperCase(),
            "description": data.description || null,
            "url": `https://github.com/${data.name}`, 
            "updatedAt": data.updatedAt, 
            "ref": {
              "__typename": "Commit",
              "history": {
                "__typename": "CommitHistoryConnection",
                "totalCount": data.commitCount
              }
            },
            "defaultBranchRef": {
              "__typename": "ref",
              "name": data.defaultBranch
            },
            "primaryLanguage": {
              "__typename": "Language",
              "name": data.primaryLanguage
            },
            "isLocalStorage": true
          }
        };
      });

    const updatedRepositories = [...existingRepositories, ...newFormattedRepositories];
    localStorage.setItem('repositories', JSON.stringify(updatedRepositories));
  } catch (error) {
    console.error('Error saving formatted data to localStorage:', error);
  }
};
