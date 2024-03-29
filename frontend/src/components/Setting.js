import React, { useState, useEffect } from 'react';
import './Setting.css';
import BookDetail from './BookDetail';
import axios from "axios"; 

function Setting(){

    const [settingChange,setsettingChange] = useState(null);

    const handleSettingChange = (method) => {
        setsettingChange(method);
      };

    return (
        <div className="setting-container">
            <div className='setting-account'>
                <h1>ตั้งค่าบัญชี</h1>       
                <div className="choose-setting">
                    <label> 
                    <span>ข้อมูลผู้ใช้</span> 
                    <input
                        type="radio"
                        name="setting"
                        value="User-information"
                        checked={settingChange === 'User-information'}
                        onChange={() => handleSettingChange('User-information')}
                    /> 
                    </label>
                    {settingChange === 'User-information' && (
                    <div className="input-box">
                        
                        
                    </div>
                    )}
                    <label>
                    <span>รหัสผ่าน</span>                    
                    <input
                        type="radio"
                        name="setting"
                        value="Password"
                        checked={settingChange === 'Password'}
                        onChange={() => handleSettingChange('Password')}
                    />
                    </label>
                    {settingChange === 'Password' && (
                    <div className="input-box">
                        
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Setting;