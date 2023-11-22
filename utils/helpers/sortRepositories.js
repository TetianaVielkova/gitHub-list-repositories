import { parseISO } from 'date-fns';

export const sortRepositories = (repositories, sortingOption) => {
  let sortedRepositories = [...repositories];

  if (sortingOption === 'alphabetical') {
    sortedRepositories.sort((a, b) => {
      const nameA = a.node.name.toUpperCase();
      const nameB = b.node.name.toUpperCase();
      return nameA.localeCompare(nameB);
    });
  } else if (sortingOption === 'date') {
    sortedRepositories.sort((a, b) => {
      const dateA = parseISO(a.node.updatedAt);
      const dateB = parseISO(b.node.updatedAt);
      return dateB.getTime() - dateA.getTime();
    });
  }

  return sortedRepositories;
};