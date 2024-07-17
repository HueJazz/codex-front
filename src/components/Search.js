import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { debounce } from "lodash"
import { IconButton } from "@mui/material";
import { faMagnifyingGlass, faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@mui/material";
import { useClickOutside } from '../hooks/useClickOutside'
import { setSuggestions, getSearchSuggestions, setSuggestionsLoading } from "../reducers/searchReducer";
import { PulseLoader } from "react-spinners";

function Search() {

    const { suggestions, suggestionsLoading } = useSelector((state) => state.search)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchOptionsRef = useRef(null)
    const searchOptionsButtonRef = useRef(null)
    const searchSuggestionsRef = useRef(null)
    const searchInputRef = useRef(null)

    const [searchInput, setSearchInput] = useState('')
    const [showSearchOptions, setShowSearchOptions] = useState(false)
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
    const [selectedSearchOption, setSelectedSearchOption] = useState('All')

    const maxResults = 10;
    
    const debounceSetSuggestionsLoading = useCallback(debounce((isLoading) => {
        dispatch(setSuggestionsLoading(isLoading));
    }, 500), [dispatch]);

    useEffect(() => {
        const combinedKey = `${searchInput}_${selectedSearchOption}`;
        const storedSuggestions = sessionStorage.getItem(combinedKey);

        // console.log(JSON.parse(storedSuggestions))
        
        if (storedSuggestions) {
            dispatch(setSuggestions(JSON.parse(storedSuggestions)));
            debounceSetSuggestionsLoading(false);
        } else if (searchInput !== '') {
            debounceSetSuggestionsLoading(true);
            dispatch(getSearchSuggestions({ searchInput, selectedSearchOption, maxResults }))
            .then((response) => {
                sessionStorage.setItem(combinedKey, JSON.stringify(response.payload))
                debounceSetSuggestionsLoading(false);  
            })
        }
    }, [dispatch, searchInput, selectedSearchOption]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleClearClick = () => {
        setSearchInput('');
    };

    const handleSubmit = () => {
        if (searchInput == '' || (suggestions.genres.length + suggestions.books.length) === 0) {
            searchInputRef.current.focus()
        } else {
            navigate(`/search/${searchInput}?sortBy=${selectedSearchOption}`)
            setSearchInput('')
        }
    }

    useClickOutside(searchSuggestionsRef, searchInputRef, () => {
        setShowSearchSuggestions(false)
    })

    useClickOutside(searchOptionsRef, searchOptionsButtonRef, () => {
        setShowSearchOptions(false)
    })

    return (
        <form className="header-container-search" onSubmit={(e) => { handleSubmit(); e.preventDefault() }}>
            <div className="header-container-search-options">
                <Button id="option" ref={searchOptionsButtonRef} onClick={() => setShowSearchOptions(!showSearchOptions)}>
                    <p>{selectedSearchOption}</p>
                    <FontAwesomeIcon icon={faChevronDown} />
                </Button>
                {showSearchOptions ? <ul ref={searchOptionsRef} className="header-container-search-options-list">
                    <li className="header-container-search-options-list-item">
                        <Button onClick={() => { setSelectedSearchOption('All'); setShowSearchOptions(false) }}>
                            <p>All</p>
                        </Button>
                    </li>
                    <li className="header-container-search-options-list-item">
                        <Button onClick={() => { setSelectedSearchOption('Title'); setShowSearchOptions(false) }}>
                            <p>Title</p>
                        </Button>
                    </li>
                    <li className="header-container-search-options-list-item">
                        <Button onClick={() => { setSelectedSearchOption('Author'); setShowSearchOptions(false) }}>
                            <p>Author</p>
                        </Button>
                    </li>
                    <li className="header-container-search-options-list-item">
                        <Button onClick={() => { setSelectedSearchOption('Genre'); setShowSearchOptions(false) }}>
                            <p>Genre</p>
                        </Button>
                    </li>
                </ul> : null}
            </div>
            <input type="text" placeholder="Search Books"
                value={searchInput}
                ref={searchInputRef}
                autoCorrect="off"
                autoComplete="off"
                onFocus={() => setShowSearchSuggestions(true)}
                onChange={handleInputChange}></input>
            <div className="header-container-search-actions">
                {searchInput
                    ? <div className="header-container-search-actions-close">
                        <IconButton id="close" onClick={handleClearClick}>
                            <FontAwesomeIcon icon={faXmark} />
                        </IconButton>
                        <div className="header-container-search-actions-close-divider"></div>
                    </div> : null
                }
                <IconButton id="search" type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </IconButton>
            </div>
            {searchInput && showSearchSuggestions ?
                <div ref={searchSuggestionsRef} className="header-container-search-suggestions">
                    {suggestionsLoading ? (
                        <PulseLoader className="header-container-search-suggestions-loader" color="#1e7b85" size="10px" />
                    ) : (
                        (suggestions.genres.length + suggestions.books.length) === 0 ? (
                            <p className="header-container-search-suggestions-notfound">No results found for "{searchInput}"</p>
                        ) : (
                            <>
                                {suggestions.genres.length > 0 && (
                                    <ul className="header-container-search-suggestions-list">
                                        {suggestions.genres.map((item) => (
                                            <li key={item._id} onClick={() => {
                                                navigate(`/genres/${item.name}`);
                                                setShowSearchSuggestions(false);
                                                setSearchInput('')
                                            }}
                                                className="header-container-search-suggestions-list-item">
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {suggestions.books.length > 0 && (
                                    <ul className="header-container-search-suggestions-list">
                                        {suggestions.books.map((item) => (
                                            <li key={item._id} onClick={() => {
                                                navigate(`/books/${item._id}`);
                                                setShowSearchSuggestions(false);
                                                setSearchInput('')
                                            }}
                                                className="header-container-search-suggestions-list-item">
                                                {item.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )
                    )}
                </div> : null
            }
        </form>
    )
}

export default Search