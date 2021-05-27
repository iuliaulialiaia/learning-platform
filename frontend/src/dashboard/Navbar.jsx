import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShapes, faUserCircle, faUser, faSignOutAlt, faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/Navbar.module.scss';
import React, {useEffect, useState} from "react";

import DropdownWrapper from '../styles/navbar';
import {removeUser} from "../features/auth/auth.slice";
import {useDispatch} from "react-redux";

function Navbar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  function logout(syntheticEvent) {
    dispatch(removeUser());
    localStorage.clear();
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
          <FontAwesomeIcon icon={faUserCircle} onClick={toggleDropdown}/>

          <DropdownWrapper className={styles.dropdown} show={showDropdown}>
            <div>
              <FontAwesomeIcon icon={faUser}/>
              <Link to='/'>Contul meu</Link>
            </div>
            <div>
              <FontAwesomeIcon icon={faSignOutAlt}/>
              <Link to='/login' onClick={logout}>Ieși din cont</Link>
            </div>
          </DropdownWrapper>
        </div>

        <Link to='/'>
          <FontAwesomeIcon icon={faPlus}/>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;