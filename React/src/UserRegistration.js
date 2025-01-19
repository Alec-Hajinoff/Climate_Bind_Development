import React from 'react';
import blue from './blue.svg';
import './UserRegistration.css';

function UserRegistration() {
  return (
    <div class="container text-center">
      <div class="row-auto">
        <br />
      </div>
      <div class="row">
        <div class="col-12 col-md-4">
          <p class="footer">New user? Please register:</p>
          <form class="row g-2" id="myFormRegister" method="POST" action="registered_login.html">
            <div class="form-group">
              <input autocomplete="off" type="text" pattern="[a-zA-Z ]+" class="form-control"
                id="yourFirstName" name="first_name" required placeholder="Your first name" />
            </div>
            <div class="form-group">
              <input autocomplete="off" type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                class="form-control" id="yourEmailRegister" name="email" required
                placeholder="Email address" />
            </div>
            <div class="form-group">
              <input autocomplete="off" type="password" class="form-control" id="yourPasswordRegister"
                name="password" required placeholder="Choose a strong password" />
            </div>
            <div id="error-message" class="error"></div>
            <button type="submit" class="btn btn-secondary" id="registerBtn">Register<span
              class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
              id="spinnerRegister" style={{display: 'none'}}></span></button>
            <div id="registerPlaceholder"></div>
          </form>
        </div>
      </div>
      <br />
    </div>
  );
}

export default UserRegistration; 
