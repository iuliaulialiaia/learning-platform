import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";

function CourseImage(props) {
  return props.image ? (
    <img src={'https://localhost:3000/course/image/' + props.id} alt='TODO'/>
  ) : (
    <FontAwesomeIcon icon={faImage}/>
  );
}

export default CourseImage;