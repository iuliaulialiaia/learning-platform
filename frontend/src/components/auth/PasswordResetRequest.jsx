import React, {useState} from 'react';
import axios from 'axios';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import validateFields from '../../utils/validator';
import {InputWrapper, InfoMessageWrapper} from '../../styles/auth/form';
import styles from '../../styles/auth/Form.module.scss';

function PasswordResetRequest(props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function changeEmail(syntheticEvent) {
    setEmail(syntheticEvent.target.value);
    setEmailError('');
  }

  function handleResponse(response) {
    setMessage('V-am trimis un email de resetare a parolei!');
  }

  function handleError(error) {
    setError(error.message);
  }

  function submit(syntheticEvent) {
    syntheticEvent.preventDefault();

    if (emailError || error) return;
    const [emailErr] = validateFields([{value: email, type: 'email'}]);
    if (emailErr) {
      setEmailError(emailErr);
      return;
    }

    setMessage('Se încarcă...');

    const data = {email: email};
    axios.post('http://localhost:3000/password_reset', data)
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
      <h1>Resetare parolă</h1>

      <InputWrapper className={styles.input} error={emailError}>
        <FontAwesomeIcon icon={faExclamationCircle}/>
        <input type='email' placeholder='email' onChange={changeEmail}/>
        <p>{emailError}</p>
      </InputWrapper>

      <input type='submit' value='trimite' onClick={submit}/>
    </form>
  );
}

export default PasswordResetRequest;