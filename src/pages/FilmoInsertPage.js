import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
// @mui
import { Box, Button, Container, Grid, TextField, Typography, MenuItem, Switch, Card, CardMedia, Select, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// date-fns 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function FilmoPage() {

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

  return (
    <>
      <Helmet>
        <title> 작품 공고 등록 </title>
      </Helmet>

      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mb: 5 }}>
          작품 공고 등록
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">작품 공고 제목</Typography>
              <TextField
                fullWidth
                label="작품 공고 제목"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ backgroundColor: 'transparent' }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">작품 유형</Typography>
                    <Select
                      fullWidth
                      label="작품 유형"
                      name="newFilmoType"
                      value={formData.newFilmoType || ''}
                      // onChange={handleFilmoTypeChange}
                      required
                    >
                      <MenuItem value="DRAMA">드라마</MenuItem>
                      <MenuItem value="MOVIE">영화</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="subtitle1">작품명</Typography>
                    <TextField
                      fullWidth
                      label="작품명"
                      name="newFilmoYear"
                      type="number"
                      value={formData.newFilmoYear || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">역할</Typography>
                    <TextField
                      fullWidth
                      label="역할"
                      name="newFilmoName"
                      value={formData.newFilmoName || ''}
                      onChange={handleInputChange}
                      required
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
                    < LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker label="지원 마감일자" />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">촬영 기간</Typography>
                    < LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Box display="flex" alignItems="center">
                      <DatePicker label="촬영 시작일자" />
                       ~
                      <DatePicker label="촬영 종료일자" />
                      </Box>
                    </LocalizationProvider>
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
                label="작품 공고 내용"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
          <Box mt={2} display="flex" alignItems="center" justifyContent="flex-end">
            <Button variant="contained" type="submit">
              작성 완료
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}
