import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import validateFields from '../../utils/validator';
import {InfoMessageWrapper} from '../../styles/auth/form';
import styles from '../../styles/auth/Form.module.scss';

function EmailConfirmation(props) {
  const {token} = useParams();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('Se incarcă...');

  function handleResponse(response) {
    setMessage('Email confirmat!');
  }

  function handleError(error) {
    setError(error.message);
  }

  useEffect(() => {
    if (error) return;
    const [tokenErr] = validateFields([{value: token, type: 'jwt'}]);
    if (tokenErr) {
      setError(tokenErr);
      return;
    }

    const data = {emailConfirmation: true};
    axios.patch(`http://localhost:3000/user/${token}`, data)
      .then(response => handleResponse(response))
      .catch(error => handleError(error));
  }, []);

  return (
    <InfoMessageWrapper className={styles.info} success={message} error={error}>
      <h1>{message}</h1>
      <h1>{error}</h1>
    </InfoMessageWrapper>
  );
}

export default EmailConfirmation;