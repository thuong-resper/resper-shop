import { Box } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import { emphasize, withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { useRouter } from 'hooks/useRouter';
import React from 'react';

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

const CustomizedBreadcrumbs = ({ step1, step2, step3, infoProduct }) => {
  const router = useRouter();
  return (
    <Box m="0 0.5rem">
      <Breadcrumbs aria-label="breadcrumb">
        {step1 ? (
          <StyledBreadcrumb
            component="a"
            href="#"
            label={step1}
            icon={<HomeIcon fontSize="small" />}
            onClick={() => router.push('/')}
          />
        ) : null}
        {step2 ? (
          <StyledBreadcrumb
            component="a"
            href="#"
            label={step2}
            onClick={
              infoProduct ? () => router.push(`/shop?category=${infoProduct.category._id}`) : null
            }
          />
        ) : null}
      </Breadcrumbs>
    </Box>
  );
};

export default CustomizedBreadcrumbs;
