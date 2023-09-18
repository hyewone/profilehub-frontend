import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Grid, Button, Container, Stack, Typography, Link } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard } from '../sections/@dashboard/blog';
import api from '../api'

// ----------------------------------------------------------------------

export default function FilmoPage() {

  const [noticeList, setNoticeList] = useState([]);
  const { isLogin, userInfo } = useSelector((state) => state);

  useEffect(() => {
    getNotices();
  }, []);

  const getNotices = async () => {
    try {
      const response = await api.get("/v1/notice/notices");
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
          <Link to="/dashboard/filmoInsert" component={RouterLink}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              작품 공고 등록하기
            </Button>
          </Link>
        </Stack>

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between"> */}
        {/* <BlogPostsSearch noticeList={noticeList} /> */}
        {/* <BlogPostsSort options={SORT_OPTIONS} /> */}
        {/* </Stack> */}

        <Grid container spacing={3}>
          {noticeList &&
            noticeList.map((notice, index) => (
              <BlogPostCard key={notice.noticeId} notice={notice} index={index} />
            ))
          }
        </Grid>
      </Container>
    </>
  );
}
