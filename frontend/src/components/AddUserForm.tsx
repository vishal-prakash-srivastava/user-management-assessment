"use client";
import React, { useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import axios from 'axios';

export default function AddUserForm({ onUserAdded }: { onUserAdded: () => void }) {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/users', formData);
      setFormData({ first_name: '', last_name: '', email: '' }); // Clear form
      onUserAdded(); // Refresh the table
    } catch (err) {
      console.error("Failed to add user", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 2, bgcolor: 'white', borderRadius: 1 }}>
      <Stack direction="row" spacing={2}>
        <TextField 
          label="First Name" 
          size="small"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          required 
        />
        <TextField 
          label="Last Name" 
          size="small"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          required 
        />
        <TextField 
          label="Email" 
          type="email" 
          size="small"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required 
        />
        <Button variant="contained" type="submit">Add User</Button>
      </Stack>
    </Box>
  );
}