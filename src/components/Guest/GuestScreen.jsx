import React, { useState } from 'react';

const GuestScreen = () => {
  const [otp, setOtp] = useState('');
  const [contact, setContact] = useState('+91'); // Start with country code
  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState(''); // State for last name
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(false); // Track OTP visibility
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP has been sent

  // Handle OTP validation
  const validateOtp = (event) => {
    event.preventDefault();
    if (otp === '1234') {
      alert('OTP is valid');
      setIsOtpValid(true);
      setIsOtpVisible(true); // Show OTP input only if valid
    } else {
      alert('Invalid OTP');
      setIsOtpValid(false);
      setIsOtpVisible(false); // Hide OTP input if invalid
    }
  };

  // Handle sending OTP
  const sendOtp = () => {
    // Logic to send OTP, e.g., via SMS or email
    alert(`OTP sent to ${contact}`);
    setIsOtpSent(true); // Set OTP as sent
    setIsOtpVisible(true); // Make OTP input visible
    // For demonstration, we're assuming OTP is '1234'
  };

  // Handle form submission
  const handleSave = (event) => {
    event.preventDefault();
    if (!isOtpValid) {
      alert('Please validate the OTP before saving.');
      return;
    }
    alert('Form saved successfully!');
    // Logic for saving form data can be added here
  };

  // Handle Schedule click
  const handleSchedule = () => {
    alert('Scheduling...');
  };

  return (
    <div className="registration-form">
      <h2>Guest Registration</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            placeholder="Enter your contact number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {isOtpVisible && ( // Show OTP input only if it's valid
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          )}
          <button onClick={sendOtp} type="button" className="send-otp-btn">
            Send OTP
          </button>
          <button onClick={validateOtp} type="button" disabled={!isOtpSent}>
            Validate OTP
          </button>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select id="gender" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" placeholder="Enter amount" required />
        </div>
        <div className="form-group">
          <label>Payment Type</label>
          <select id="paymentType" required>
            <option value="">Select Payment Type</option>
            <option value="cash">Cash</option>
            <option value="scan">Scan</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="transactionId">Transaction ID</label>
          <input type="text" id="transactionId" placeholder="Enter transaction ID" required />
        </div>
        <div className="form-group">
          <button
            onClick={handleSchedule}
            className="schedule-btn" // Updated class name
            type="button"
          >
            Schedule
          </button>
        </div>
        <div className="form-group">
          <button type="submit" className="save-btn"> {/* Added class name for Save button */}
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestScreen;
