import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const UserProfile = () => {
  const [profile, setProfile] = useState({ username: '', emails: '' }); // emails as string
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('taskflowToken');
      const res = await fetch('http://localhost:5000/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setProfile({
          username: data.username || '',
          emails: Array.isArray(data.emails) ? data.emails.join(', ') : (data.emails || ''),
        });
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('taskflowToken');
    const payload = {
      username: profile.username,
      emails: profile.emails
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
    };
    const res = await fetch('http://localhost:5000/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setEdit(false);
      const data = await res.json();
      setProfile({
        username: data.username || '',
        emails: Array.isArray(data.emails) ? data.emails.join(', ') : (data.emails || ''),
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} align="center" mb={3}>
          User Profile
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            disabled={!edit}
            fullWidth
          />
          <TextField
            label="Emails (comma separated)"
            name="emails"
            value={profile.emails}
            onChange={handleChange}
            disabled={!edit}
            fullWidth
          />
          {edit ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => setEdit(true)}>
              Edit Profile
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;