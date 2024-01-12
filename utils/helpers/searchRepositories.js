export const handleSearchRepositories = (repositories, searchText) => {
  const filtered = repositories.filter(({ node }) =>
    node && node.name && typeof node.name === 'string' &&
    node.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filtered;
};