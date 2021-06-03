import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShapes} from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/navbar/Navbar.module.scss';

function Navbar(props) {
  return (
    <div className={styles.auth + ' ' + styles.navbar}>
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