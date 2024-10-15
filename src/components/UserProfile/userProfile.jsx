import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import ReCAPTCHA from 'react-google-recaptcha';
import './UserProfileScreen.css'; // Import your styles

const UserProfileScreen = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [otpNumberVisible, setOtpNumberVisible] = useState(false);
    const [otpEmailVisible, setOtpEmailVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const captchaRef = useRef();
    const [captcha, setCaptcha] = useState('');

    const sendOtp = (type) => {
        alert(`Sending OTP to ${type}`);
        if (type === 'number') {
            setOtpNumberVisible(true);
        } else if (type === 'email') {
            setOtpEmailVisible(true);
        }
    };

    const updateProfile = () => {
        if (!captchaValue) {
            alert('Please complete the CAPTCHA.');
            return;
        }
        alert('Profile updated successfully!');
    };

    const cancelUpdate = () => {
        alert('Update cancelled');
        if (captchaRef.current) {
            captchaRef.current.reset();
        }
        setOtpNumberVisible(false);
        setOtpEmailVisible(false);
        setCaptchaValue(null);
    };

    // const onCaptchaChange = (value) => {
    //     setCaptchaValue(value);
    // };

    return (
        <div className="profile-container">
            <h2>User Profile Screen</h2>

            <div className="p-field">
                <label htmlFor="name">Name</label>
                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="p-field">
                <label htmlFor="address">Address</label>
                <InputText id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="p-field">
                <label htmlFor="number">Number</label>
                <div className="p-inputgroup">
                    <InputText id="number" value={number} onChange={(e) => setNumber(e.target.value)} />
                    <Button label="Send OTP" onClick={() => sendOtp('number')} />
                </div>
            </div>

            {otpNumberVisible && (
                <div className="p-field">
                    <label htmlFor="otp-number">Enter OTP for Number</label>
                    <InputText id="otp-number" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </div>
            )}

            <div className="p-field">
                <label htmlFor="email">Email</label>
                <div className="p-inputgroup">
                    <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button label="Send OTP" onClick={() => sendOtp('email')} />
                </div>
            </div>

            {otpEmailVisible && (
                <div className="p-field">
                    <label htmlFor="otp-email">Enter OTP for Email</label>
                    <InputText id="otp-email" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </div>
            )}

            {/* <div className="p-field captcha-box">
                <label htmlFor="captcha">Captcha</label>
                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey="YOUR_SITE_KEY_HERE" // Replace with your site key
                    onChange={onCaptchaChange}
                />
            </div> */}
            <div className="p-field">
                <label htmlFor="captcha">Enter Captcha</label>
                <InputText id="captcha" value={captcha} onChange={(e) => setCaptcha(e.target.value)} />
            </div>

            <div className="button-group">
                <Button label="Update" className="p-button-success" onClick={updateProfile} />
                <Button label="Cancel" className="p-button-danger" onClick={cancelUpdate} />
            </div>
        </div>
    );
};

export default UserProfileScreen;