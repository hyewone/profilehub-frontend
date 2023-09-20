import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Favorite, FavoriteBorder, Send
} from '@mui/icons-material';
// @mui
import { Box, Button, Container, Grid, TextField, Typography, MenuItem, Switch, Card, CardMedia, Select, Stack, IconButton } from '@mui/material';
import axios from 'axios';
import api from '../api'
import { getTokenToSessionStorage } from '../reducer/loginComm';

// ----------------------------------------------------------------------

export default function FilmoDetailPage({ openChatRoom, setIsChatRoomOpen, openChat, setIsChatOpen, chatRoomInfo, setChatRoomInfo }) {

  const initalNotice = {
    noticeTitle: '',
    noticeContent: '',
    filmoType: '',
    filmoName: '',
    filmoRole: '',
    applyDeadlineDt: '',
    filmingStartPeriod: '',
    filmingEndPeriod: '',
    memberInfo: {},
  }

  const [noticeDetail, setNoticeDetail] = useState(initalNotice);
  const [likeId, setLikeId] = useState(0);

  const location = useLocation();
  const noticeId = location.state.noticeId;
  const { isLogin, userInfo } = useSelector((state) => state);

  useEffect(() => {
    getNotice();
    getLike();
  }, [noticeId]);

  const getNotice = async () => {
    try {
      const response = await api.get(`/v1/notice/${noticeId}`);
      setNoticeDetail(response.data.data);
    } catch (e) {
      setNoticeDetail(initalNotice);
    }
  }

  const getLike = async () => {
    try {
      const response = await api.get(`/v1/like/NOTICE/${noticeId}`);
      if (response.data.status === "SUCCESS") {
        setLikeId(response.data.data)
      } else {
        setLikeId(0)
      }
    } catch (e) {
      setLikeId(0)
    }
  }

  const handleLike = async () => {
    if (likeId > 0) {
      const response = await api.delete(`/v1/like/${likeId}`);
      if (response.data.status === "SUCCESS") {
        setLikeId(0)
      }
    } else {
      const data = {
        likeType: "NOTICE",
        targetId: `${noticeId}`
      };
      const response = await api.post(`/v1/like`, null, { params: data });
      if (response.data.status === "SUCCESS") {
        setLikeId(response.data.data)
      }
    }
  }

  const handleSendChat = async () => {
    const token = getTokenToSessionStorage();
    const roomData = {
      attendeeIdList: [noticeDetail.memberInfo.memberId],
      title: `[배우]${userInfo.profileInfo.actorName} -> [프로듀서]${noticeDetail.memberInfo.memberEmail}`
    }

    const response = await axios.post(`http://localhost:7003/v1/chat/room?token=${token}`, roomData);
    console.log('채팅방 생성', response.data);

    if (response.status === 200) {
      setChatRoomInfo(response.data);
    }
    setIsChatOpen(true)
  }

  return (
    <>
      <Helmet>
        <title> 작품 공고 상세 </title>
      </Helmet>

      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mb: 5 }}>
          작품 공고 상세
        </Typography>

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack> */}

        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
              {userInfo.memberType === "ACTOR" &&
                <Button variant="contained" startIcon={<Send />} onClick={handleSendChat}>
                  채팅 보내기
                </Button>
              }
              {noticeDetail.memberInfo.memberId !== userInfo.memberId &&
                <Button variant="outlined" startIcon={likeId > 0 ? <Favorite sx={{ color: '#FF1493' }} /> : <FavoriteBorder sx={{ color: 'pink' }} />}
                  sx={{ borderColor: '#FF1493', color: '#FF1493' }} onClick={handleLike}>
                  좋아요
                </Button>
              }
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">작품 공고 제목</Typography>
            <TextField
              fullWidth
              value={noticeDetail.noticeTitle}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ backgroundColor: 'transparent' }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">작품 유형</Typography>
                  <Select
                    fullWidth
                    value={noticeDetail.filmoType || ''}
                    disabled
                  >
                    <MenuItem value="DRAMA">드라마</MenuItem>
                    <MenuItem value="MOVIE">영화</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="subtitle1">작품명</Typography>
                  <TextField
                    value={noticeDetail.filmoName || ''}
                    disabled
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">역할</Typography>
                  <TextField
                    fullWidth
                    value={noticeDetail.filmoRole || ''}
                    disabled
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ backgroundColor: 'transparent' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">지원 마감일자</Typography>
                  <TextField
                    fullWidth
                    value={noticeDetail.applyDeadlineDt}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">촬영 기간</Typography>
                  <Box display="flex" alignItems="center">
                    <TextField
                      fullWidth
                      value={noticeDetail.filmingStartPeriod}
                      disabled
                    />
                    ~
                    <TextField
                      fullWidth
                      value={noticeDetail.filmingEndPeriod}
                      disabled
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">작품 공고 내용</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={noticeDetail.content}
              disabled
            />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center" justifyContent="center" gap={1}>
          {/* {userInfo.memberId == noticeDetail} */}

          {userInfo.memberType === "ACTOR" &&
            <Button variant="contained">
              지원하기
            </Button>
          }
          {noticeDetail.memberInfo.memberId === userInfo.memberId &&
            <Button variant="outlined" component={RouterLink} to="/dashboard/filmo">
              수정
            </Button>
          }
          <Button variant="contained" component={RouterLink} to="/dashboard/filmo">
            목록
          </Button>

        </Box>
      </Container>
    </>
  );
}
