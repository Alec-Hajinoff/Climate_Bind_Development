import React, { useState, useEffect } from "react";
import "./ClaimDataCapture.css";
import LogoutComponent from "./LogoutComponent";
import { useNavigate } from "react-router-dom";
import { createPolicy, fetchPremiumPayout } from "./ApiService";

function ClaimDataCapture() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [postcode, setPostcode] = useState('');
  const [payout, setPayout] = useState(null);
  const [premium, setPremium] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postcode && selectedEvent) {
      //The below API call pulls premium and payout data from the database to update the interface when a user changes the postcode or selected event.
      fetchPremiumPayout(postcode, selectedEvent)
        .then(data => {
          setPayout(data.payout);
          setPremium(data.premium);
        })
        .catch(error => {
          console.error('Error:', error);
          setErrorMessage('Failed to fetch premium and payout data');
        });
    }
  }, [postcode, selectedEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createPolicy({
        postcode,
        premium,
        payout,
        event: selectedEvent
      });
      if (data.success) {
        navigate("/SubmittedClaim");
      } else {
        setErrorMessage(data.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center">
      <div className="d-flex justify-content-end mb-3">
        <LogoutComponent />
      </div>
      <form onSubmit={handleSubmit}>
      <div className="container my-0">
        <div className="row align-items-center g-0">
          <div className="col-9">
            <h5 className="mb-0">Select the postcode of the area you'd like your policy to cover:</h5>
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control ms-2"
              placeholder="Enter postcode (e.g. SW1A 1AA)"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>
        </div>
          <h5 className="mb-3">Select events you'd like your policy to cover:</h5>
      <div className="d-flex justify-content-center mb-2">
        <div className="form-check mb-2" style={{ width: "400px" }}>
          <label className="form-check-label" htmlFor="wind">
            Wind &gt; 50 km/h
          </label>
          <input
            className="form-check-input float-end"
            type="checkbox"
            id="wind"
            checked={selectedEvent === 'wind'}
            onChange={() => setSelectedEvent(selectedEvent === 'wind' ? null : 'wind')}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mb-2">
        <div className="form-check mb-2" style={{ width: "400px" }}>
          <label className="form-check-label" htmlFor="rain">
            Rainfall &gt; 100 mm in 24h
          </label>
          <input
            className="form-check-input float-end"
            type="checkbox"
            id="rain"
            checked={selectedEvent === 'rain'}
            onChange={() => setSelectedEvent(selectedEvent === 'rain' ? null : 'rain')}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mb-2">
        <div className="form-check mb-2" style={{ width: "400px" }}>
          <label className="form-check-label" htmlFor="drought">
            Drought (No rain &gt; 90 days)
          </label>
          <input
            className="form-check-input float-end"
            type="checkbox"
            id="drought"
            checked={selectedEvent === 'drought'}
            onChange={() => setSelectedEvent(selectedEvent === 'drought' ? null : 'drought')}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <div className="form-check mb-2" style={{ width: "400px" }}>
          <label className="form-check-label" htmlFor="temperature">
            Temperature &gt; 40°C
          </label>
          <input
            className="form-check-input float-end"
            type="checkbox"
            id="temperature"
            checked={selectedEvent === 'temperature'}
            onChange={() => setSelectedEvent(selectedEvent === 'temperature' ? null : 'temperature')}
          />
        </div>
      </div>

      <div className="mt-4">
        <h5>The payout amount for this cover will be USDC:</h5>
        <p className="lead">{payout !== null ? `${payout} USDC` : '—'}</p>
      </div>

      <div className="mt-3">
        <h5>The monthly premium for this cover is USDC:</h5>
        <p className="lead">{premium !== null ? `${premium} USDC` : '—'}</p>
      </div>
    </div>
        <div className="d-flex justify-content-end mb-3">
          <th scope="row" className="align-middle">
            <div id="error-message" className="error" aria-live="polite">
              {errorMessage}
            </div>
            <button
              type="submit"
              className="btn btn-secondary"
              id="loginBtnOne"
            >
              Submit
              <span
                role="status"
                aria-hidden="true"
                id="spinnerLogin"
                style={{ display: loading ? "inline-block" : "none" }}
              ></span>
            </button>
          </th>
        </div>
      </form>
    </div>
  );
}

export default ClaimDataCapture;