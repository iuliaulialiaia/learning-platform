import {useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShapes} from "@fortawesome/free-solid-svg-icons";

import logo from './icon.png';
import styles from '../../styles/Logo.module.scss';
import {useSelector} from "react-redux";
import {selectLoggedIn} from "../../features/auth.slice";

function Logo(props) {
  const loggedIn = useSelector(selectLoggedIn);

  return loggedIn ? (
    <div className={styles.logo}>
      <img src={logo} alt='TODO'/>
    </div>
  ) : (
    <div className={styles.logo}>
      <FontAwesomeIcon icon={faShapes}/>
      <h1>Learning Platform</h1>
    </div>
  );
}

export default Logo;