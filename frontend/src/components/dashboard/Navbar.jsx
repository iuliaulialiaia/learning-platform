import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import { Menu, MenuItem } from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShapes, faUser, faSignOutAlt, faSearch, faPlus, faBell, faEdit} from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

import {removeUser} from "../../features/auth/auth.slice";
import ProfilePicture from "../user/ProfilePicture";
import DropdownWrapper from '../../styles/navbar/navbar';
import styles from '../../styles/navbar/Navbar.module.scss';

function Navbar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  function logout(syntheticEvent) {
    dispatch(removeUser());
  }

  function toggleDropdown(syntheticEvent) {
    setShowDropdown(show => !show);
  }

  return (
    <div className={styles.navbar + ' ' + styles.dashboard}>
      <FontAwesomeIcon icon={faShapes}/>
      <h1>Learning Platform</h1>

      <div className={styles.search}>
        <FontAwesomeIcon icon={faSearch}/>
        <input type='text' placeholder='caută'/>
      </div>

      <nav>
        <div>
          <ProfilePicture onClick={toggleDropdown}/>

          <DropdownWrapper className={styles.dropdown} show={showDropdown}>
            <div>
              <FontAwesomeIcon icon={faUser}/>
              <Link to='/'>Profilul meu</Link>
            </div>
            <div>
              <FontAwesomeIcon icon={faEdit}/>
              <Link to='/'>Setari</Link>
            </div>
            <div>
              <FontAwesomeIcon icon={faSignOutAlt}/>
              <Link to='/login' onClick={logout}>Ieși din cont</Link>
            </div>
          </DropdownWrapper>

        </div>

        <div>
          <FontAwesomeIcon icon={faBell}/>
        </div>

        <div>
          <FontAwesomeIcon icon={faPlus}/>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;