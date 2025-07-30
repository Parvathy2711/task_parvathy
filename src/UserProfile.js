import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UserProfile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const initialData = {
    fullName: 'John Doe',
    mobile: '+1 234 567 8900',
    email: 'john.doe@example.com',
    gender: 'Male',
    emergencyContact: '+1 987 654 3210',
    avatar: '',
  };

  const [formData, setFormData] = useState(initialData);
  const [originalData, setOriginalData] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Unsaved changes will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Discard Changes',
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(originalData);
        setIsEditing(false);
        setFormErrors({});
        Swal.fire('Reverted', 'Changes have been discarded.', 'info');
      }
    });
  };
  const handleSave = () => {
    const errors = {};

    if (!formData.fullName || formData.fullName.length < 3) {
      errors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!formData.gender) {
      errors.gender = 'Please select a gender';
    }

    if (
      !formData.emergencyContact ||
      !/^\+?[0-9\s\-()]{7,20}$/.test(formData.emergencyContact)
    ) {
      errors.emergencyContact = 'Enter a valid emergency contact number';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your rider profile has been successfully saved.',
        confirmButtonColor: '#3085d6',
      });
      setOriginalData(formData);
      setIsEditing(false);
    }, 1000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ maxWidth: 950, mx: 'auto', mt: 6, px: 2 }}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mb={2}
      >
        <Typography variant='h4' fontWeight={600}>
          Rider Profile
        </Typography>
        <div>
          <Button
            variant='outlined'
            sx={{ mt: 2 }}
            onClick={() => navigate('/receipt')}
          >
            View Trip Receipt
          </Button>
          <IconButton
            onClick={() => navigate('/settings')}
            style={{ marginTop: '12px' }}
          >
            ⚙️
          </IconButton>
        </div>
      </Box>

      <Paper elevation={3} sx={{ p: 0, overflow: 'hidden', borderRadius: 2 }}>
        <Grid container>
          {/* LEFT SECTION - AVATAR */}
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              backgroundColor: '#f9fafb',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              borderRight: { sm: '1px solid #e0e0e0' },
              minHeight: 350,
            }}
          >
            <Avatar
              src={formData.avatar}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            {isEditing && (
              <Button component='label' variant='outlined' size='small'>
                Upload
                <input
                  type='file'
                  hidden
                  accept='image/*'
                  onChange={handleImageUpload}
                />
              </Button>
            )}
            <Typography variant='h6' mt={2}>
              {formData.fullName}
            </Typography>
          </Grid>

          {/* RIGHT SECTION - DETAILS */}
          <Grid item xs={12} sm={7} sx={{ p: 4 }}>
            {[
              { label: 'Full Name', key: 'fullName' },
              { label: 'Mobile Number', key: 'mobile', disabled: true },
              { label: 'Email', key: 'email' },
              { label: 'Gender', key: 'gender', type: 'select' },
              { label: 'Emergency Contact', key: 'emergencyContact' },
            ].map(({ label, key, type, disabled }) => (
              <Box key={key} sx={{ mb: 2 }}>
                <Typography
                  variant='subtitle2'
                  color='text.secondary'
                  sx={{ mb: 0.5 }}
                >
                  {label}
                </Typography>
                {isEditing && !disabled ? (
                  type === 'select' ? (
                    <TextField
                      name={key}
                      select
                      value={formData[key]}
                      onChange={handleChange}
                      fullWidth
                      size='small'
                      error={Boolean(formErrors[key])}
                      helperText={formErrors[key]}
                    >
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                      <MenuItem value='Other'>Other</MenuItem>
                    </TextField>
                  ) : (
                    <TextField
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      fullWidth
                      size='small'
                      error={Boolean(formErrors[key])}
                      helperText={formErrors[key]}
                    />
                  )
                ) : (
                  <Typography>{formData[key]}</Typography>
                )}
              </Box>
            ))}

            <Box mt={4}>
              {isEditing ? (
                <>
                  <Button
                    variant='contained'
                    onClick={handleSave}
                    sx={{ mr: 2 }}
                  >
                    Save
                  </Button>
                  <Button variant='outlined' onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant='contained' onClick={handleEdit}>
                  Edit
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
