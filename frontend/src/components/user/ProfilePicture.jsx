import React from "react";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

import {selectToken, selectUploadedPic, selectUsername} from "../../features/auth/auth.slice";

function ProfilePicture(props) {
  const uploadedPic = useSelector(selectUploadedPic);
  const username = useSelector(selectUsername);
  const token = useSelector(selectToken);

  return uploadedPic ? (
    <img
      src={'http://localhost:3000/user/profile_picture/' + token}
      alt={username + '\'s profile picture'}
      onClick={props.onClick}
    />
  ) : (
    <FontAwesomeIcon
      icon={faUserCircle}
      onClick={props.onClick}
    />
  );
}

export default ProfilePicture;