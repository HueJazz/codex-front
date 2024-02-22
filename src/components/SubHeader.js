import { Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../reducers/genresReducer";
import { useClickOutside} from '../hooks/useClickOutside'

function SubHeader () {

    const genresSelected = ["Novels", "Science Fiction", "Detective", "Fantasy", "Classics", "Popular Science"]
    const {genres} = useSelector((state) => state.genres)
    const [showAllCategories, setShowAllCategories] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categoriesRef = useRef(null)
    const categoriesButtonRef = useRef(null)

    useClickOutside(categoriesRef, categoriesButtonRef, () => {
        setShowAllCategories(false)
    })
    
    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])

    const handleCategoryClick = (genre) => {
        navigate(`/genres/${genre}`)
        setShowAllCategories(false)
    }

    return (
        <div className="subheader">
            <div className="subheader-container">
                <div className="subheader-container-main">
                    <ul className="subheader-container-main-list">
                        {genresSelected.map(genre => {
                            return <li key={genre} className="subheader-container-main-list-item">
                                <Button onClick={() => handleCategoryClick(genre)}>
                                    <p>{genre}</p>
                                </Button>
                            </li>
                        })}
                        <li className="subheader-container-main-list-item">
                            <Button ref={categoriesButtonRef} onClick={() => setShowAllCategories(!showAllCategories)}>
                                <p>All Categories</p>
                                <FontAwesomeIcon className={showAllCategories ? 'open' : ''} icon={faChevronDown} />
                            </Button>
                        </li>
                    </ul>
                </div>
                {showAllCategories ?
                    <div ref={categoriesRef} className="subheader-container-genres">
                        <ul className="subheader-container-genres-list">
                            {genres.map(genre => {
                                return <li key={genre.name} className="subheader-container-genres-list-item" onClick={() => handleCategoryClick(genre.name)}><p>{genre.name}</p></li>
                            })}

                        </ul>
                    </div> : null}
            </div>
        </div>
    )

}

export default SubHeader