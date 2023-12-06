export const handleSearchRepositories = (repositories, searchText) => {
  const filtered = repositories.filter(({ node }) =>
    node.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filtered;
}; 