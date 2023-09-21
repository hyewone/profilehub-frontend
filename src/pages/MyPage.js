import {
  Box, Card, CardHeader, Container, Grid, Link, Typography
} from '@mui/material';
// @mui
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import api from '../api';
// sections
import {
  AppWidgetSummary
} from '../sections/@dashboard/app';
import { BlogPostCard } from '../sections/@dashboard/blog';
import { ProductList } from '../sections/@dashboard/products';
// mock
import POSTS from '../_mock/blog';
import PRODUCTS from '../_mock/products';




// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: 'CinemaType', label: '시네마', alignRight: false },
  { id: 'company', label: '영화이름', alignRight: false },
  { id: 't', label: '상영극장', alignRight: false },
  { id: 'isVerified', label: '상영일자', alignRight: false },
  { id: 'status', label: '상영시간', alignRight: false },
  { id: 'attende', label: '참석자', alignRight: false },
  { id: 'attende2', label: '예매하기', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function MyPage() {

  const { isLogin, userInfo } = useSelector((state) => state);

  const [myProfile, setMyProfile] = useState([]);
  const [myNotices, setMyNotices] = useState([]);
  const [iLikedProfileList, setILikedProfileList] = useState([]);
  const [iLikeNoticeList, setILikeNoticeList] = useState([]);
  const [applyedToMyNoticeProfileList, setApplyedToMyNoticeProfileList] = useState([]);

  const getAllData = async () => {
    if (userInfo.memberType === "ACTOR") {
      getMyProfile()
    } else if (userInfo.memberType === "PRODUCER") {
      getMyNotices()
      // getApplyedToMyNoticeProfileList()
    }
    getILikedProfileList()
    getILikeNoticeList()
  }

  // API 호출 함수 정의

  const getMyProfile = async () => {
    try {
      const response = await api.get(`/v1/profile/${userInfo.profileInfo.profileId}`);
      const profile = response.data.data;
      setMyProfile([profile]);
    } catch (e) {
      setMyProfile([]);
    }
  };

  const getMyNotices = async () => {
    try {
      const response = await api.get("/v1/notice/myNotices");
      setMyNotices(response.data.data);
    } catch (e) {
      setMyNotices([]);
    }
  };

  const getILikedProfileList = async () => {
    try {
      const response = await api.get("/v1/like/mylikeProfiles");
      setILikedProfileList(response.data.data);
    } catch (e) {
      setILikedProfileList([]);
    }
  };

  const getILikeNoticeList = async () => {
    try {
      const response = await api.get("/v1/like/mylikeNotices");
      setILikeNoticeList(response.data.data);
    } catch (e) {
      setILikeNoticeList([]);
    }
  };

  const getApplyedToMyNoticeProfileList = async () => {
    try {
      const response = await api.get("/v1/profile/profiles");
      setApplyedToMyNoticeProfileList(response.data.data);
    } catch (e) {
      setApplyedToMyNoticeProfileList([]);
    }
  };

  // ----------------------------------------------------------------------

  useEffect(() => {
    getAllData()
  }, []);

  // ----------------------------------------------------------------------

  return (
    <>
      <Helmet>
        <title> MyPage </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }} align="center" />

        <Grid container spacing={10}>

          {userInfo.memberType === "ACTOR" &&
            <Grid item xs={12} md={12} lg={12}>
              <Container>
                <Card>
                  <CardHeader title="내 프로필" subheader="" />
                  <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    <ProductList profiles={myProfile} />
                  </Box>
                  <CardHeader />
                </Card>
              </Container>
            </Grid>
          }

          {userInfo.memberType === "PRODUCER" &&
            <Grid item xs={12} md={12} lg={12}>
              <Container>
                <Card>
                  <CardHeader title="내 작품 공고" subheader="" />
                  <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    <Grid container spacing={3}>
                      {myNotices.map((notice, index) => (
                        <BlogPostCard key={notice.noticeId} notice={notice} index={index} />
                      ))}
                    </Grid>
                  </Box>
                  <CardHeader />
                </Card>
              </Container>
            </Grid>
          }

          <Grid item xs={12} md={12} lg={12}>
            <Container>
              <Card>
                <CardHeader title="내가 좋아요한 프로필" subheader="" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <ProductList profiles={iLikedProfileList} />
                </Box>
                <CardHeader />
              </Card>
            </Container>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Container>
              <Card>
                <CardHeader title="내가 좋아요한 작품 공고" subheader="" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <Grid container spacing={3}>
                    {iLikeNoticeList.map((notice, index) => (
                      <BlogPostCard key={notice.id} notice={notice} index={index} />
                    ))}
                  </Grid>
                </Box>
                <CardHeader />
              </Card>
            </Container>
          </Grid>

          {/* {userInfo.memberType === "PRODUCER" &&
            <Grid item xs={12} md={12} lg={12}>
              <Container>
                <Card>
                  <CardHeader title="내 작품 공고에 지원한 배우 프로필" subheader="" />
                  <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    <ProductList profiles={applyedToMyNoticeProfileList} />
                  </Box>
                  <CardHeader />
                </Card>
              </Container>
            </Grid>
          } */}
        </Grid>
      </Container>
    </>
  );
}
