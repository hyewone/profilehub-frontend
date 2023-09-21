// @mui
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
// hooks
import useResponsive from '../../hooks/useResponsive';
import BottomNavbar from './bottom-nav';
//
import Header from './header';
import Nav from './nav';


// ----------------------------------------------------------------------


const NAV_WIDTH = 280;
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme, open }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: open ? NAV_WIDTH + 16 : theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));


// ----------------------------------------------------------------------

export default function DashboardLayout() {
  // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(isDesktop);
  const [openBottomNav, setBottomNavOpen] = useState(!isDesktop);

  const {isLogin, userInfo} = useSelector((state) => state);

  const location = useLocation();
  
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // useEffect(() => {
  //   console.log(isLogin);
  //   console.log(userInfo);
  // }, [isLogin, userInfo]);

  return (
    <StyledRoot>
      <Header isLogin={isLogin} userInfo={userInfo} isDesktop={isDesktop} openNav={open} onOpenNav={() => setOpen(true)} onCloseNav={() => setOpen(false)} />
      
      <Nav isLogin={isLogin} userInfo={userInfo} isDesktop={isDesktop} openNav={open} onCloseNav={() => setOpen(false)} onOpenNav={() => setOpen(true)}/>
      
      <Main open={open}>
        <Outlet/>
      </Main>

      { !isDesktop && 
      <BottomNavbar openBottomNav={openBottomNav} onCloseBottomNav={() => setBottomNavOpen(false)} onOpenBottomNav={() => setBottomNavOpen(true)}/> 
      }
    </StyledRoot>
  );
}
