import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
  
  useEffect(() => {
    getProfiles();
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getProfiles = async () => {
    try {
        const response = await api.get("/v1/profile/profiles");
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
          <Link to="/dashboard/profileInsert" component={RouterLink}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              프로필 등록하기
            </Button>
          </Link>
        </Stack>
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          배우 프로필 
        </Typography> */}

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

        <ProductList profiles={profileList} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
