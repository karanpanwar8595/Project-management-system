// ChangePassword.js
import React, { useState } from 'react';
import './changepassword.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChangePassword = () => {
    // Perform validation and password change logic here
    // For simplicity, let's assume a basic validation for this example
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    if (currentPassword === newPassword) {
      setError('Current password and new password cannot be the same.');
      return;
    }

    // Additional password validation (minimum 8 characters with special character)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('New password must be at least 8 characters and include a special character.');
      return;
    }

    // Perform the actual password change logic here

    // Reset form and error state after successful password change
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setError('');
    setSuccess(true);
  };

  return (
    <div className="changePasswordContainer">
      <h2 className="changePasswordHeader">Change Password</h2>
      <div className="inputGroup">
        <label htmlFor="currentPassword">Current Password</label>
        <div className="passwordInput">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            required
          />
          <button
            className="eyeIcon"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <i className="far fa-eye-slash"></i>
            ) : (
              <i className="far fa-eye"></i>
            )}
          </button>
        </div>
      </div>
      <div className="inputGroup">
        <label htmlFor="newPassword">New Password</label>
        <div className="passwordInput">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
          <button
            className="eyeIcon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <i className="far fa-eye-slash"></i>
            ) : (
              <i className="far fa-eye"></i>
            )}
          </button>
        </div>
      </div>
      <div className="inputGroup">
        <label htmlFor="confirmNewPassword">Re-enter New Password</label>
        <div className="passwordInput">
          <input
            type={showConfirmNewPassword ? 'text' : 'password'}
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Re-enter new password"
            required
          />
          <button
            className="eyeIcon"
            onClick={() =>
              setShowConfirmNewPassword(!showConfirmNewPassword)
            }
          >
            {showConfirmNewPassword ? (
              <i className="far fa-eye-slash"></i>
            ) : (
              <i className="far fa-eye"></i>
            )}
          </button>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {success && (
        <div className="success">
          Password updated successfully!
        </div>
      )}
      <br />
      <button className="submitButtonchange" onClick={handleChangePassword}>
        Update passsword
      </button>
    </div>
  );
};

export default ChangePassword;
