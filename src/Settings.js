import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  Button,
  Link,
  Paper,
  Divider,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const [voiceBooking, setVoiceBooking] = useState(true);
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logged out successfully');
  };

  const handlePrivacyPolicy = () => {
    window.open('/privacy-policy', '_blank');
  };

  return (
    <Box maxWidth={500} mx='auto' mt={6} px={2}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mb={2}
      >
        <Typography variant='h4' fontWeight={600}>
          Settings
        </Typography>
        <IconButton onClick={() => navigate('/')}>❌</IconButton>
      </Box>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={voiceBooking}
              onChange={() => setVoiceBooking(!voiceBooking)}
              color='primary'
            />
          }
          label='Enable Voice Booking'
        />

        <Box mt={3}>
          <Typography variant='subtitle1' gutterBottom>
            Preferred Language
          </Typography>
          <Select
            fullWidth
            size='small'
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value='English'>English</MenuItem>
            <MenuItem value='Tamil'>Tamil</MenuItem>
            <MenuItem value='Hindi'>Hindi</MenuItem>
          </Select>
        </Box>

        <Box mt={3}>
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                color='primary'
              />
            }
            label='Enable Notifications'
          />
        </Box>

        <Box mt={2}>
          <FormControlLabel
            control={
              <Switch
                checked={locationSharing}
                onChange={() => setLocationSharing(!locationSharing)}
                color='primary'
              />
            }
            label='Share Location Always'
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box mb={2}>
          <Link href='#' onClick={handlePrivacyPolicy}>
            Privacy Policy
          </Link>
        </Box>

        <Button
          variant='contained'
          color='error'
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
}
