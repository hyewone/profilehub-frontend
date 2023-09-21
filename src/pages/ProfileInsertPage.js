// @mui
import { Box, Button, Container, Grid, TextField, Typography, MenuItem, Switch, Card, CardMedia, Select, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// components
import Iconify from '../components/iconify';


// ----------------------------------------------------------------------

export default function ProfilePage() {

  const { isLogin, userInfo } = useSelector((state) => state);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState({title: '접근 실패', content: '로그인 후 이용이 가능한 페이지입니다.', button: '로그인 하기', redirect: '/login'});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      setPopupOpen(true);
    }else if(userInfo.memberType === "ACTOR"){
      setPopupInfo({title: '접근 실패', content: '배우만 프로필 작성이 가능합니다.', button: '확인', redirect: '/'})
      setPopupOpen(true);
    }
  }, []);

  const handlePopupClose = () => {
    navigate(`${popupInfo.redirect}`)
  };

  const [formData, setFormData] = useState({
    actorName: '',
    title: '',
    content: '',
    ynType: 'Y',
    memberId: null,
    images: [],
    videos: [],
    filmos: [],
    links: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 폼 데이터를 서버로 제출하거나 다른 작업을 수행합니다.
    console.log(formData);
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? 'Y' : 'N' });
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, images: files });
  };

  // 동영상 업로드 핸들러
  const handleVideoUpload = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, videos: files });
  };

  // 이미지 및 동영상 미리보기
  const renderPreviews = (fileList) => {
    return fileList.map((file, index) => (
      <Card key={index}>
        <CardMedia
          component="img"
          alt={`Preview ${file.name}`}
          height="140"
          image={URL.createObjectURL(file)}
        />
      </Card>
    ));
  };

  // 새로운 필모그래피 타입 핸들러
  const handleFilmoTypeChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFilmo = () => {
    // 새로운 필모그래피 항목 추가
    const newFilmo = {
      filmoType: formData.newFilmoType,
      filmoName: formData.newFilmoName,
      filmoYear: formData.newFilmoYear,
      filmoDirector: formData.newFilmoDirector,
    };
    setFormData({
      ...formData,
      filmos: [...formData.filmos, newFilmo],
      newFilmoType: '', // 필드 초기화
      newFilmoName: '', // 필드 초기화
      newFilmoYear: '', // 필드 초기화
      newFilmoDirector: '', // 필드 초기화
    });
  };

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <>
      <Helmet>
        <title> 배우 프로필 등록 </title>
      </Helmet>

      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mb: 5 }}>
          배우 프로필 등록
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

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <Typography>비공개</Typography>
                <Switch
                  name="ynType"
                  checked={formData.ynType === 'Y'}
                  onChange={handleToggleChange}
                />
                <Typography>공개</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">프로필 제목</Typography>
              <TextField
                fullWidth
                label="프로필 제목"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">배우 이름</Typography>
              <TextField
                fullWidth
                label="배우 이름"
                name="actorName"
                value={formData.actorName}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">자기소개</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="프로필 자기소개"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* 이미지 업로드 */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">이미지</Typography>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
              <Box mt={2}>
                <Grid container spacing={2}>
                  {renderPreviews(formData.images)}
                </Grid>
              </Box>
            </Grid>

            {/* 동영상 업로드 */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">동영상</Typography>
              <input type="file" multiple accept="video/*" onChange={handleVideoUpload} />
              <Box mt={2}>
                <Grid container spacing={2}>
                  {renderPreviews(formData.videos)}
                </Grid>
              </Box>
            </Grid>

            {/* 필모그래피 입력 */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} mb={1} justifyContent="space-between">
                <Typography variant="subtitle1">필모그래피</Typography>
                <Button variant="contained" onClick={handleAddFilmo} startIcon={<Iconify icon="eva:plus-fill" width={22} height={22}/>} width={22} height={22}/>
              </Stack>
              <Card sx={{ backgroundColor: 'transparent' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      label="필모그래피 타입"
                      name="newFilmoType"
                      value={formData.newFilmoType || ''}
                      onChange={handleFilmoTypeChange}
                      required
                    >
                      <MenuItem value="DRAMA">드라마</MenuItem>
                      <MenuItem value="MOVIE">영화</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="필모그래피 연도"
                      name="newFilmoYear"
                      type="number"
                      value={formData.newFilmoYear || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="필모그래피 이름"
                      name="newFilmoName"
                      value={formData.newFilmoName || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="필모그래피 감독"
                      name="newFilmoDirector"
                      value={formData.newFilmoDirector || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="필모그래피 이름"
                name="newFilmoName"
                value={formData.newFilmoName || ''}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="필모그래피 연도"
                name="newFilmoYear"
                type="number"
                value={formData.newFilmoYear || ''}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="필모그래피 감독"
                name="newFilmoDirector"
                value={formData.newFilmoDirector || ''}
                onChange={handleInputChange}
                required
              />
            </Grid> */}

            {/* 필모그래피 목록 */}
            {formData.filmos.map((filmo, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">필모그래피 #{index + 1}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>타입: {filmo.filmoType}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>이름: {filmo.filmoName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>연도: {filmo.filmoYear}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>감독: {filmo.filmoDirector}</Typography>
                </Grid>
              </Grid>
            ))}

            {/* 링크 입력 */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} mb={1} justifyContent="space-between">
                <Typography variant="subtitle1">링크</Typography>
                <Button variant="contained" onClick={handleAddFilmo} startIcon={<Iconify icon="eva:plus-fill" width={22} height={22}/>} width={22} height={22}/>
              </Stack>
              <Card sx={{ backgroundColor: 'transparent' }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="링크 이름"
                      name="newFilmoName"
                      value={formData.newFilmoName || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      label="링크 URL"
                      name="newFilmoDirector"
                      value={formData.newFilmoDirector || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {/* </Grid> */}

            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="프로필 공개 유형"
                name="ynType"
                select
                value={formData.ynType}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Y">Yes</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </TextField>
            </Grid> */}
          </Grid>
          <Box mt={2} display="flex" alignItems="center" justifyContent="flex-end">
            <Button variant="contained" type="submit">
              작성 완료
            </Button>
          </Box>
        </form>
      </Container>
      <Dialog
        open={popupOpen}
        onClose={handlePopupClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {popupInfo.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {popupInfo.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose}>{popupInfo.button}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}