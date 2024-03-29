import React, { useState } from 'react';
import './Setting.css';

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('UserInformation');
  const [profile, setProfile] = useState({
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    // Add other profile details here
  });
  const [editMode, setEditMode] = useState(false);
  const [newProfile, setNewProfile] = useState({});
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [newCreditCardNumber, setNewCreditCardNumber] = useState('');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setNewProfile(profile); // Set the new profile to current profile
  };

  const handleSaveClick = () => {
    setProfile(newProfile); // Update profile with new profile information
    setEditMode(false);
    setNewProfile({}); // Reset new profile
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setNewProfile({}); // Reset new profile
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setNewProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleCreditCardChange = (e) => {
    setNewCreditCardNumber(e.target.value);
  };

  const handleEditCreditCard = () => {
    setEditMode(true);
    setNewCreditCardNumber(creditCardNumber); 
  };

  const handleSaveCreditCard = () => {
    if (!/^\d{12,}$/.test(newCreditCardNumber)) { //เช็คว่าเป็นตัวเลขมั้ย
        alert("กรุณากรอกเฉพาะตัวเลขเท่านั้น (12 ตัว)");
        return; 
      }

    setCreditCardNumber(newCreditCardNumber); 
    setEditMode(false);
    setNewCreditCardNumber(''); 
  };

  const handleCancelCreditCard = () => {
    setEditMode(false);
    setNewCreditCardNumber(''); 
  };

  return (
    <div className="settings-page">
      <div className="sidebar">
        <div className="header">
          Setting
        </div>
        <button onClick={() => openTab('UserInformation')}>ข้อมูลผู้ใช้</button>
        <button onClick={() => openTab('Password')}>รหัสผ่าน</button>
        <button onClick={() => openTab('Credit-card')}>ข้อมูลบัตรเครดิต</button>
      </div>
      
      <div className="content">
        <div id="UserInformation" className={activeTab === 'UserInformation' ? 'tab active' : 'tab'}>
          <h2>User Information</h2>
          {!editMode ? (
            <div className="profile-info">
              <p>Username: {profile.username}</p>
              <p>Email: {profile.email}</p>
              <button className="edit-button" onClick={handleEditClick}>Edit</button>
            </div>
          ) : (
            <div className="edit-mode">
              <input type="text" name="username" value={newProfile.username || ''} placeholder="Username" onChange={handleProfileChange} />
              <input type="text" name="email" value={newProfile.email || ''} placeholder="Email" onChange={handleProfileChange} />
              <div className="button-group">
                <button className="save-button" onClick={handleSaveClick}>Save</button>
                <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        
        <div id="Password" className={activeTab === 'Password' ? 'tab active' : 'tab'}>
            <h2>Password</h2>
            <div className="password-change-form">
                <input type="password" placeholder="Old Password" />
                <input type="password" placeholder="New Password" />
                <input type="password" placeholder="Confirm New Password" />
                <div className="button-group">
                    <button className="save-button">Save</button>
                    <button className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
        
        <div id="Credit-card" className={activeTab === 'Credit-card' ? 'tab active' : 'tab'}>
          <h2>เพิ่มบัตร</h2>
          {!editMode ? (
            <div className="credit-card-info">
              {creditCardNumber ? (
                <p>Credit Card Number: {creditCardNumber}</p>
              ) : (
                <p>No credit card added</p>
              )}
              <button className="edit-button" onClick={handleEditCreditCard}>Edit</button>
            </div>
          ) : (
            <div className="edit-mode">
              <input type="text" value={newCreditCardNumber} placeholder="Enter Credit Card Number" onChange={handleCreditCardChange} />
              <div className="button-group">
                <button className="save-button" onClick={handleSaveCreditCard}>Save</button>
                <button className="cancel-button" onClick={handleCancelCreditCard}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
