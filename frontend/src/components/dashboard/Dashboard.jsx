import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-modal';

import {removeUser, selectUsername, selectEmail, selectLoggedIn} from '../../features/auth.slice';
import Navbar from './navbar/Navbar';

import Aside from "./aside/Aside";
import Main from './Main';
import UserAccount from "./main/user/UserAccount";
import ProfilePicture from "./ProfilePicture";
import Courses from "./main/courses/Courses";
import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "../auth/Auth";
import CourseImage from "./main/courses/CourseImage";
import Course from "./main/courses/Course";

import styles from '../../styles/Modal.module.scss';
import {selectCategories} from "../../features/courses.slice";
import NewCourse from "./main/courses/NewCourse";

const customStyles = {
  overlay: {
    backgroundColor: '#959DA533'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    backgroundColor: '#FFFFFA'
  },
};

Modal.setAppElement('#root');

function Dashboard(props) {
  const loggedIn = useSelector(selectLoggedIn);

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const categories = useSelector(selectCategories);

  function changeTitleEvent(event) {
    setTitle(event.target.value);
  }

  function changeSubtitleEvent(event) {
    setSubtitle(event.target.value);
  }

  return loggedIn ? (
    <>
      <Navbar setShow={setShow}/>
      <Aside/>

      <Switch>
        <Route path='/dashboard/new-course' component={NewCourse}/>
        <Route path='/dashboard/course' component={Course}/>
        <Route path='/dashboard' component={Courses}/>
      </Switch>

      <Modal
        isOpen={show}
        onRequestClose={() => setShow(false)}
        style={customStyles}
      >
        <div className={styles.modal}>
          <h2>ADAUGĂ UN CURS</h2>
          <input type='text' onChange={changeTitleEvent}/>
          <input type='text' onChange={changeSubtitleEvent}/>

          {categories.map((category, index) =>
            <div key={index}>
              {JSON.stringify(category, null, 2)}
            </div>
          )}
          <textarea/>

          <div>
            <button type='button'>Renunță</button>
            <button type='button'>Adaugă</button>
          </div>
        </div>
      </Modal>
    </>
  ) : <Redirect to='/login'/>;
}

export default Dashboard;