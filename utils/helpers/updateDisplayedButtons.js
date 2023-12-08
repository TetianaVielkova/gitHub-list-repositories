export const updateDisplayedButtons = (totalPages, currentPage) => {
  let buttonsToShow = [];

  if (totalPages <= 7) {
    buttonsToShow = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    if (currentPage <= 4) {
      buttonsToShow = [1, 2, 3, 4, 5, '...', totalPages];
    } else if (currentPage >= totalPages - 3) {
      buttonsToShow = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      buttonsToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }
  return buttonsToShow;
};