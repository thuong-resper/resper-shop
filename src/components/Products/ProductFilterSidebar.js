// material
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Form, FormikProvider } from 'formik';
import PropTypes from 'prop-types';import FilterListIcon from '@material-ui/icons/FilterList';
// import ColorManyPicker from '../../ColorManyPicker';
//
const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxWidth: "20rem",
    padding: "1rem",
    // [theme.breakpoints.up('md')]: {
    //   width: '20%',
    //   flexBasis: '20%',
    // },
  },
  titleSeeMore: {
    padding: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0.5rem',
    },
  },
  listItems: { float: 'right' },
}));
export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

ProductFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object,
};

export default function ProductFilterSidebar({
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  formik,
}) {
  const { values, getFieldProps } = formik;
const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      {/* <Button disableRipple color="inherit" endIcon={<FilterListIcon/>} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button> */}

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Divider />
          <Grid spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Gender
              </Typography>
              <FormGroup>
                {FILTER_GENDER_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        {...getFieldProps('gender')}
                        value={item}
                        checked={values.gender.includes(item)}
                      />
                    }
                    label={item}
                  />
                ))}
              </FormGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup {...getFieldProps('category')}>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </div>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup {...getFieldProps('priceRange')}>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <RadioGroup {...getFieldProps('rating')}>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                      />
                    }
                    label="& Up"
                  />
                ))}
              </RadioGroup>
            </div>
          </Grid>

          <Box sx={{ p: 3 }}>
            <Button
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={onResetFilter}
              startIcon={'s'}
            >
              Clear All
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </div>
  );
}
