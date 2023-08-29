import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Drawer } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import Logo from '../../../components/logo';

// component
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';
import { StyledNavItemIcon } from '../../../components/nav-section/styles';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  paddingLeft: 0,
  boxShadow: 'none',
  width: "100%",
  // [theme.breakpoints.up('lg')]: {
  //   width: "100%",
  // },
  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  // },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 0,
  },
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  openNav: PropTypes.bool,
  onOpenNav: PropTypes.func,
  onCloseNav: PropTypes.func,
  isDesktop: PropTypes.bool,
  isLogin: PropTypes.bool,
  userInfo: PropTypes.shape({
    ID: PropTypes.number,
    Email: PropTypes.string,
    Provider: PropTypes.string,
    UserType: PropTypes.string,
  }),
};

export default function Header({ openNav, onOpenNav, onCloseNav, isDesktop, isLogin, userInfo }) {
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


  return (
    <StyledRoot>
      <StyledToolbar>
        
        { isDesktop && 
          <IconButton
          onClick={handleNavButtonClick}
          sx={{
            mr: 1,
            color: 'text.primary',
            // display: { lg: 'none' },
            padding: 0,
          }}
        >
          <StyledNavItemIcon>
            <SvgColor src={`/assets/icons/navbar/ic_hamburger.svg`} sx={{ width: 1, height: 1 }} />
          </StyledNavItemIcon>
          {/* <Iconify icon="eva:menu-2-fill" /> */}
        </IconButton>
        }
        
        <Logo />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover /> */}
          {/* <Logo /> */}
          
          <Searchbar />
            {isLogin ? (
              <NotificationsPopover />
            ) : (
              <Drawer />
            )}
          <AccountPopover isLogin={isLogin} userInfo={userInfo}/>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
