import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShapes} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

import styles from './styles/Navbar.module.scss';

function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <FontAwesomeIcon icon={faShapes}/>
      <h1>Learning Platform</h1>

      <nav>
        <Link to='/login'>Autentificare</Link>
        <Link to='/register'>Înregistrare</Link>
      </nav>
    </div>
  );
}

export default Navbar;