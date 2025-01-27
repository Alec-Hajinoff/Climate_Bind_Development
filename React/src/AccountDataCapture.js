import React from 'react';
import blue from './blue.svg';
import './AccountDataCapture.css';

function AccountDataCapture() {
  return (
    <div classNameName="container text-center">
    <table className="table table-bordered">
      <tbody>
        <tr>
          <th scope="row" className="align-middle ">Surname</th>
          <td><input type="text" className="form-control" placeholder="Surname" required /></td>
        </tr>
        <tr>
          <th scope="row" className="align-middle">Date of Birth</th>
          <td><input type="date" className="form-control" required /></td>
        </tr>
        <tr>
    <th scope="row" className="align-middle">Upload Passport Copy (page showing photo)</th>
    <td>
      <input type="file" className="form-control" accept="image/*,.pdf" required />
    </td>
  </tr>
        <tr>
          <th scope="row" className="align-middle">Last Name</th>
          <td><input type="text" className="form-control" placeholder="Enter Last Name" required /></td>
        </tr>
        <tr>
          <th scope="row" className="align-middle">Email</th>
          <td><input type="email" className="form-control" placeholder="Enter Email" required /></td>
        </tr>
        <tr>
          <th scope="row" className="align-middle">Phone Number</th>
          <td><input type="tel" className="form-control" placeholder="Enter Phone Number" /></td>
        </tr>
        <tr>
          <th scope="row" className="align-middle">Address</th>
          <td><input type="text" className="form-control" placeholder="Enter Address" /></td>
        </tr>
        <tr>
          <th scope="row" className="align-middle">Password</th>
          <td><input type="password" className="form-control" placeholder="Enter Password" /></td>
        </tr>
      </tbody>
    </table>
  </div>
  );
}

export default AccountDataCapture;
