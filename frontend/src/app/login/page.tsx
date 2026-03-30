"use client";
import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, Alert } from '@mui/material';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('access_token', res.data.access_token);
      router.push('/users');
    } catch {
      setError('Invalid credentials');
      console.error("Login failed")
    }
  };

  return (
    <Box 
    suppressHydrationWarning={true}
    sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <TextField fullWidth label="Email" margin="normal" onChange={e => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Sign In</Button>
        </form>
      </Paper>
    </Box>
  );
}