import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import {
  Home as HomeIcon,
  Map as MapIcon,
  Event as EventIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

export default function BottomNavigationBar() {

  const getMenuFromPath = (pathname) => {
    if (pathname === '/dashboard/home') return 'home';
    if (pathname === '/dashboard/map') return 'map';
    if (pathname === '/dashboard/calendar') return 'calendar';
    if (pathname === '/dashboard/myPage') return 'myPage';
    return 'home'; 
  };

  const location = useLocation();
  const [value, setValue] = useState(getMenuFromPath(location.pathname)); // 현재 선택된 메뉴 값

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '0.7px solid rgba(0, 0, 0, 0.2)'}}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Map"
        value="map"
        icon={<MapIcon />}
        component={Link}
        to="/dashboard/map"
      />
      <BottomNavigationAction
        label="Calendar"
        value="calendar"
        icon={<EventIcon />}
        component={Link}
        to="/dashboard/calendar"
      />
      <BottomNavigationAction
        label="MyPage"
        value="myPage"
        icon={<FavoriteIcon />}
        component={Link}
        to="/dashboard/myPage"
      />
    </BottomNavigation>
  );
}
