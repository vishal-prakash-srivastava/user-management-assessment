"use client";
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, Box } from '@mui/material';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // 1. Add mounted state

  useEffect(() => {
    setIsMounted(true); // 2. Set to true once the browser is ready
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchUsers(); 
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="error" onClick={() => handleDelete(params.row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  // 3. Prevent the server from rendering the DataGrid prematurely
  if (!isMounted) return null;

  return (
    <Box sx={{ height: 400, width: '100%', mt: 4 }} suppressHydrationWarning>
      <DataGrid 
        rows={users} 
        columns={columns} 
        getRowId={(row) => row.id} // Important for DataGrid!
      />
    </Box>
  );
}