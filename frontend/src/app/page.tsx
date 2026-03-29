"use client";
import React, { useState } from 'react';
import UserTable from '@/components/UserTable';
import AddUserForm from '@/components/AddUserForm';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  // This function tells the table to reload when a user is added
  const handleUserAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main style={{ padding: '40px', backgroundColor: '#121212', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', marginBottom: '20px' }}>User Management Assessment</h1>
      <AddUserForm onUserAdded={handleUserAdded} />
      <UserTable key={refreshKey} />
    </main>
  );
}