import React from "react"
import { useSelector } from "react-redux";
import BookTopSkeleton from "./BookTopSkeleton";
import { Button, IconButton } from "@mui/material";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserProfileHeader () {

    const { userProfile, isLoading } = useSelector((state) => state.auth)

    return (
        <div className="userprofileheader">
            {isLoading ? <BookTopSkeleton /> :
                <div className="userprofileheader-container">
                    <div className="userprofileheader-container-spacing"></div>
                    <div className="userprofileheader-container-info">
                        <IconButton id="user">
                            <FontAwesomeIcon icon={faUserTie} />
                        </IconButton>
                        <p>{userProfile.userName}</p>
                    </div>
                    <div className="userprofileheader-container-actions">
                        <Button id="edit" variant="outlined">
                            <p>Edit Profile</p>
                        </Button>
                    </div>
                    <div className="userprofileheader-container-spacing"></div>
                </div>
            }
        </div>
    )
}

export default UserProfileHeader