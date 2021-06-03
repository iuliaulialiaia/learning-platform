import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBookOpen,
  faAward,
  faBriefcase,
  faEnvelope,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import {faFacebookSquare, faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";

import {selectDescription, selectTitle, selectUsername} from "../../features/auth/auth.slice";
import ProfilePicture from "./ProfilePicture";
import styles from '../../styles/main/Main.module.scss';

function UserAccount(props) {
  const username = useSelector(selectUsername);
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);

  return (
    <div className={styles.main}>
      <ProfilePicture/>
      <h1>{username}</h1>
      <p>{title}</p>

      <div>
        <button>despre mine</button>
        <button>cursurile mele</button>
      </div>

      <p>{description}</p>

      <div>
        <p>CARIERĂ</p>
        <div>
          <FontAwesomeIcon icon={faBriefcase}/>
          <p>exemplu</p>
        </div>
      </div>

      <div>
        <p>PREMII</p>
        <div>
          <FontAwesomeIcon icon={faAward}/>
          <p>exemplu</p>
        </div>
      </div>

      <div>
        <p>CĂRȚI/ARTICOLE</p>
        <div>
          <FontAwesomeIcon icon={faBookOpen}/>
          <p>exemplu</p>
        </div>
      </div>

      <div>
        <p>EDUCAȚIE</p>
        <div>
          <FontAwesomeIcon icon={faGraduationCap}/>
          <p>exemplu</p>
        </div>
      </div>

      <div>
        <p>CONTACT</p>
        <Link to='/'>
          <FontAwesomeIcon icon={faFacebookSquare}/>
        </Link>
        <Link to='/'>
          <FontAwesomeIcon icon={faInstagram}/>
        </Link>
        <Link to='/'>
          <FontAwesomeIcon icon={faYoutube}/>
        </Link>
        <Link to='/'>
          <FontAwesomeIcon icon={faEnvelope}/>
        </Link>
        <Link to='/'>
          <FontAwesomeIcon icon={faGlobe}/>
        </Link>
      </div>

    </div>
  );
}

export default UserAccount;