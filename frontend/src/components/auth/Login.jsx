import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

import validateFields from '../../utils/validator';
import {setUser} from '../../features/auth/auth.slice';
import {InputWrapper, InfoMessageWrapper} from '../../styles/form';
import styles from '../../styles/Form.module.scss';

function Login(props) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameOrEmailError, setUsernameOrEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  function changeUsernameOrEmail(syntheticEvent) {
    setUsernameOrEmail(syntheticEvent.target.value);
    setUsernameOrEmailError('');
  }

  function changePassword(syntheticEvent) {
    setPassword(syntheticEvent.target.value);
    setPasswordError('');
  }

  function handleResponse(response) {
    const user = response.data;
    const action = setUser(user);
    dispatch(action);
    //props.history.push('/dashboard');
  }

  function handleError(error) {
    alert(error);
    setError(error.message);
  }

  function submit(syntheticEvent) {
    syntheticEvent.preventDefault();

    if (usernameOrEmailError || passwordError || error) return;
    const [nameErr, passwordErr] = validateFields([
      {value: usernameOrEmail, type: 'usernameOrEmail'},
      {value: password, type: 'login_password'}
    ]);
    if (nameErr) setUsernameOrEmailError(nameErr);
    if (passwordErr) setPasswordError(passwordErr);
    if (nameErr || passwordErr) return;

    setMessage('Se incarcă...');

    const data = {
      usernameOrEmail: usernameOrEmail,
      password: password
    };
    axios.post('http://localhost:3000/user/login', data)
      .then(handleResponse)
      .catch(handleError);
  }

  return message ? (
    <InfoMessageWrapper className={styles.info} success={message} error={error}>
      <h1>{message}</h1>
      <h1>{error}</h1>
    </InfoMessageWrapper>
  ) : (
    <form className={styles.form}>
      <h1>Intră în cont</h1>

      <InputWrapper className={styles.input} error={usernameOrEmailError}>
        <FontAwesomeIcon icon={faExclamationCircle}/>
        <input type='text' placeholder='nume de utilizator sau email' onChange={changeUsernameOrEmail}/>
        <p>{usernameOrEmailError}</p>
      </InputWrapper>

      <InputWrapper className={styles.input} error={passwordError}>
        <FontAwesomeIcon icon={faExclamationCircle}/>
        <input type='password' placeholder='parolă' onChange={changePassword}/>
        <p>{passwordError}</p>
      </InputWrapper>

      <Link to='/password-reset'>Ai uitat parola?</Link>
      <input type='submit' value='trimite' onClick={submit}/>
    </form>
  );
}

export default Login;