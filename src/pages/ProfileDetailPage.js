import {
  Favorite, FavoriteBorder, Send
} from '@mui/icons-material';
// @mui
import { Box, Button, Card, Container, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import { getTokenToSessionStorage } from '../reducer/loginComm';

// ----------------------------------------------------------------------

export default function ProfileDetailPage({ openChatRoom, setIsChatRoomOpen, openChat, setIsChatOpen, chatRoomInfo, setChatRoomInfo }) {

  const initailProfile = {
    actorName: '',
    title: '',
    content: '',
    ynType: 'Y',
    images: [],
    videos: [],
    filmos: [],
    links: [],
    memberInfo: {},
  }

  const [profileDetail, setProfileDetail] = useState(initailProfile);
  const [likeId, setLikeId] = useState(0);

  const location = useLocation();
  const profileId = location.state.profileId;
  const [openFilter, setOpenFilter] = useState(false);
  const { isLogin, userInfo } = useSelector((state) => state);

  useEffect(() => {
    getProfile();
    getLike();
  }, [profileId]);

  const getProfile = async () => {
    try {
      const response = await api.get(`/v1/profile/${profileId}`);
      setProfileDetail(response.data.data);
    } catch (e) {
      setProfileDetail(initailProfile);
    }
  }

  const getLike = async () => {
    try {
      const response = await api.get(`/v1/like/PROFILE/${profileId}`);
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
        likeType: "PROFILE",
        targetId: `${profileId}`
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
      attendeeIdList: [ profileDetail.memberInfo.memberId ],
      title: `[프로듀서]${userInfo.memberEmail} -> [배우]${profileDetail.actorName}`
    }

    const response = await axios.post(`http://localhost:7003/v1/chat/room?token=${token}`, roomData);
    console.log('채팅방 생성', response.data);

    if (response.status === 200) {
      setChatRoomInfo(response.data);
    }
    setIsChatOpen(true)
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> 배우 프로필 등록 </title>
      </Helmet>

      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mb: 5 }}>
          배우 프로필 상세
        </Typography>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}

        {/* <ProductList products={PRODUCTS} />
        <ProductCartWidget /> */}

        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
              {userInfo.memberType === "PRODUCER" &&
                <Button variant="contained" startIcon={<Send />} onClick={handleSendChat}>
                  채팅 보내기
                </Button>
              }
              {profileDetail.memberInfo.memberId !== userInfo.memberId &&
                <Button variant="outlined" startIcon={likeId > 0 ? <Favorite sx={{ color: '#FF1493' }} /> : <FavoriteBorder sx={{ color: 'pink' }} />}
                  sx={{ borderColor: '#FF1493', color: '#FF1493' }} onClick={handleLike}>
                  좋아요
                </Button>
              }
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">프로필 제목</Typography>
            <TextField
              fullWidth
              name="title"
              value={profileDetail.title}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">배우 이름</Typography>
            <TextField
              fullWidth
              name="actorName"
              value={profileDetail.actorName}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">자기소개</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="content"
              value={profileDetail.content}
              disabled
            />
          </Grid>

          {/* 이미지 업로드 */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">이미지</Typography>
            <Grid container spacing={2}>
              {profileDetail.images.map((image) => (
                <Grid item key={image.imageId} xs={3} sm={3} md={3}>
                  <Card>
                    <img
                      src={image.filePath}
                      alt={image.fileRealName}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>


          {profileDetail.videos.length > 0 &&
            < Grid item xs={12}>
              <Typography variant="subtitle1">동영상</Typography>
              <Grid container spacing={2}>
                {profileDetail.videos.map((video) => (
                  <Grid item key={video.videoId} xs={3} sm={3} md={4}>
                    <ReactPlayer
                      url={video.filePath}
                      width="100%"
                      height="100%"
                      controls
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          }

          {profileDetail.filmos.length > 0 &&
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} mb={1} justifyContent="space-between">
                <Typography variant="subtitle1">필모그래피</Typography>
                {/* <Button variant="contained" onClick={handleAddFilmo} startIcon={<Iconify icon="eva:plus-fill" width={22} height={22}/>} width={22} height={22}/> */}
              </Stack>
              <Card sx={{ backgroundColor: 'transparent' }}>
                {profileDetail.filmos.map((filmo, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={3}>
                      <Select
                        fullWidth
                        name="newFilmoType"
                        value={filmo.filmoType || ''}
                        disabled
                      >
                        <MenuItem value="DRAMA">드라마</MenuItem>
                        <MenuItem value="MOVIE">영화</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={2}>
                      <TextField
                        fullWidth
                        name="newFilmoYear"
                        type="number"
                        value={filmo.filmoYear || ''}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        name="newFilmoName"
                        value={filmo.filmoName || ''}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        name="newFilmoDirector"
                        value={filmo.filmoDirector || ''}
                        disabled
                      />
                    </Grid>
                  </Grid>
                ))}
              </Card>
            </Grid>
          }

          {/* 링크 입력 */}

          {profileDetail.links.length > 0 &&
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} mb={1} justifyContent="space-between">
                <Typography variant="subtitle1">링크</Typography>
                {/* <Button variant="contained" onClick={handleAddFilmo} startIcon={<Iconify icon="eva:plus-fill" width={22} height={22}/>} width={22} height={22}/> */}
              </Stack>
              <Card sx={{ backgroundColor: 'transparent' }}>

                {profileDetail.links.map((link, index) => (
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        name="newFilmoName"
                        value={link.linkName || ''}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        name="newFilmoDirector"
                        value={link.link || ''}
                        disabled
                      />
                    </Grid>
                  </Grid>
                ))}
              </Card>
            </Grid>
          }
        </Grid>
        <Box mt={2} display="flex" alignItems="center" justifyContent="center" gap={1}>
          {profileDetail.memberInfo.memberId === userInfo.memberId &&
            <Button variant="outlined" component={RouterLink} to="/dashboard/profile">
              수정
            </Button>
          }
          <Button variant="contained" component={RouterLink} to="/dashboard/profile">
            목록
          </Button>
        </Box>
      </Container>
    </>
  );

  // return (
  //   <>
  //     <Helmet>
  //       <title> 배우 상세 프로필</title>
  //     </Helmet>

  //     <Container>
  //       <Typography variant="h4" sx={{ mb: 5 }}>
  //         배우 상세 프로필 
  //       </Typography>

  //       <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
  //         <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
  //           <ProductFilterSidebar
  //             openFilter={openFilter}
  //             onOpenFilter={handleOpenFilter}
  //             onCloseFilter={handleCloseFilter}
  //           />
  //           <ProductSort />
  //         </Stack>
  //       </Stack>

  //       <ProductList products={PRODUCTS} />
  //       <ProductCartWidget />
  //     </Container>
  //   </>
  // );
}
