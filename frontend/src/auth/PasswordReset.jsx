import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

import validateFields from '../utils/validator';
import {InputWrapper, InfoMessageWrapper} from '../styles/form';
import styles from '../styles/Form.module.scss';

function PasswordReset(props) {
  const {token} = useParams();

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [password1Error, setPassword1Error] = useState('');
  const [password2Error, setPassword2Error] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function changePassword1(syntheticEvent) {
    setPassword1(syntheticEvent.target.value);
    setPassword1Error('');
  }

  function changePassword2(syntheticEvent) {
    setPassword2(syntheticEvent.target.value);
    setPassword2Error('');
  }

  function handleResponse(response) {
    setMessage('Parola a fost modificată cu succes!');
  }

  function handleError(error) {
    setError(error.message);
  }

  function submit(syntheticEvent) {
    syntheticEvent.preventDefault();

    if (password1Error || password2Error || error) return;
    const [tokenErr, password1Err, password2Err] = validateFields([
      {value: token, type: 'jwt'},
      {value: password1, type: 'new_password'},
      {value: password2, type: 'confirm', reference: password1}
    ]);
    if (tokenErr) setError(tokenErr);
    if (password1Err) setPassword1Error(password1Err);
    if (password2Err) setPassword2Error(password2Err);
    if (tokenErr || password1Err || password2Err) return;

    setMessage('Se încarcă...');

    const data = {password: password1};
    axios.patch(`http://localhost:3000/user/${token}`, data)
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

      <input type='submit' value='trimite' onClick={submit}/>
    </form>
  );
}

export default PasswordReset;