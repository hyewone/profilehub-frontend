import {
  Box, Card, CardHeader, Container, Grid, Link, Typography
} from '@mui/material';
// @mui
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
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

export default function HomePage() {
  const apiUrl = process.env.REACT_APP_API_URL

  const theme = useTheme();

  const [sgList, setSgList] = useState([]);                     // 무대인사
  const [megaboxSgUrlList, setMegaboxSgUrlList] = useState([]); // 메가박스 무대인사 URL
  const [lotteSgUrlList, setLotteSgUrlList] = useState([]);     // 롯데시네마 무대인사 URL
  const [cgvSgUrlList, setCgvSgUrlList] = useState([]);         // CGV 무대인사 URL

  const getApiUrl = (request) => {
    return apiUrl + request
  }

  const fetchAllData = async () => {
    fetchSgList()
    fetchMegaboxSgUrlList()
    fetchLotteSgUrlList()
    fetchCgvSgUrlList()
  }

  // API 호출 함수 정의

  const fetchSgList = async () => {
    try {
      const response = await axios.get(getApiUrl('/api/v1/stageGreetings'));
      let data = response.data.stageGreetings
      data = data == null ? [] : data
      setSgList(data);
    } catch (error) {
      console.error('Error fetching stageGreetings:', error);
    }
  };

  const fetchMegaboxSgUrlList = async () => {
    try {
      const response = await axios.get(getApiUrl('/api/v1/stageGreetingUrls?cinemaType=MEGABOX'));
      let data = response.data.stageGreetingUrls
      data = data == null ? [] : data
      setMegaboxSgUrlList(data);
    } catch (error) {
      console.error('Error fetching megebox stageGreetingUrls:', error);
    }
  };

  const fetchLotteSgUrlList = async () => {
    try {
      const response = await axios.get(getApiUrl('/api/v1/stageGreetingUrls?cinemaType=LOTTECINEMA'));
      let data = response.data.stageGreetingUrls
      data = data == null ? [] : data
      setLotteSgUrlList(data);
    } catch (error) {
      console.error('Error fetching lottecinema stageGreetingUrls:', error);
    }
  };

  const fetchCgvSgUrlList = async () => {
    try {
      const response = await axios.get(getApiUrl('/api/v1/stageGreetingUrls?cinemaType=CGV'));
      let data = response.data.stageGreetingUrls
      data = data == null ? [] : data
      setCgvSgUrlList(data);
    } catch (error) {
      console.error('Error fetching cgv stageGreetingUrls:', error);
    }
  };

  // ----------------------------------------------------------------------

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = sgList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sgList.length) : 0;

  const filteredUsers = applySortFilter(sgList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;


  // ----------------------------------------------------------------------

  useEffect(() => {
    fetchAllData()
  }, []);

  useEffect(() => {
    // console.log(sgList)
    // console.log(megaboxSgUrlList)
    // console.log(lotteSgUrlList)
    // console.log(cgvSgUrlList)
  }, [sgList, megaboxSgUrlList, lotteSgUrlList, cgvSgUrlList]);


  // ----------------------------------------------------------------------

  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }} align="center" />

        <Grid container spacing={10}>

          <Grid item xs={12} md={12} lg={12}>
            <Container>
              <Card>
                <CardHeader title="프로필 관리 이제는 ProfileHub" subheader="" />
                <Box sx={{ p: 4, pb: 1 }} dir="ltr">
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={6} md={3}>
                      <Link to="/dashboard/map" component={RouterLink} sx={{ display: 'contents' }}>
                        <AppWidgetSummary title="프로필 조회" total={714000} icon="search" />
                      </Link>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <Link to="/dashboard/map" component={RouterLink} sx={{ display: 'contents' }}>
                        <AppWidgetSummary title="작품공고 조회" total={1352831} color="secondary" icon="map" />
                      </Link>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <Link to="/dashboard/calendar" component={RouterLink} sx={{ display: 'contents' }}>
                        <AppWidgetSummary title="캘린더로 보기" total={1723315} color="info" icon="calendar" />
                      </Link>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <Link to="/dashboard/myPage" component={RouterLink} sx={{ display: 'contents' }}>
                        <AppWidgetSummary title="마이 페이지" total={234} color="error" icon="favorite" />
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
                <CardHeader />
              </Card>
            </Container>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Container>
              <Card>
                <CardHeader title="최신 프로필" subheader="" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <ProductList products={PRODUCTS.slice(0, 4)} />
                </Box>
                <CardHeader />
              </Card>
            </Container>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>

            <Container>
              <Card>
                <CardHeader title="최신 작품 공고" subheader="" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <Grid container spacing={3}>
                    {POSTS.slice(0, 4).map((post, index) => (
                      <BlogPostCard key={post.id} post={post} index={index} />
                    ))}
                  </Grid>
                </Box>
                <CardHeader />
              </Card>
            </Container>
          </Grid>

          {/* <Grid item xs={12} md={12} lg={12}>
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} ml={1}>
                <Typography variant="h4" gutterBottom lm={1}>
                  무대인사 모아보기
                </Typography>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                  상세 모아보기
                </Button>
              </Stack>

              <Card>
                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={sgList.length}
                        // numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                      // onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const { ID, CinemaType, Theater, ShowDate, ShowTime, AttendeeName } = row;
                          const MovieName = row.Movie.Name;

                          return (
                            <TableRow hover key={ID} tabIndex={-1} role="checkbox">

                              <TableCell align="center" component="th" scope="row" padding="none">
                                <Avatar alt={CinemaType} src="" sx={{ margin: 'auto', display: 'block' }} />
                              </TableCell>

                              <TableCell align="center">
                                <Avatar alt={CinemaType} src="" sx={{ margin: 'auto', display: 'block' }} />
                                {MovieName}
                              </TableCell>

                              <TableCell align="center">{Theater}</TableCell>

                              <TableCell align="center">{ShowDate}</TableCell>

                              <TableCell align="center">
                                <Label color={(ShowTime === 'banned' && 'error') || 'success'}>{sentenceCase(ShowTime)}</Label>
                              </TableCell>

                              <TableCell align="center">
                                {AttendeeName}
                              </TableCell>
                              <TableCell align="center">
                                <Label color={(ShowTime === 'banned' && 'error') || 'success'}>{sentenceCase("예매하기")}</Label>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>

                      {isNotFound && (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                              <Paper
                                sx={{
                                  textAlign: 'center',
                                }}
                              >
                                <Typography variant="h6" paragraph>
                                  Not found
                                </Typography>

                                <Typography variant="body2">
                                  No results found for &nbsp;
                                  <strong>&quot;{filterName}&quot;</strong>.
                                  <br /> Try checking for typos or using complete words.
                                </Typography>
                              </Paper>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Scrollbar>
              </Card>
            </Container>
          </Grid> */}

          {/* <Grid item xs={12} md={12} lg={12}>
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} ml={1}>
                <Typography variant="h4" gutterBottom>
                  무대인사 사이트 바로가기
                </Typography>
              </Stack>
              <Card>
                <CardHeader title="메가박스" subheader="" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <ProductList products={megaboxSgUrlList} />
                </Box>
                <CardHeader />
                <CardHeader title="롯데시네마" subheader="" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <ProductList products={lotteSgUrlList} />
                </Box>
                {/* <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <Grid container spacing={3}>
                    {POSTS.slice(0, 3).map((post, index) => (
                      <BlogPostCard key={post.id} post={post} index={index} />
                    ))}
                  </Grid>
                </Box> 
                <CardHeader />
                <CardHeader title="CGV" subheader="" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <ProductList products={cgvSgUrlList} />
                </Box>
                <CardHeader />
              </Card>
            </Container>
          </Grid> */}

          {/* <Grid item xs={12} md={12} lg={12}>
            <Card>
              <CardHeader title="롯데시네마" subheader="" />
              <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ProductList products={lotteSgUrlList} />
              </Box>
              <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <Grid container spacing={3}>
                  {POSTS.slice(0, 3).map((post, index) => (
                    <BlogPostCard key={post.id} post={post} index={index} />
                  ))}
                </Grid>
              </Box>
              <CardHeader />
            </Card>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <CardHeader title="CGV" subheader="" />
              <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ProductList products={cgvSgUrlList} />
              </Box>
              <CardHeader />
            </Card>
          </Grid> */}



          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
