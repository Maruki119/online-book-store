import React, { useState, useEffect } from 'react';
import './Setting.css';
import useToken from './useToken';
import axios from "axios";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('UserInformation');
  const { token, removeToken, setToken} = useToken();
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get("http://127.0.0.1:5000/profile", {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then((response) => {
      const res = response.data;
      res.access_token && setToken(res.access_token);
      setProfile({
        _id: res._id,
        user: res.user,
        email: res.email,
        fullname: res.fullname,
        password: res.password,
        card_id: res.card_id,
        balance: res.balance,
        book_access: res.book_access,
        cart: res.cart,
        wishlist: res.wishlist,
        passwordCheck1: "",
        passwordCheck2: ""
      });
    })
    .catch((error) => {
      console.error('Error fetching profile data:', error);
    });
  }
  
  const [editMode, setEditMode] = useState(false);
  const [newProfile, setNewProfile] = useState({});
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [newCreditCardNumber, setNewCreditCardNumber] = useState('');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setNewProfile(profile ? { ...profile } : {}); // Set the new profile to current profile
  };

  const handleSaveClick = () => {
    setProfile(newProfile); // Update profile with new profile information
    axios.put(`http://127.0.0.1:5000/users/${profile._id}`, {
      user: newProfile.user,
      fullname: newProfile.fullname
    },{
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching profile data:', error);
    });
    
    setEditMode(false);
    setNewProfile({}); // Reset new profile
    window.location.reload();
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
    const credit_card = newProfile.card_id;

    if (!/^\d{12,}$/.test(newProfile.card_id)) { //เช็คว่าเป็นตัวเลขมั้ย
        alert("กรุณากรอกเฉพาะตัวเลขเท่านั้น (12 ตัว)");
        return; 
    }
    
    axios.put(`http://127.0.0.1:5000/users/${profile._id}`, {
      card_id: credit_card
    },{
        headers: {
          Authorization: 'Bearer ' + token
        }
    })
    .then((response) => {
      setProfile(response.data.credit_card);
      console.log(response.message);
      alert("Enter Credit-Card Successfully!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error", error);
    });

    setCreditCardNumber(newCreditCardNumber); 
    setEditMode(false);
    setNewCreditCardNumber(''); 
  };

  const handleCancelCreditCard = () => {
    setEditMode(false);
    setNewCreditCardNumber(''); 
  };

  const handlePasswordSave = () => {
    const passwordChange = newProfile.passwordCheck1;

    if (newProfile.password === "" || newProfile.passwordCheck1 === "" || newProfile.passwordCheck2 === "") {
      alert("Please, Fill in the required information!");
      return;
    }

    if (newProfile.password !== profile.password){
      alert("Old Password does not match!");
      return;
    }

    if (newProfile.passwordCheck1 !== newProfile.passwordCheck2) {
      alert("New Password does not match!");
      return;
    }

    axios
      .put(`http://127.0.0.1:5000/users/${profile._id}`, {
        password: passwordChange
      },{
          headers: {
            Authorization: 'Bearer ' + token
          }
      })
      .then((response) => {
        setProfile(response.data.password);
        console.log(response.message);
        alert("Password Change Successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error", error);
      });
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
          {profile && !editMode ? (
            <div className="profile-info">
              <p>Username: {profile.user}</p>
              <p>Fullname: {profile.fullname}</p>
              <button className="edit-button" onClick={handleEditClick}>Edit</button>
            </div>
          ) : profile && editMode ? (
            <div className="edit-mode">
              <input type="text" name="user" value={newProfile.user || ''} placeholder="Username" onChange={handleProfileChange} />
              <input type="text" name="fullname" value={newProfile.fullname || ''} placeholder="Fullname" onChange={handleProfileChange} />
              <div className="button-group">
                <button className="save-button" onClick={handleSaveClick}>Save</button>
                <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        
        <div id="Password" className={activeTab === 'Password' ? 'tab active' : 'tab'}>
            <h2>Password</h2>
            <div className="password-change-form">
                <input type="password" name="password" value={newProfile.password} placeholder="Old Password" onChange={handleProfileChange}/>
                <input type="password" name="passwordCheck1" value={newProfile.passwordCheck1} placeholder="New Password" onChange={handleProfileChange}/>
                <input type="password" name="passwordCheck2" value={newProfile.passwordCheck2} placeholder="Confirm New Password" onChange={handleProfileChange}/>
                <div className="button-group">
                    <button className="save-button" onClick={handlePasswordSave}>Save</button>
                </div>
            </div>
        </div>
        
        <div id="Credit-card" className={activeTab === 'Credit-card' ? 'tab active' : 'tab'}>
          <h2>เพิ่มบัตร</h2>
          {profile && !editMode ? (
            <div className="credit-card-info">
              {profile.card_id ? (
                <p>Credit Card Number: {profile.card_id}</p>
              ) : (
                <p>No credit card added</p>
              )}
              <button className="edit-button" onClick={handleEditCreditCard}>Edit</button>
            </div>
          ) : profile && editMode ? (
            <div className="edit-mode">
              <input type="text" name="card_id" value={newProfile.card_id || ''} placeholder="Enter Credit Card Number" onChange={handleProfileChange} />
              <div className="button-group">
                <button className="save-button" onClick={handleSaveCreditCard}>Save</button>
                <button className="cancel-button" onClick={handleCancelCreditCard}>Cancel</button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;