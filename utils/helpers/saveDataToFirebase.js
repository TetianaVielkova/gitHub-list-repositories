import { ref, push, set } from 'firebase/database';
import database from './../../firebaseConfig';

export const saveDataToFirebase = async (data) => {
    try {
        const repositoriesRef = ref(database, 'repositories');
        const newRepoRef = push(repositoriesRef);
        const newRepoId = newRepoRef.key;
        if (newRepoId) {
            const formattedData = {
                "__typename": "RepositoryEdge",
                "node": {
                    "__typename": "Repository",
                    "id": newRepoId,  
                    "name": data.name ? data.name.toUpperCase() : "",
                    "description": data.description || null,
                    "url": `https://github.com/repository`,
                    "updatedAt": data.updatedAt || "default value if updatedAt is undefined",
                    "ref": {
                        "__typename": "Commit",
                        "history": {
                            "__typename": "CommitHistoryConnection",
                            "totalCount": data.commitCount || 0
                        }
                    },
                    "defaultBranchRef": {
                        "__typename": "ref",
                        "name": data.defaultBranch || "defaultBranchValue"
                    },
                    "primaryLanguage": {
                        "__typename": "Language",
                        "name": data.primaryLanguage || "defaultValue"
                    },
                    "isFirebase": true
                }
            };

    await set(newRepoRef, formattedData);
        console.log('Data saved to Firebase!');
    } else {
        console.error('Error: Could not retrieve newRepoId');
    }
    } catch (error) {
    console.error('Error saving data to Firebase:', error);
    throw error;  
    }
};