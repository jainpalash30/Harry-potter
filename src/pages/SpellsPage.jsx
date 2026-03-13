import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpells, setCurrentPage } from "../Features/spellsSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { GrLinkPrevious } from "react-icons/gr";
import { MdNavigateNext, MdOutlineFindInPage } from "react-icons/md";

function SpellsPage() {
  const dispatch = useDispatch();

  const { spellsList, loading, error, currentPage, cachedPages } =
    useSelector((state) => state.spells);

  
  useEffect(() => {
      // Fetch data only if current page is not already cached
    // Prevents unnecessary API calls when navigating back to visited pages
    if (!cachedPages[currentPage]) {
      dispatch(fetchSpells(currentPage));
    }
  }, [dispatch, currentPage, cachedPages]);

  // Move to next page (actual fetch decision handled in useEffect)
  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  // Prevent navigating below page 1
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  // Allows direct navigation to a specific page (if needed in future UI)
  const goToPage = (pageNum) => {
    dispatch(setCurrentPage(pageNum));
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong...</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">All Harry Potter Spells</h1>

      <div className="pagination-info">
        <p>
          <MdOutlineFindInPage /> Current Page: {currentPage}
        </p>

        <p className="cache-info">
          Cached Pages:{" "}
          {Object.keys(cachedPages).length > 0
            ? Object.keys(cachedPages).join(", ")
            : "None yet"}
        </p>
      </div>

      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <GrLinkPrevious /> Previous
        </button>

        <button
          onClick={handleNextPage}
          disabled={spellsList.length === 0}
          className="pagination-button"
        >
          Next <MdNavigateNext />
        </button>
      </div>

    
      <div className="spells-grid">
        {spellsList.length > 0 ? (
          spellsList.map((spell) => (
            <div key={spell.index} className="spell-card">
              <h3 className="spell-name">{spell.spell}</h3>
              <p className="spell-use">{spell.use}</p>
            </div>
          ))
        ) : (
          <p className="no-data">No spells found on this page.</p>
        )}
      </div>

      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <GrLinkPrevious /> Previous
        </button>

        <span className="page-indicator">Page {currentPage}</span>

        <button
          onClick={handleNextPage}
          disabled={spellsList.length === 0}
          className="pagination-button"
        >
          Next <MdNavigateNext />
        </button>
      </div>
    </div>
  );
}

export default SpellsPage;
