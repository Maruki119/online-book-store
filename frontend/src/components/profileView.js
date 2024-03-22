import React, { useState } from 'react';
import './profileView.css';

const UserProfileView = () => {
  const [isUsageOpen, setIsUsageOpen] = useState(false);

  const toggleUsage = () => {
    setIsUsageOpen(!isUsageOpen);
  };

  return (
    <div className="frame">
      <div className="container">
        <div className="header">
          <img
            className="avatar"
            src="https://bootdey.com/img/Content/avatar/avatar6.png"
            alt="Avatar"
          />
          <p className="userName">John Doe</p>
        </div>

        <div className="items">
          <div className="item">
            <p><span role="img" aria-label="coin">💰</span> ยอดเงินคงเหลือ</p>
          </div>
          <div className="item" onClick={toggleUsage}>
            <p>การใช้งาน</p>
            {isUsageOpen && (
              <ul className="submenu">
                <li>ชั้นหนังสือ</li>
                <li>ประวัติการซื้อ</li>
              </ul>
            )}
          </div>
          <div className="item">
            <p>ตั้งค่าบัญชี</p>
          </div>
          <div className="item logout">
            <p>ออกจากระบบ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
