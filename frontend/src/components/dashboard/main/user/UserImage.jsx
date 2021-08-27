import React from "react";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

import {selectToken} from "../../../../features/auth.slice";

function UserImage(props) {
  const token = useSelector(selectToken);
  const url = props.id ?
    `http://localhost:3000/user/image/${props.id}/${token}` :
    `http://localhost:3000/user/image/${token}`;

  return props.image ? (
    <img src={url} alt='TODO'/>
  ) : (
    <FontAwesomeIcon icon={faUserCircle}/>
  );
}

export default UserImage;