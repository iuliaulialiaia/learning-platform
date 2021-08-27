import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShapes} from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/navbar/Navbar.module.scss';
import Logo from "../logo/Logo";

function Navbar(props) {
  return (
    <>
      <div className={styles.navbar + ' ' + styles.auth}>
        <Logo/>

        <nav>
          <Link to='/login'>AUTENTIFICARE</Link>
          <Link to='/register'>ÎNREGISTRARE</Link>
        </nav>
      </div>
    </>

  );
}

export default Navbar;