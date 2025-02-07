import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function ClaimsDataCapture(){
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({
        incident_date_and_time: "",
        incident_location: "",
        incident_description: "",
        incident_report: null,
        witness_statements: null,
        damage_description: "",
        damage_photos: null,
        property_damaged: "",
        property_purchase_date: "",
        property_estimated_value: "",
        property_receipts: null,
        property_repair_estimates: null,
        total_claim_amount: "",
        bank_account_number: "",
        bank_routing_number: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
          ...formData,
          [name]: files ? files[0] : value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        for (const key in formData) {
          data.append(key, formData[key]);
        }

        // fetch(
        //     "path",
        //     {
        //         method: "POST",
        //         body: data,
        //     }
        //     )
        //     .then((response) => response.json())
        //     .then((data) => {
        //         if (data.success) {
        //         navigate("/path");
        //         } else {
        //         setErrorMessage("Submission failed. Please try again.");
        //         console.log(data);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //         setErrorMessage("An error occurred.");
        //     })
        //     .finally(() => setLoading(false)
        // );
    }

    return(
        <div className="container text-center">
            <h1>File a claim</h1>
            <h2>Incident Details</h2>
            <form onSubmit={handleSubmit}>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row" className="align-middle ">
                                Incident Date and Time
                            </th>
                                <td>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        autoComplete="off"
                                        name="incident_date_and_time"
                                        value={formData.incident_date_and_time}
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <th scope="row" className="align-middle ">
                                Incident Location
                            </th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        pattern="[a-zA-Z ]+"
                                        name="incident_location"
                                        value={formData.incident_location}
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <th scope="row" className="align-middle ">
                                Incident Description
                            </th>
                                <td>
                                    <textarea
                                        className="form-control"
                                        autoComplete="off"
                                        name="incident_description"
                                        value={formData.incident_description}
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <th scope="row" className="align-middle ">
                                Incident Report Document
                            </th>
                                <td>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*,.pdf"
                                        name="incident_report"
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>
                        
                        <tr>
                            <th scope="row" className="align-middle ">
                                Witness Statements
                            </th>
                                <td>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*,.pdf"
                                        name="witness_statements"
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                        <h2>Damaged Property Details</h2>
                        <tr>
                            <th scope="row" className="align-middle ">
                                Damage Description
                            </th>
                                <td>
                                    <textarea
                                        className="form-control"
                                        autoComplete="off"
                                        name="damage_description"
                                        value={formData.damage_description}
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <th scope="row" className="align-middle ">
                                Photos of Damage
                            </th>
                                <td>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*,.pdf"
                                        name="damage_photos"
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <th scope="row" className="align-middle ">
                                Damaged Property and Date of Purchase
                            </th>
                                <td>
                                <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        pattern="[a-zA-Z ]+"
                                        name="incident_location"
                                        value={formData.property_damaged}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="date"
                                        className="form-control"
                                        autoComplete="off"
                                        name="property_purchase_date"
                                        value={formData.property_purchase_date}
                                        onChange={handleChange}
                                    />
                                    {/* This can be used to add another set */}
                                    <button>Add new item</button>
                                </td>
                        </tr>

                        <tr>
                            <th scope="row" className="align-middle ">
                                Estimated Damaged Property Value
                            </th>
                                <td>
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-control"
                                        autoComplete="off"
                                        //still lets me put letters
                                        pattern="[0-9]"
                                        name="property_estimated_value"
                                        value={formData.property_estimated_value}
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <th scope="row" className="align-middle ">
                                Original Receipts of Damaged Property
                            </th>
                                <td>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*,.pdf"
                                        name="property_receipts"
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <th scope="row" className="align-middle ">
                                Property Repair Estimates
                            </th>
                                <td>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*,.pdf"
                                        name="property_repair_estimates"
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>
                        
                        <h2>Claimant Information</h2>
                        
                        <tr>
                            <th scope="row" className="align-middle ">
                                Total Claim Amount
                            </th>
                                <td>
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-control"
                                        autoComplete="off"
                                        //still lets me put letters
                                        pattern="[0-9]"
                                        name="total_claim_amount"
                                        value={formData.total_claim_amount}
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <th scope="row" className="align-middle ">
                                Bank Account Number
                            </th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        //still lets me put letters
                                        pattern="[0-9]"
                                        name="bank_account_number"
                                        value={formData.bank_account_number}
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <th scope="row" className="align-middle ">
                                Bank Account Number
                            </th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        //still lets me put letters
                                        pattern="[0-9]"
                                        name="bank_routing_number"
                                        value={formData.bank_routing_number}
                                        onChange={handleChange}
                                    />
                                </td>
                        </tr>

                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default ClaimsDataCapture