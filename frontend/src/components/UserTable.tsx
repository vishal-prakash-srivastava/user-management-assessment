"use client";
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import api from '@/utils/api';
import { Button, Box, Stack } from '@mui/material';
import UserModal from './UserModal';
import { User } from '@/interface/User';

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    let isIgnore = false;

    const init = async () => {
      if (!isIgnore) {
        setIsMounted(true);
        await fetchUsers();
      }
    };

    void init();

    return () => {
      isIgnore = true;
    };
  }, []);

  const handleDelete = async (id: number, type: 'soft' | 'hard') => {
    if (!confirm(`Are you sure you want to perform a ${type} delete?`)) return;
    try {
      await api.delete(`/users/${id}/${type}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First Name', flex: 1, minWidth: 150 },
    { field: 'last_name', headerName: 'Last Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 250 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 280,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%'
          }}
        >
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleEdit(params.row as User)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={() => handleDelete(params.row.id, 'soft')}
            >
              Soft
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(params.row.id, 'hard')}
            >
              Hard
            </Button>
          </Stack>
        </Box>
      ),
    },
  ];

  if (!isMounted) return null;

  return (
    <Box sx={{ p: 4 }}>
      <Button
        variant="contained"
        onClick={() => { setSelectedUser(null); setOpen(true); }}
        sx={{ mb: 2 }}
      >
        + Add New User
      </Button>

      <Box sx={{ height: 500, width: '100%', bgcolor: 'white', boxShadow: 2, borderRadius: 2 }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
        />
      </Box>

      <UserModal
        key={selectedUser?.id || 'new'}
        open={open}
        onClose={() => setOpen(false)}
        onUserAdded={fetchUsers}
        initialData={selectedUser}
      />
    </Box>
  );
}