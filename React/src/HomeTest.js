import React from 'react';
import blue from './blue.svg';
import './HomeTest.css';

function HomePage() {
  return (
    <div class="container text-center">
      <div class="row">
        <img id="logo" src={blue} alt="A company logo" title="A company logo" />
      </div>
      <div class="row-auto">
        <br />
      </div>
      <div class="row">
        <div class="col-12 col-md-8">
          <p>Climate Bind is an open-source, free-to-use peer-to-peer insurance web application offering
            insurance cover for damage to residential buildings caused by severe weather events.</p>
        </div>
      </div>
      <br />
      <div class="row">
        <p class="footer"><em>Company address: 4 Bridge Gate, London, N21 2AH, United Kingdom. Email address:<span> </span>
          <a href="mailto:team@climatebind.com">team@climatebind.com</a></em></p>
      </div>
    </div>
  );
}

export default HomePage;
