import { boxStyle, buttonStyle } from "./PaginationButtons.style";

const PaginationButtons = ({ displayedButtons, currentPage, handleButtonClick }) => {
    return (
      <div style={boxStyle}>
        {displayedButtons.length > 1 &&
          displayedButtons.map((page, index) => (
            <button
              key={index}
              style={{
                ...buttonStyle,
                fontWeight: currentPage === page ? 'bold' : 'normal', 
                background: currentPage === page ? 'var(--accent-color)' : 'inherit', 
                color: currentPage === page ? 'var(--color-white)' : 'inherit', 
              }}
              onClick={() => handleButtonClick(page)}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}
      </div>
    );
  };
  
  export default PaginationButtons;