import axios from "axios";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {selectUsername, selectToken, selectLoggedIn, selectUploadedPic, setUser} from "../../features/auth/auth.slice";
import styles from '../../styles/UserAccount.module.scss';
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Slider from '@material-ui/core/Slider'
import Cropper from 'react-easy-crop'

function UserAccount(props) {
  const uploadedPic = useSelector(selectUploadedPic);
  const username = useSelector(selectUsername);
  const token = useSelector(selectToken);
  const [file, setFile] = useState(new File([], null));

  const [url, setUrl] = useState('http://localhost:3000/user/profile_picture/' + token);

  const dispatch = useDispatch();

  function handleResponse(response) {
    const action = setUser(response.data);
    dispatch(action);
    window.location.reload();
  }

  function handleError(error) {
    alert(error);
  }

  function changeFile(syntheticEvent) {
    const f = syntheticEvent.target.files[0];
    const u = URL.createObjectURL(f);
    setUrl(u);
    setFile(f);
  }

  function uploadFile(syntheticEvent) {
    syntheticEvent.preventDefault();

    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) return;
    if (file.size > 1000000) return;

    const [extension] = file.name.match(/.png$|.jpg$|.jpeg$|.gif$|.webp$/);
    if (!extension) return;

    const formData = new FormData();
    formData.append('userPicture', file, username + extension);
    axios.post('http://localhost:3000/user/profile_picture/' + token, formData)
      .then(handleResponse)
      .catch(handleError);
  }

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  function onCropChange  (crop) {
    setCrop(crop )
  }

  function onCropComplete (croppedArea, croppedAreaPixels) {
    console.log(croppedAreaPixels.width / croppedAreaPixels.height)
  }

  function onZoomChange  (zoom)  {
    setZoom( zoom )
  }

  return (
    <div className={styles.userAccount}>
      {uploadedPic ?
        <img
          width='50'
          height='50'
          src={'http://localhost:3000/user/profile_picture/' + token}
          alt={username + '\'s profile picture'}
        /> :
        <FontAwesomeIcon icon={faUserCircle}/>
      }

      <form>
        <input type='file' onChange={changeFile}/>
        <input type='submit' value='trimite' onClick={uploadFile}/>
      </form>
    </div>
  );
}

export default UserAccount;