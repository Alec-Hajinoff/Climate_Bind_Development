import React, { useState, useEffect } from "react";
import "./PayorSummary.css";

function PayorSummary(){
    const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:8001/Climate_Bind_Development/claim_calculations.php",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching table data:", error));
  }, []);
    
    return(
        <div className="container text-center">
            <p>
                Welcome to your page! Below, you will find
                a list of the claimant's insurers, the amounts you owe them, and 
                their contact details. Expect them to reach out to you in order to 
                arrange their claim payout.
            </p>
            <table className="table table-bordered">
                <tr>
                    <th>Name of their insurer</th>
                    <th>Their email address</th>
                    <th>Phone number</th>
                    <th>Address</th>
                    <th>The amount you owe them USD $</th>
                </tr>
                <tbody>
                    <td>
                        <tr>Delete Me</tr>
                    </td>
                    <td>
                        <tr>Delete Me</tr>
                    </td>
                    <td>
                        <tr>Delete Me</tr>
                    </td>
                    <td>
                        <tr>Delete Me</tr>
                    </td>
                    <td>
                        <tr>Delete Me</tr>
                    </td>

                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.phone}</td>
                            <td>{row.address}</td>
                            <td>{row.payout}</td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PayorSummary