import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { RadioGroup, FormControlLabel, Radio, Container, Stack, Typography, Button, Link, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem, InputBase, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// components
import Iconify from '../components/iconify';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
// import PRODUCTS from '../_mock/products';
import api from '../api'


// ----------------------------------------------------------------------

export default function ProfilePage() {

  const [profileList, setProfileList] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const { isLogin, userInfo } = useSelector((state) => state);
  const [popupOpen, setPopupOpen] = useState(false);
  const [searchType, setSearchType] = useState('title');
  const [searchFilmoType, setSearchFilmoType] = useState('DRAMA');
  const [searchWord, setSearchWord] = useState('');
  const [sort, setSort] = useState('createDtDesc');

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      setPopupOpen(true);
    } else {
      getProfiles();
    }
  }, []);

  useEffect(() => {
    getProfiles();
  }, [sort, searchWord]);

  useEffect(() => {
    setSearchWord('')
    getProfiles();
  }, [searchType, searchFilmoType]);

  const handlePopupClose = () => {
    navigate('/login')
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getProfiles = async () => {
    try {
      // 파라미터 구성 필요
      let filmoType = ''
      let filmoName = ''
      let title = ''
      let actorName = ''
      let sortKey = ''
      let sortDirection = 'ASC'

      if (sort === 'createDtDesc') {
        sortKey = 'createDt'
        sortDirection = 'DESC'
      } else if (sort === 'createDtAsc') {
        sortKey = 'createDt'
      } else if (sort === 'popular') {
        sortKey = 'likeCount'
      }

      if (searchType === 'filmo') {
        filmoType = searchFilmoType
        filmoName = searchWord
      } else if (searchType === 'title') {
        title = searchWord
      } else if (searchType === 'actorName') {
        actorName = searchWord
      }

      const response = await api.get(`/v1/profile/profiles?limit=100&sortKey=${sortKey}&sortDirection=${sortDirection}&filmoType=${filmoType}&filmoName=${filmoName}&title=${title}&actorName=${actorName}`);

      const profiles = response.data.data.profileList;
      setProfileList(profiles);
    } catch (e) {
      setProfileList([]);
    }
  };

  return (
    <>
      <Helmet>
        <title> 배우 프로필 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            배우 프로필
          </Typography>
          {userInfo.memberType === "ACTOR" &&
            <Link to="/dashboard/profileInsert" component={RouterLink}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                프로필 등록하기
              </Button>
            </Link>
          }
        </Stack>
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          배우 프로필 
        </Typography> */}

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

            {/* <div style={{ flex: 1 }}> */}
            <Box>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchType}
                label="검색 유형"
                onChange={(e) => setSearchType(e.target.value)}
                fullWidth
                sx={{ height: '40px' }}
              >
                <MenuItem value='title'>프로필 제목</MenuItem>
                <MenuItem value='actorName'>배우 이름</MenuItem>
                <MenuItem value='filmo'>필모그래피</MenuItem>
              </Select>
              {searchType === 'filmo' &&
                <RadioGroup
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  name="position"
                  defaultValue="DRAMA"
                  onChange={(e) => setSearchFilmoType(e.target.value)}
                  fullWidth
                  sx={{ height: '40px' }}
                >
                  <FormControlLabel value="DRAMA" control={<Radio />} label="드라마" />
                  <FormControlLabel value="MOVIE" control={<Radio />} label="영화" />
                </RadioGroup>
              }
            </Box>
            <InputBase
              fullWidth
              placeholder="검색"
              inputProps={{ 'aria-label': '검색' }}
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              fullWidth
              sx={{
                height: '40px',
                border: '1px solid #ccc',
                borderRadius: '4px', 
                paddingLeft: '8px', 
                paddingRight: '8px',
              }}
            // onKeyPress={handleKeyPress}
            />
            {/* </div> */}

            {/* <div style={{ flex: 1 }}> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="정렬"
              onChange={(e) => setSort(e.target.value)}
              fullWidth
              sx={{ height: '40px' }}
            >
              <MenuItem value='createDtDesc'>최신순</MenuItem>
              <MenuItem value='createDtAsc'>오래된순</MenuItem>
              <MenuItem value='popular'>인기순</MenuItem>
            </Select>
            {/* </div> */}
            {/* <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort /> */}
          </Stack>
        </Stack>

        <ProductList profiles={profileList} />
        {/* <ProductCartWidget /> */}
      </Container>
      <Dialog
        open={popupOpen}
        onClose={handlePopupClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          접근 실패
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            로그인 후 이용이 가능한 페이지입니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose}>로그인 하기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
