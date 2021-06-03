import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {removeUser, selectUsername, selectEmail} from '../../features/auth/auth.slice';
import Navbar from './Navbar';

import Aside from "./Aside";
import Main from './Main';
import UserAccount from "../user/UserAccount";
import ProfilePicture from "./ProfilePicture";

function Dashboard(props) {
  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);

  return (
    <>
      <Navbar/>
      <Aside/>
      <UserAccount/>
      {/*<ProfilePicture/>*/}
    </>
  );
}

// <div>
//   <p>Username: {username}</p>
//   <p>Email: {email}</p>
//
//   <button onClick={logout}>
//     Logout
//   </button>
// </div>

export default Dashboard;