import React from 'react';
import blue from './blue.svg';
import './MainRegLog.css';
import Main from './Main.js';
import UserRegistration from './UserRegistration.js';
import UserLogin from './UserLogin.js';

function MainRegLog() {
  return (
    <div class="container text-center">
      <div class="row">
        <div class="col-12 col-md-8">
          <Main />
        </div>
        <div class="col-12 col-md-4">
          <p class="footer">New user? Please register:</p>
          <UserRegistration />
          <p class="footer">Existing user? Please login:</p>
          <UserLogin />
        </div>
      </div>
    </div>
  )
}

export default MainRegLog;
