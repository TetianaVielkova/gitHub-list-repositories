export const filterRepositoriesByLanguage = (repositories, filteredLanguage) => {
    return repositories.filter(
      ({ node }) => !filteredLanguage || node.primaryLanguage?.name === filteredLanguage
    );
  };