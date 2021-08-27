import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { Menu, MenuItem } from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faSignOutAlt, faSearch, faPlus, faBell, faEdit, faBars} from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

import {removeUser, selectUploadedPic, selectUsername} from "../../../features/auth.slice";
import UserImage from "../main/user/UserImage";
import DropdownWrapper from '../../../styles/navbar/navbar';
import styles from '../../../styles/navbar/Navbar.module.scss';
import Logo from "../../logo/Logo";
import SearchInput from "./SearchInput";

function Navbar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const uploadedPic = useSelector(selectUploadedPic);
  const username = useSelector(selectUsername);

  function logout(syntheticEvent) {
    dispatch(removeUser());
  }

  function toggleDropdown(syntheticEvent) {
    setShowDropdown(show => !show);
  }

  return (
    <div className={styles.navbar + ' ' + styles.dashboard}>
      {/*<FontAwesomeIcon icon={faBars}/>*/}
      <Logo/>

      <nav>
        <div onClick={toggleDropdown}>
          <UserImage image={uploadedPic}/>

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

        {username === 'admin' ? (
          <div>
            <Link to='/dashboard/new-course'>
              <span>{'\uf067'}</span>
            </Link>
          </div>
          ): <></>
        }
      </nav>

      <SearchInput/>
    </div>
  );
}

export default Navbar;