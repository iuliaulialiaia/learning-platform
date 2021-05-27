import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {selectUsername} from "../features/auth/auth.slice";
import styles from '../styles/UserAccount.module.scss';

function UserAccount(props) {
  const username = useSelector(selectUsername);
  const [file, setFile] = useState(new File([], null));

  function handleResponse(response) {

  }

  function handleError(error) {
    alert(error);
  }

  function changeFile(syntheticEvent) {
    setFile(syntheticEvent.target.files[0]);
  }

  function uploadFile(syntheticEvent) {
    syntheticEvent.preventDefault();

    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) return;
    if (file.size > 1000000) return;

    const regexFound = file.name.match(/.png$|.jpg$|.jpeg$|.gif$|.webp$/);
    if (regexFound.length === 0) return;
    const extension = regexFound[0];

    const formData = new FormData();
    formData.append('userPicture', file, username + extension);
    axios.post('http://localhost:3000/user/profile_picture', formData)
      .then(handleResponse)
      .catch(handleError);
  }

  return (
    <div className={styles.userAccount}>
      <img
        width='100'
        src='http://localhost:3000/user/profile_picture/66'
        alt={username + '\'s profile picture'}
      />

      <form>
        <input type='file' onChange={changeFile}/>
        <input type='submit' value='trimite' onClick={uploadFile}/>
      </form>
    </div>
  );
}

export default UserAccount;