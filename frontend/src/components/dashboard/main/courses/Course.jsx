import mainStyles from "../../../../styles/dashboard/main/Main.module.scss";
import {useSelector} from "react-redux";
import {selectCourse} from "../../../../features/courses.slice";

import courseStyle from '../../../../styles/dashboard/main/Course.module.scss';

function Course(props) {
  const course = useSelector(selectCourse);

  return (
    <div className={mainStyles.main + ' ' + courseStyle.course}>
      <header>
        <h1>{course.title}</h1>
        <h3>{course.subtitle}</h3>
        <p>data {course._date}</p>

        <div>
          <h2>{course.description}</h2>
        </div>
      </header>

      <main>

      </main>

      <footer/>
    </div>
  );
}

export default Course;