import React from 'react';
import blue from './blue.svg';
import './UserLogin.css';

function UserLogin() {
  return (
    <form className="row g-2" id="myFormLogin" method="POST" action="login_capture.php">
      <div className="form-group">
        <input autocomplete="off" type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          className="form-control" id="yourEmailLogin" name="email" required placeholder="Email address" />
      </div>
      <div className="form-group">
        <input autocomplete="off" type="password" className="form-control" id="yourPasswordLogin"
          name="password" required placeholder="Password" />
      </div>
      <div id="error-message-one" className="error"></div>
      <button type="submit" className="btn btn-secondary" id="loginBtn">Login<span
        className="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinnerLogin"
        style={{ display: 'none' }}></span></button>
      <div id="liveAlertPlaceholder"></div>
    </form>
  );
}

export default UserLogin;
