import {
  Button, Container, Typography,
  RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
// components
import Logo from '../components/logo';
// hooks
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: '10px',
  width: '150px',
  height: '40px',
  padding: 0,
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const { isLogin, userInfo } = useSelector((state) => state);
  const isLoginDispatch = useDispatch();
  const [selMemberType, setSelMemberType] = useState("ACTOR");

  useEffect(() => {
    if (isLogin) {
      window.location.href = '/';
    }
  }, [isLogin, userInfo]);

  const successLogin = (data) => {
    isLoginDispatch({ type: 'isLogin', data: data.user_info, token: data.token });
  }

  const failLogin = () => {
    isLoginDispatch({ type: 'isNonLogin' });
  }

  const GOOGLE = 'GOOGLE'
  const KAKAO = 'KAKAO'
  const NAVER = 'NAVER'
  const REDIRECT_URI = process.env.REACT_APP_OAUTH_REDIRECT_URI
  const REDIRECT_URI_GOOGLE = REDIRECT_URI + process.env.REACT_APP_OAUTH_REDIRECT_URI_GOOGLE
  const REDIRECT_URI_KAKAO = REDIRECT_URI + process.env.REACT_APP_OAUTH_REDIRECT_URI_KAKAO
  const REDIRECT_URI_NAVER = REDIRECT_URI + process.env.REACT_APP_OAUTH_REDIRECT_URI_NAVER
  const GOOGLE_ID = process.env.REACT_APP_OAUTH_CLIENT_ID_GOOGLE
  const KAKAO_ID = process.env.REACT_APP_OAUTH_CLIENT_ID_KAKAO
  const NAVER_ID = process.env.REACT_APP_OAUTH_CLIENT_ID_NAVER
  const NAVER_SECRET = process.env.REACT_APP_OAUTH_SECRET_NAVER
  const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL

  const getApiUrl = (request) => {
    return AUTH_API_URL + request
  }

  const handleMemberTypeChange = prop => {
    console.log(prop.target.value)
    if (typeof prop === 'string') {
      setSelMemberType(prop)
    } else {
      setSelMemberType(prop.target.value)
    }
  }

  useEffect(() => {
    // URL에서 인증 코드 추출
    const hashParams = new URLSearchParams(window.location.hash.substr(1));
    const urlParams = new URLSearchParams(window.location.search);

    console.log(useEffect)
    // 각 소셜 로그인의 API에 따라 다른 처리를 수행
    if (window.location.href.includes('google')) {
      handleGoogleLoginComplete(hashParams.get('access_token'));
    } else if (window.location.href.includes('kakao')) {
      handleKakaoLoginComplete(urlParams.get('code'));
    } else if (window.location.href.includes('naver')) {
      handleNaverLoginComplete(urlParams.get('code'));
    }
  }, []);

  const handleGoogleLogin = () => {
    console.log('REDIRECT_URI_GOOGLE', REDIRECT_URI_GOOGLE)
    const GOOGLE_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&response_type=token&redirect_uri=${REDIRECT_URI_GOOGLE}&scope=https://www.googleapis.com/auth/userinfo.email`;

    window.location.assign(GOOGLE_URI);
  };

  const handleGoogleLoginComplete = (accessToken) => {
    console.log(accessToken)
    if (accessToken) {
      fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then(response => response.json())
        .then(userData => {
          login(userData.email, GOOGLE)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleKakaoLogin = () => {
    const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&response_type=code&redirect_uri=${REDIRECT_URI_KAKAO}`

    window.location.assign(KAKAO_URI);
  };


  const handleKakaoLoginComplete = (code) => {
    if (code) {
      console.log(code)
      const requestBody = new URLSearchParams();
      requestBody.append('grant_type', 'authorization_code');
      requestBody.append('client_id', KAKAO_ID);
      requestBody.append('redirect_uri', REDIRECT_URI_KAKAO);
      requestBody.append('code', code);

      fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: requestBody.toString(),
      })
        .then(response => response.json())
        .then(data => {
          const accessToken = data.access_token;
          // Kakao 액세스 토큰으로 사용자 정보 요청
          fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          })
            .then(response => response.json())
            .then(userData => {
              login(userData.kakao_account.email, KAKAO)
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };


  const handleNaverLogin = () => {
    const NAVER_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_ID}&response_type=code&redirect_uri=${REDIRECT_URI_NAVER}`

    window.location.assign(NAVER_URI);
  };


  const handleNaverLoginComplete = (code) => {
    if (code) {
      console.log(code)
      const requestBody = new URLSearchParams();
      requestBody.append('grant_type', 'authorization_code');
      requestBody.append('client_id', NAVER_ID);
      requestBody.append('client_secret', NAVER_SECRET);
      requestBody.append('redirect_uri', REDIRECT_URI_NAVER);
      requestBody.append('code', code);

      fetch('https://nid.naver.com/oauth2.0/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: requestBody.toString(),
      })
        .then(response => response.json())
        .then(data => {
          const accessToken = data.access_token;
          // Naver 액세스 토큰으로 사용자 정보 요청
          fetch('https://openapi.naver.com/v1/nid/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          })
            .then(response => response.json())
            .then(userData => {
              login(userData.response.email, NAVER)
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const login = (email, provider) => {

    const requestBody = new URLSearchParams();
    requestBody.append('providerType', provider);
    requestBody.append('memberType', selMemberType);
    requestBody.append('memberEmail', email);

    fetch(getApiUrl('/v1/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: requestBody.toString(),
    })
      .then(response => response.json())
      .then(userData => {
        const data = {
          token : userData.data.jwtToken,
          user_info : userData.data.memberInfo
        }
        successLogin(data);
        console.log(data.token);
        console.log(data.user_info);
      })
      .catch(error => {
        failLogin()
        console.error('Error:', error);
      });
  };


  const imgStyle = {
    height: '40px',
  };

  return (

    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">

          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>

            {/* <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography> */}

            <p>소셜 계정과 연동할 계정 유형을 선택하세요:)</p>
            <p>소셜 계정과 연동된 계정이 이미 있는 경우 기존 계정 유형으로 로그인 됩니다.</p>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="ACTOR"
              onChange={handleMemberTypeChange}
            >
              <FormControlLabel value="ACTOR" control={<Radio />} label="배우" />
              <FormControlLabel value="PRODUCER" control={<Radio />} label="제작자" />
            </RadioGroup>


            {/* <Stack spacing={1}> */}
            <StyledButton fullWidth size="large" color="inherit" onClick={handleGoogleLogin}>
              <img style={imgStyle} src={"/assets/images/auth/google_login_large_wide.png"} alt="googlelogin" />
            </StyledButton>
            <StyledButton fullWidth size="large" color="inherit" onClick={handleKakaoLogin}>
              <img style={imgStyle} src={"/assets/images/auth/kakao_login_medium_narrow.png"} alt="kakaologin" />
            </StyledButton>
            <StyledButton fullWidth size="large" color="inherit" onClick={handleNaverLogin}>
              <img style={imgStyle} src={"/assets/images/auth/naver_login_large_wide.png"} alt="naverlogin" />
            </StyledButton>
            {/* </Stack> */}

            {/* <Stack direction="row" spacing={2}>
           
            <StyledButton fullWidth size="large" color="inherit" variant="outlined" onClickFilter={handleGoogleLogin}>
              <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              <img src="/assets/images/auth/google_login_large_wide.png" alt="login" />
            </StyledButton>
            </Stack> */}

            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}

            {/* <LoginForm /> */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
