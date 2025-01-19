import React from 'react';
import blue from './blue.svg';
import './UserLogin.css';

function UserLogin() {
  return (
    <div class="container text-center">
      <div class="row-auto">
        <br />
      </div>
      <div class="row">
        <div class="col-12 col-md-4">
        <p class="footer">Existing user? Please login:</p>
                <form class="row g-2" id="myFormLogin" method="POST" action="login_capture.php">
                    <div class="form-group">
                        <input autocomplete="off" type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            class="form-control" id="yourEmailLogin" name="email" required placeholder="Email address" />
                    </div>
                    <div class="form-group">
                        <input autocomplete="off" type="password" class="form-control" id="yourPasswordLogin"
                            name="password" required placeholder="Password" />
                    </div>
                    <div id="error-message-one" class="error"></div>
                    <button type="submit" class="btn btn-secondary" id="loginBtn">Login<span
                            class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinnerLogin"
                            style={{display: 'none'}}></span></button>
                    <div id="liveAlertPlaceholder"></div>
                </form>
        </div>
      </div>
      <br />
    </div>
  );
}

export default UserLogin;
