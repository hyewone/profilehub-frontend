import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Grid, Button, Container, Stack, Typography, Link, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import api from '../api'


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'oldest', label: '오래된순' },
];

export default function FilmoPage() {

  const [noticeList, setNoticeList] = useState([]);
  const { isLogin, userInfo } = useSelector((state) => state);
  const [popupOpen, setPopupOpen] = useState(false);
  const [sort, setSort] = useState('createDtDesc');

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      setPopupOpen(true);
    } else {
      getNotices();
    }
  }, []);

  useEffect(() => {
    getNotices();
  }, [sort]);

  const handlePopupClose = () => {
    navigate('/login')
  };

  const getNotices = async () => {
    try {

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

      const response = await api.get(`/v1/notice/notices?limit=100&sortKey=${sortKey}&sortDirection=${sortDirection}`);
      const notices = response.data.data.noticeList;
      setNoticeList(notices);
    } catch (e) {
      setNoticeList([]);
    }
  }

  return (
    <>
      <Helmet>
        <title> 작품 공고 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            작품 공고
          </Typography>
          {userInfo.memberType === "PRODUCER" &&
            <Link to="/dashboard/filmoInsert" component={RouterLink}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                작품 공고 등록하기
              </Button>
            </Link>
          }
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
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
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {noticeList &&
            noticeList.map((notice, index) => (
              <BlogPostCard key={notice.noticeId} notice={notice} index={index} />
            ))
          }
        </Grid>
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
