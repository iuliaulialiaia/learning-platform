import React from 'react';
import {Link} from 'react-router-dom';

function Login(props) {

  function submit(syntheticEvent) {
    syntheticEvent.preventDefault();
  }

  return (
    <form>
      <h1>Autentificare</h1>
      <input type='text' placeholder='nume sau email'/>
      <input type='password' placeholder='parolă'/>
      <Link to='/password-reset'>Am uitat parola</Link>
      <input type='submit' value='trimite' onClick={submit}/>
    </form>
  );
}

export default Login;