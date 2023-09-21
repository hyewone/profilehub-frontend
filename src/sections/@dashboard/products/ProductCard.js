import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  profile: PropTypes.object,
};

export default function ShopProductCard({ profile }) {
  const { profileId, actorName, title, content, defaultImageId, ynType, images, createDt, likeCount } = profile;

  const navigate = useNavigate();

  const handleCardClick = (profileId) => {
    navigate('/dashboard/profileDetail', {
      state: {
        profileId: `${profileId}`
      },
    });
  };

  const getDefaultImagePath = (images) => {
    const defaultImage = images.find((image) => image.imageId === defaultImageId);
    return defaultImage ? defaultImage.filePath : images[0].filePath;
  };

  return (
    <Card onClick={() => handleCardClick(profileId)}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'hot' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label> 
          )} */}
        <StyledProductImg alt={actorName} src={getDefaultImagePath(images)} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Box
            // sx={{
            //   display: 'flex',
            //   alignItems: 'center',
            //   ml: index === 0 ? 0 : 1.5,
            //   // ...((latestPostLarge || latestPost) && {
            //   //   color: 'grey.500',
            //   // }),
            // }}
            >
              <Iconify icon="eva:heart-fill" sx={{ width: 16, height: 16, mr: 0.5, color: '#FF1493' }} />
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>{likeCount}</Typography>
            </Box>
          </Typography>
          <Typography variant="subtitle1">
            {/* <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            > */}
            {/* {priceSale && fCurrency(priceSale)} */}
            {/* </Typography> */}
            {actorName}
            {/* &nbsp;
            {fCurrency(price)} */}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
