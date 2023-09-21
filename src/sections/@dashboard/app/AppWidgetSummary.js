import React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MapIcon from '@mui/icons-material/Map';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MovieIcon from '@mui/icons-material/Movie';

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  let IconComponent;

  switch (icon) {
    case 'profile':
      IconComponent = <AssignmentIndIcon />;
      break;
    case 'filmo':
      IconComponent = <MovieIcon />;
      break;
    case 'search':
      IconComponent = <SearchIcon />;
      break;
    case 'map':
      IconComponent = <MapIcon />;
      break;
    case 'calendar':
      IconComponent = <CalendarTodayIcon />;
      break;
    case 'favorite':
      IconComponent = <FavoriteIcon />;
      break;
    default:
      IconComponent = null;
  }

  return (
    <Card
      sx={{
        py: 5,
        width: '100%',
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        {IconComponent}
      </StyledIcon>

      <Typography variant="h4">{title}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {/* {title} */}
      </Typography>
    </Card>
  );
}
