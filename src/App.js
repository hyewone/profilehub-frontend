import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { getTokenToSessionStorage, getUserInfoToSessionStorage } from './reducer/loginComm';
// routes
import Router from './routes';
// import { ProductCartWidget } from './sections/@dashboard/products';
// theme
import ThemeProvider from './theme';

import { ProductCartWidget } from './sections/@dashboard/products'

// ----------------------------------------------------------------------

export default function App() {

  const { isLogin, userInfo } = useSelector((state) => state);
  const isLoginDispatch = useDispatch();
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRoomInfo, setChatRoomInfo] = useState({});

  useEffect(() => {
    const token = getTokenToSessionStorage();
    if (token) {
      const userInfo = getUserInfoToSessionStorage();
      isLoginDispatch({ type: 'isLogin', token, data: userInfo });
    } else {
      isLoginDispatch({ type: 'isNonLogin' });
    }

    // if (!isLogin) {
    //   switch (window.location.pathname) {
    //     case '/dashboard/profile':
    //     case '/dashboard/profileDetail':
    //     case '/dashboard/profileInsert':
    //     case '/dashboard/filmo':
    //     case '/dashboard/filmoDetail':
    //     case '/dashboard/filmoInsert':
    //     case '/dashboard/myPage':
    //       window.location.href = 'http://localhost:3000/dashboard/home';

    //       // history.push('/dashboard/home'); 
    //       // navigate('/dashboard/home');
    //       break;
    //     default:
    //   }
    // }
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>

          <ScrollToTop />
          <StyledChart />
          <Router openChatRoom={isChatRoomOpen} setIsChatRoomOpen={setIsChatRoomOpen} openChat={isChatOpen} setIsChatOpen={setIsChatOpen} chatRoomInfo={chatRoomInfo} setChatRoomInfo={setChatRoomInfo} />
          {isLogin &&
            <ProductCartWidget openChatRoom={isChatRoomOpen} setIsChatRoomOpen={setIsChatRoomOpen} openChat={isChatOpen} setIsChatOpen={setIsChatOpen} chatRoomInfo={chatRoomInfo} setChatRoomInfo={setChatRoomInfo} />
          }
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
