import React from "react"
import { useSelector } from "react-redux";

import ListsCard from "./ListsCard";
import BookTopSkeleton from "./BookTopSkeleton";

function UserLists () {

    const { listsLoading, lists } = useSelector((state) => state.lists)

    return (
        <div className="userlists">
            {listsLoading ? <BookTopSkeleton /> :
                <div className="userlists-container">
                        <div className="userlists-container-spacing"></div>
                        <ul className="userlists-container-list">
                            {lists.map((list) => (
                                <li key={list._id} className="userlists-container-list-item">
                                    <ListsCard list={list} />
                                </li>
                            ))}
                        </ul>
                        <div className="userlists-container-spacing"></div>
                </div>
            }
        </div>
    )
}

export default UserLists