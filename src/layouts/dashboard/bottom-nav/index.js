import {
  Favorite as FavoriteIcon, Home as HomeIcon
} from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SvgColor from '../../../components/svg-color';

export default function BottomNavigationBar() {

  const getMenuFromPath = (pathname) => {
    if (pathname === '/dashboard/home') return 'home';
    if (pathname === '/dashboard/profile') return 'profile';
    if (pathname === '/dashboard/filmo') return 'filmo';
    if (pathname === '/dashboard/myPage') return 'myPage';
    return 'home'; 
  };

  const location = useLocation();
  const [value, setValue] = useState(getMenuFromPath(location.pathname)); // 현재 선택된 메뉴 값
  const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

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
        label="프로필"
        value="profile"
        icon={icon('ic_profile')}
        component={Link}
        to="/dashboard/profile"
      />
      <BottomNavigationAction
        label="작품 공고"
        value="filmo"
        icon={icon('ic_filmo')}
        component={Link}
        to="/dashboard/filmo"
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
