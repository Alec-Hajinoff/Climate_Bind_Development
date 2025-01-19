import React from 'react';
import blue from './blue.svg';
import './Header.css';

function Header() {
  return (
    <div class="container text-center">
      <div class="row">
        <img id="logo" src={blue} alt="A company logo" title="A company logo" />
      </div>
      <div class="row-auto">
        <br />
      </div>
    </div>
  );
}

export default Header;
