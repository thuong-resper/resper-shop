import { Grid, makeStyles } from '@material-ui/core';
import Product from 'components/Products/Product/Product';
const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up('md')]: {
      width: '25%',
      flexBasis: '25%',
    },
  },
}));
export default function ListItems({ data }) {
  const classes = useStyles();
  const ShowSeeMore = (data) => {
    if (data.length > 0) {
      return (
        <Grid container direction="row" justifyContent="center">
          {data.map((listProduct) => (
            <Grid item xs={6} sm={4} key={listProduct._id} className={classes.wrapper}>
              <Product product={listProduct} />
            </Grid>
          ))}
        </Grid>
      );
    }
  };
  return <>{ShowSeeMore(data)} </>;
}
