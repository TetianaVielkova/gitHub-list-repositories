export const filterRepositoriesByLanguage = (repositories, filteredLanguages) => {
  return repositories.filter(({ node }) => {
    if (!filteredLanguages || filteredLanguages.length === 0) {
      return true;
    }
    return filteredLanguages.includes(node.primaryLanguage?.name);
  });
};