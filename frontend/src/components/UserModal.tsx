"use client";
import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import api from '@/utils/api';
import { UserFormData, UserModalProps } from '@/interface/User';

export default function UserModal({ open, onClose, onUserAdded, initialData }: UserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    email: initialData?.email || '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        await api.patch(`/users/${initialData.id}`, formData);
      } else {
        await api.post('/users', formData);
      }
      onUserAdded();
      onClose();
    } catch (err) {
      console.error("Operation failed", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{initialData ? "Edit User" : "Add New User"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="First Name" fullWidth value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} required />
            <TextField label="Last Name" fullWidth value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} required />
            <TextField label="Email" type="email" fullWidth value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <TextField label="Password" type="password" fullWidth value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required={!initialData} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}