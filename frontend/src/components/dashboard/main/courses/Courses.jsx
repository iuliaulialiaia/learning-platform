import {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import mainStyles from '../../../../styles/dashboard/main/Main.module.scss';
import coursesStyles from '../../../../styles/dashboard/main/Courses.module.scss';
import CourseImage from "./CourseImage";
import UserImage from "../user/UserImage";
import {useDispatch, useSelector} from "react-redux";
import {setCourses, selectCourses, setCourse} from '../../../../features/courses.slice';
import {selectToken} from '../../../../features/auth.slice';
import {faFrown} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function Courses(props) {
  const courses = useSelector(selectCourses);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  function clickCourseEvent(course) {
    return () => {
      const action = setCourse(course);
      dispatch(action);
      props.history.push('/dashboard/course');
    };
  }

  function handleResponse(response) {
    const courses = response.data;
    const action = setCourses(courses);
    dispatch(action);
  }

  function handleError(error) {
    alert(error);
  }

  useEffect(() => {
    axios.get('http://localhost:3000/course/' + token)
      .then(handleResponse)
      .catch(handleError);
  }, []);

  return (courses.length) ? (
    <div className={mainStyles.main + ' ' + coursesStyles.courses}>
      {courses.map(course =>
        <div key={course.id} onClick={clickCourseEvent(course)}>
          <CourseImage id={course.id} image={false}/>
          <h3>{course.title}</h3>
          <p>Date {course.date}</p>
        </div>
      )}
    </div>
  ) : (
    <div className={mainStyles.main + ' ' + coursesStyles.notfound}>
      <FontAwesomeIcon icon={faFrown}/>
      <p>Nu am gasit niciun curs</p>
    </div>
  );
}

export default Courses;