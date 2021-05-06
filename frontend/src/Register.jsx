import React, {useState} from 'react';
import axios from 'axios';

function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  function handleResponse(response) {
    console.log(response);/////////
    localStorage.setItem('token', response.data);
  }

  function handleError(error) {
    alert(error);
  }

  function changeUsernameEvent(syntheticEvent) {
    setUsername(syntheticEvent.target.value);
  }

  function changeEmailEvent(syntheticEvent) {
    setEmail(syntheticEvent.target.value);
  }

  function changePassword1Event(syntheticEvent) {
    setPassword1(syntheticEvent.target.value);
  }

  function changePassword2Event(syntheticEvent) {
    setPassword2(syntheticEvent.target.value);
  }

  function submit(syntheticEvent) {
    syntheticEvent.preventDefault();

    if (password1 !== password2) {
      alert('Parolele nu coincid');
      return;
    }

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

  return (
    <form>
      <h1>Înregistrare</h1>

      <input type='text' placeholder='nume' onChange={changeUsernameEvent}/>
      <input type='email' placeholder='email' onChange={changeEmailEvent}/>
      <input type='password' placeholder='parolă' onChange={changePassword1Event}/>
      <input type='password' placeholder='confirmare parolă' onChange={changePassword2Event}/>

      <input type='submit' value='student' onClick={submit}/>
      <input type='submit' value='profesor' onClick={submit}/>
    </form>
  );
}

export default Register;