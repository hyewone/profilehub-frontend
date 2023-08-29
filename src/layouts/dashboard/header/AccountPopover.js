import { Box, Divider, IconButton, Link, MenuItem, Popover, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  // backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

const nonAccount = {
  displayName: 'Sign In',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

// ----------------------------------------------------------------------

AccountPopover.propTypes = {
  isLogin: PropTypes.bool,
  userInfo: PropTypes.shape({
    ID: PropTypes.number,
    Email: PropTypes.string,
    Provider: PropTypes.string,
    UserType: PropTypes.string,
  }),
};

export default function AccountPopover({ isLogin, userInfo }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    handleClose()

  };

  return (
    <>

      <IconButton
        onClick={isLogin && handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '10%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}>
        {isLogin ? (
          <Box sx={{ width: '100%', height: '100%' }}>
            <Link underline="none">
                      
              <StyledAccount>
                {/* <Avatar src={account.photoURL} alt="photoURL" /> */}

                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    {userInfo.Email}
                  </Typography>

                  {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {userInfo.UserType}
                      </Typography> */}
                </Box>
              </StyledAccount>
            </Link>
          </Box>
        ) :
          (
            <Box sx={{ width: '100%', height: '100%' }}>
              <Link to="/login" component={RouterLink} underline="none">
                <StyledAccount>
                  {/* <Avatar src={nonAccount.photoURL} alt="photoURL" /> */}
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    {nonAccount.displayName}
                  </Typography>

                  {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {nonAccount.role}
                      </Typography> */}
                </StyledAccount>
              </Link>
            </Box>
          )}

      </IconButton>
      {/* <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton> */}

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
