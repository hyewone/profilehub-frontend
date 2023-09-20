import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  // notice: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ notice, index }) {
  const { noticeId, noticeTitle, noticeContent, filmoType, filmoName, filmoRole, applyDeadlineDt, filmingStartPeriod, filmingEndPeriod } = notice || {};

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/dashboard/filmoDetail', {
      state: {
        noticeId: `${noticeId}`
      },
    });
  };

  return (
    // <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{ position: 'relative' }} onClick={() => handleCardClick()}>
        <CardContent
          sx={{
            pt: 4,
          }}
        >
          {/* <StyledInfo>
          </StyledInfo> */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled' }}>
              {filmoType === 'MOVIE' ? '영화' : '드라마'}
            </Typography>

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
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>123</Typography>
              <Iconify icon="eva:heart-fill" sx={{ width: 16, height: 16, mr: 0.5, color: '#FF1493' }} />
            </Box>

            {/* <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled' }}> */}
            {/* {fDate(createdAt)} */}
            {/* </Typography> */}
          </div>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
          >
            [{filmoName}] {noticeTitle}
          </StyledTitle>

        </CardContent>
      </Card>
    </Grid>
  );
}
