import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, IconButton } from '@mui/material';

// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';


import SvgColor from '../../../components/svg-color';
import { StyledNavItemIcon } from '../../../components/nav-section/styles';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledNav = styled('nav')(({ theme }) => ({
  position: 'fixed',
}));

// const StyledAccount = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2, 2.5),
//   borderRadius: Number(theme.shape.borderRadius) * 1.5,
//   backgroundColor: alpha(theme.palette.grey[500], 0.12),
// }));

const StyledBox = styled(Box)(({ theme }) => ({
  paddingLeft: 0,
  height: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    height: HEADER_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  onOpenNav: PropTypes.func,
  isDesktop: PropTypes.bool,
};

export default function Nav({ openNav, onCloseNav, onOpenNav, isDesktop }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!openNav) {
      onCloseNav();
    }
  }, [pathname, openNav]);

  const handleNavButtonClick = () => {
    if (openNav) {
      onCloseNav();
    } else {
      onOpenNav();
    }
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      {/* <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box> */}


      {/* 로그인된 사용자 정보 */}
      {/* <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box> */}
      <StyledBox>
        <IconButton
            onClick={handleNavButtonClick}
            sx={{
              mr: 1,
              color: 'text.primary',
              height: HEADER_MOBILE,
              // display: { lg: 'none' },
              padding: 0,
            }}
          >
            <StyledNavItemIcon>
              <SvgColor src={`/assets/icons/navbar/ic_hamburger.svg`} sx={{ width: 1, height: 1 }} />
            </StyledNavItemIcon>
          </IconButton>
          <Logo />
      </StyledBox>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">
            Upgrade to Pro
          </Button>
        </Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <StyledNav
      component="nav"
      // sx={{
      //   flexShrink: { lg: 0 },
      //   width: { lg: NAV_WIDTH },
      //   // position: 'fixed',
      //   // top: `${HEADER_MOBILE}px`,
      //   // [theme.breakpoints.up('lg')]: {
      //   //   top: `${HEADER_DESKTOP}px`,
      //   // },
      // }}
    >
      {isDesktop && (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          variant="permanent"
          PaperProps={{
            sx: {
              width: openNav ? NAV_WIDTH : 0,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </StyledNav>
  );
}
