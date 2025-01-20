import React from 'react';
import blue from './blue.svg';
import './UserRegistration.css';

function UserRegistration() {
  return (
    <form className="row g-2" id="myFormRegister" method="POST" action="registered_login.html">
      <div className="form-group">
        <input autocomplete="off" type="text" pattern="[a-zA-Z ]+" className="form-control"
          id="yourFirstName" name="first_name" required placeholder="Your first name" />
      </div>
      <div className="form-group">
        <input autocomplete="off" type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          className="form-control" id="yourEmailRegister" name="email" required
          placeholder="Email address" />
      </div>
      <div className="form-group">
        <input autocomplete="off" type="password" className="form-control" id="yourPasswordRegister"
          name="password" required placeholder="Choose a strong password" />
      </div>
      <div id="error-message" className="error"></div>
      <button type="submit" className="btn btn-secondary" id="registerBtn">Register<span
        className="spinner-border spinner-border-sm" role="status" aria-hidden="true"
        id="spinnerRegister" style={{ display: 'none' }}></span></button>
      <div id="registerPlaceholder"></div>
    </form>
  );
}

export default UserRegistration; 
