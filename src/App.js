import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { getTokenToSessionStorage, getUserInfoToSessionStorage } from './reducer/loginComm';
// routes
import Router from './routes';
import { ProductCartWidget } from './sections/@dashboard/products';
// theme
import ThemeProvider from './theme';






// ----------------------------------------------------------------------

export default function App() {
  const isLoginDispatch = useDispatch();

  useEffect(() => {
    const token = getTokenToSessionStorage();
    if (token) {
      const userInfo = getUserInfoToSessionStorage();
      isLoginDispatch({type: 'isLogin', token, data: userInfo});
    }else{
      isLoginDispatch({type: 'isNonLogin'});
    }
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          
          <ProductCartWidget />
          <ScrollToTop />
          <StyledChart />
          <Router />

        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
