export const updateDisplayedButtons = (totalPages, currentPage) => {
    let buttonsToShow = [];
  
    if (totalPages <= 4) {
      buttonsToShow = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 2) {
        buttonsToShow = [1, 2, 3, '...', totalPages];
      } else if (totalPages === 5) {
        buttonsToShow = [1, 2, 3, 4, totalPages];
      } else if (currentPage >= totalPages - 1) {
        buttonsToShow = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        if (currentPage === 3) {
          buttonsToShow = [1, 2, 3, 4, '...', totalPages];
        } else if (currentPage === totalPages - 2) {
          buttonsToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, totalPages];
        } else {
          buttonsToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }
      }
    }
    return buttonsToShow;
  };