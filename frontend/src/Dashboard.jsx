import {useDispatch, useSelector} from 'react-redux';
import {setUser, removeUser, selectUsername, selectEmail} from './features/auth/auth.slice';

function Dashboard(props) {
  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);
  const dispatch = useDispatch();

  function logout(syntheticEvent) {
    dispatch(removeUser());
    localStorage.clear();
  }

  return username ? (
    <div>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <button onClick={() => dispatch(setUser({username: 'iulia', email: 'email_iulia'}))}>
        Set User
      </button>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  ) :
    <p>Nu esti logat</p>;
}

export default Dashboard;