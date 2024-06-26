import React from 'react';
import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';

function ProfilePage() {
  return (
    <div className="bg-transparent">
      <Navbar/>
      <UserProfile/>
    </div>
  );
}

export default ProfilePage;
