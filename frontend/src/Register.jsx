import React, {useState} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

import validateFields from './utils/validator';
import {InputWrapper, InfoMessageWrapper} from './styles/form';
import styles from './styles/Form.module.scss';

function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password1Error, setPassword1Error] = useState('');
  const [password2Error, setPassword2Error] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function changeUsername(syntheticEvent) {
    setUsername(syntheticEvent.target.value);
    setUsernameError('');
  }

  function changeEmail(syntheticEvent) {
    setEmail(syntheticEvent.target.value);
    setEmailError('');
  }

  function changePassword1(syntheticEvent) {
    setPassword1(syntheticEvent.target.value);
    setPassword1Error('');
  }

  function changePassword2(syntheticEvent) {
    setPassword2(syntheticEvent.target.value);
    setPassword2Error('');
  }

  function handleResponse(response) {
    setMessage('V-am trimis un email de confirmare!');
  }

  function handleError(error) {
    setError(error.message);
  }

  function submit(syntheticEvent) {
    syntheticEvent.preventDefault();

    if (usernameError || emailError || password1Error || password2Error || error) return;
    const [usernameErr, emailErr, password1Err, password2Err] = validateFields([
      {value: username, type: 'username'},
      {value: email, type: 'email'},
      {value: password1, type: 'new_password'},
      {value: password2, type: 'confirm', reference: password1}
    ]);
    if (usernameErr) setUsernameError(usernameErr);
    if (emailErr) setEmailError(emailErr);
    if (password1Err) setPassword1Error(password1Err);
    if (password2Err) setPassword2Error(password2Err);
    if (usernameErr || emailErr || password1Err || password2Err) return;

    setMessage('Se incarcă...');

    const data = {
      username: username,
      email: email,
      password: password1,
      role: syntheticEvent.target.value
    };
    axios.post('http://localhost:3000/user', data)
      .then(response => handleResponse(response))
      .catch(error => handleError(error));
  }

  return message ? (
    <InfoMessageWrapper className={styles.info} success={message} error={error}>
      <h1>{message}</h1>
      <h1>{error}</h1>
    </InfoMessageWrapper>
  ) : (
    <form className={styles.form}>
      <h1>Creează un cont nou</h1>

      <InputWrapper className={styles.input} error={usernameError}>
        <FontAwesomeIcon icon={faExclamationCircle}/>
        <input type='text' placeholder='nume de utilizator' onChange={changeUsername}/>
        <p>{usernameError}</p>
      </InputWrapper>

      <InputWrapper className={styles.input} error={emailError}>
        <FontAwesomeIcon icon={faExclamationCircle}/>
        <input type='email' placeholder='email' onChange={changeEmail}/>
        <p>{emailError}</p>
      </InputWrapper>

      <InputWrapper className={styles.input} error={password1Error}>
        <FontAwesomeIcon icon={faExclamationCircle}/>
        <input type='password' placeholder='parolă' onChange={changePassword1}/>
        <p>{password1Error}</p>
      </InputWrapper>

      <InputWrapper className={styles.input} error={password2Error}>
        <FontAwesomeIcon icon={faExclamationCircle}/>
        <input type='password' placeholder='confirmare parolă' onChange={changePassword2}/>
        <p>{password2Error}</p>
      </InputWrapper>

      <div className={styles.submit}>
        <input type='submit' value='student' onClick={submit}/>
        <input type='submit' value='profesor' onClick={submit}/>
      </div>
    </form>
  );
}

export default Register;