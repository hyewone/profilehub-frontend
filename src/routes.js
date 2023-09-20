import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import HomePage from './pages/HomePage';

import ProfilePage from './pages/ProfilePage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import ProfileInsertPage from './pages/ProfileInsertPage';

import FilmoPage from './pages/FilmoPage';
import FilmoDetailPage from './pages/FilmoDetailPage';
import FilmoInsertPage from './pages/FilmoInsertPage';

import MyPage from './pages/MyPage';

// ----------------------------------------------------------------------

export default function Router({ openChatRoom, setIsChatRoomOpen, openChat, setIsChatOpen, chatRoomInfo, setChatRoomInfo}) {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: 'home', element: <HomePage /> },

        { path: 'profile', element: <ProfilePage /> },
        { path: 'profileDetail', element: <ProfileDetailPage openChatRoom={openChatRoom} setIsChatRoomOpen={setIsChatRoomOpen} openChat={openChat} setIsChatOpen={setIsChatOpen}  chatRoomInfo={chatRoomInfo} setChatRoomInfo={setChatRoomInfo}/> },
        { path: 'profileInsert', element: <ProfileInsertPage /> },

        { path: 'filmo', element: <FilmoPage /> },
        { path: 'filmoDetail', element: <FilmoDetailPage openChatRoom={openChatRoom} setIsChatRoomOpen={setIsChatRoomOpen} openChat={openChat} setIsChatOpen={setIsChatOpen}  chatRoomInfo={chatRoomInfo} setChatRoomInfo={setChatRoomInfo}/> },
        { path: 'filmoInsert', element: <FilmoInsertPage /> },

        { path: 'myPage', element: <MyPage /> },
        
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
      children: [
        { element: <Navigate to="/login/google" />, index: true },
        { path: 'google', element: <LoginPage /> },
        { path: 'kakao', element: <LoginPage /> },
        { path: 'naver', element: <LoginPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
