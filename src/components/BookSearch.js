import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import BookCollectionSkeleton from "./BookCollectionSkeleton";
import BookCollectionCard from "./BookCollectionCard";
import { getLibrary } from "../reducers/libraryReducer";
import { useLocation, useParams } from "react-router-dom";
import { getSearchResult } from "../reducers/searchReducer";

function BookSearch () {

    const dispatch = useDispatch()
    const { result, resultLoading } = useSelector((state) => state.search)
    const { library } = useSelector((state) => state.library)

    const searchInput = useParams();
    const location = useLocation();
    const selectedSearchOption = new URLSearchParams(location.search).get('sortBy');
    const maxResults = 20;
  
    useEffect(() => {
        dispatch(getLibrary());
        dispatch(getSearchResult({ searchInput, selectedSearchOption, maxResults}))
  }, [dispatch, searchInput, selectedSearchOption, maxResults]);

  return (
    <div className="booksearch">
      {resultLoading ? <BookCollectionSkeleton /> : (
        <div className="booksearch-container">
          <ul className="booksearch-container-list">
            {result.map((book) => (
              <li key={book._id}>
                <BookCollectionCard book={book} isSaved={library.books?.some(item => item._id === book._id)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookSearch