import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  // profiles: PropTypes.array.isRequired,
};

export default function ProductList({ profiles, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {profiles &&
        profiles.map((profile) => (
          <Grid key={profile.id} item xs={6} sm={4} md={3}>
            <ShopProductCard profile={profile} />
          </Grid>
        ))
      }
    </Grid>
  );
}
