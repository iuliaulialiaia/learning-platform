import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import PasswordReset from './PasswordReset';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to='/login'>Autentificare</Link>
        <Link to='/register'>Înregistrare</Link>
      </nav>

      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/password-reset' component={PasswordReset}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
