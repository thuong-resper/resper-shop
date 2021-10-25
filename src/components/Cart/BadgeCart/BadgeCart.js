import { Badge } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useRouter } from 'hooks/useRouter';
import React, { useEffect } from 'react';

const BadgeCart = ({ setPatchCart, dataCart }) => {
  const router = useRouter();

  useEffect(() => {
    if (dataCart.length > 0) {
      setPatchCart('/cart');
    } else {
      setPatchCart(null);
    } // eslint-disable-next-line
  }, [dataCart.length]);

  return (
    <IconButton aria-label="cart" onClick={(e) => router.push('/cart')}>
      <StyledBadge badgeContent={dataCart.length} color="secondary" max={9}>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: '#65676b',
  },
}));

export default BadgeCart;
