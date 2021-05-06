import React from 'react';

function PasswordReset(props) {

  function submit(syntheticEvent) {
    syntheticEvent.preventDefault();
  }

  return (
    <form>
      <h1>Resetare parolă</h1>
      <input type='email' placeholder='email'/>
      <input type='submit' value='trimite' onClick={submit}/>
    </form>
  );
}

export default PasswordReset;