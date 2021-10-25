import {
  AppBar,
  Box,
  Button,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import AspectRatioSharpIcon from '@material-ui/icons/AspectRatioSharp';
import BookmarkSharpIcon from '@material-ui/icons/BookmarkSharp';
import BrandingWatermarkSharpIcon from '@material-ui/icons/BrandingWatermarkSharp';
import Brightness1SharpIcon from '@material-ui/icons/Brightness1Sharp';
import CastConnectedSharpIcon from '@material-ui/icons/CastConnectedSharp';
import CategorySharpIcon from '@material-ui/icons/CategorySharp';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import ClassSharpIcon from '@material-ui/icons/ClassSharp';
import ClearAllSharpIcon from '@material-ui/icons/ClearAllSharp';
import FiberPinSharpIcon from '@material-ui/icons/FiberPinSharp';
import FullscreenSharpIcon from '@material-ui/icons/FullscreenSharp';
import HdrStrongSharpIcon from '@material-ui/icons/HdrStrongSharp';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import LocalOfferSharpIcon from '@material-ui/icons/LocalOfferSharp';
import PaletteSharpIcon from '@material-ui/icons/PaletteSharp';
import PanoramaHorizontalSharpIcon from '@material-ui/icons/PanoramaHorizontalSharp';
import ThumbUpSharpIcon from '@material-ui/icons/ThumbUpSharp';
import VideoLabelSharpIcon from '@material-ui/icons/VideoLabelSharp';
import WcSharpIcon from '@material-ui/icons/WcSharp';
import Pagination from '@material-ui/lab/Pagination';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import { unwrapResult } from '@reduxjs/toolkit';
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import Product from 'components/Products/Product/Product';
import { AntTab, AntTabs } from 'components/Tab/Tab';
import { getCategories, getCategorySubs } from 'features/Admin/Category/pathAPI';
import { getSearch } from 'features/Search/patchAPI';
import { updateSearch } from 'features/Search/SearchProductSlice';
import useWindowDimensions from 'hooks/useWindowDimensions';
import {
  colorOptions,
  laptopCpu,
  laptopRam,
  laptopRes,
  laptopRom,
  laptopSc,
  phoneRam,
  phoneRom,
  phoneSc,
  phoneType,
  smWatchFace,
  smWatchPin,
  smWatchSc,
  tabletRam,
  tabletRom,
  tabletSc,
  watchSc,
  watchSex,
} from 'staticOptions';
import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up('md')]: {
      width: '20%',
      flexBasis: '20%',
    },
  },
  itemWrapper: {
    [theme.breakpoints.up('md')]: {
      width: '25%',
      flexBasis: '25%',
    },
  },
  title: {
    lineHeight: '2',
    display: 'flex',
    alignItems: 'center',
  },
  titleSeeMore: {
    padding: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0.5rem',
    },
  },
  appBar: { boxShadow: 'none', backgroundColor: '#fff' },
  filter: {
    width: '20%',
    maxWidth: '300px',
    marginRight: '0.5rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  listItems: {
    width: '80%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  colorForm: { display: 'block' },
}));

const sortOptions = [
  {
    label: 'Bán Chạy',
    value: '-sold',
    index: 0,
  },
  {
    label: 'Hàng Mới',
    value: '-_id',
    index: 1,
  },
  {
    label: 'Giá Thấp', //low to high
    value: 'price',
    index: 2,
  },
  {
    label: 'Giá Cao', //high to low
    value: '-price',
    index: 3,
  },
];

const priceOptions = [
  {
    label: 'Dưới 2 triệu',
    value: [0, 2000000],
    index: '0',
  },
  {
    label: 'Từ 2 - 4 triệu',
    value: [2000000, 4000000],
    index: '1',
  },
  {
    label: 'Từ 4 - 7 triệu',
    value: [4000000, 7000000],
    index: '2',
  },
  {
    label: 'Từ 7 - 13 triệu',
    value: [7000000, 13000000],
    index: '3',
  },
  {
    label: 'Từ 13 - 20 triệu',
    value: [13000000, 20000000],
    index: '4',
  },
  {
    label: 'Trên 20 triệu',
    value: [20000000, 50000000],
    index: '5',
  },
];

const starOptions = [
  {
    label: 'từ 5 sao',
    value: [4.5, 5],
    index: '0',
  },
  {
    label: 'từ 4 sao',
    value: [4, 4.5],
    index: '1',
  },
  {
    label: 'từ 3 sao',
    value: [3, 4],
    index: '2',
  },
  {
    label: 'từ 2 sao',
    value: [2, 3],
    index: '2',
  },
];

export default function ShopPage({ location }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const page = Number(queryString.parse(location.search).page) || 1;
  const categoryUrl = queryString.parse(location.search).category || [];
  //  fetched fashion watch first
  const items = 20;

  //check the width of window
  const { width } = useWindowDimensions();

  const [value, setValue] = useState(0);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [price, setPrice] = useState([]);
  const [priceValue, setPriceValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(categoryUrl);
  const [star, setStar] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [sub, setSub] = useState([]);
  // const [colors, setColors] = useState(['Black', 'Brown', 'Silver', 'White', 'Blue']);
  const [color, setColor] = useState([]);
  // const [shipping, setShipping] = useState('');

  //specific filter
  const [type, setType] = useState([]);
  const [sc, setSc] = useState([]);
  const [ram, setRam] = useState([]);
  const [rom, setRom] = useState([]);
  const [res, setRes] = useState([]);
  const [cpu, setCpu] = useState([]);
  const [sex, setSex] = useState([]);
  const [pin, setPin] = useState([]);
  const [face, setFace] = useState([]);

  // dispatch
  const actionGetCategories = () => dispatch(getCategories());
  const actionGetCategorySubs = (_id) => dispatch(getCategorySubs(_id));
  const actionSaveSearch = (keyword) => dispatch(updateSearch(keyword));

  // Data Search
  const dataSearch = useSelector((state) => state.search.data);
  console.log(dataSearch);
  const lengthSearch = useSelector((state) => state.search.length);
  const loadingSearch = useSelector((state) => state.search.loading);
  const query = useSelector((state) => state.search.search);

  // dispatch API
  useEffect(() => {
    let params = {};

    if (query.length > 0) {
      params = {
        query,
        page: page || 1,
        limit: items || 20,
        sort,
        category,
        subs: sub,
        price,
        star,
        color,
        type,
        sc,
        ram,
        rom,
        res,
        cpu,
        sex,
        pin,
        face,
      };
    } else {
      params = {
        page: page || 1,
        limit: items || 20,
        sort,
        category,
        subs: sub,
        price,
        rating: star,
        color,
        type,
        sc,
        ram,
        rom,
        res,
        cpu,
        sex,
        pin,
        face,
      };
    }

    const actionGetSearch = (params) => dispatch(getSearch(params));
    actionGetSearch(params); // eslint-disable-next-line
  }, [
    page,
    items,
    query,
    sort,
    category,
    sub,
    price,
    star,
    color,
    type,
    sc,
    ram,
    rom,
    res,
    cpu,
    sex,
    pin,
    face,
  ]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await actionGetCategories();
        const res = unwrapResult(categories);
        setCategories(res);
      } catch (err) {}
    };
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // scroll to top
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const handleChangeCategory = async (value) => {
    actionSaveSearch('');
    setSub([]);
    setSort('-sold');
    setType([]);
    setSc([]);
    setRam([]);
    setRom([]);
    setRes([]);
    setCpu([]);
    setSex([]);
    setPin([]);
    setFace([]);
    if (value) {
      setCategory(value._id);
      const subs = await actionGetCategorySubs(value._id);
      const resSubs = unwrapResult(subs);
      if (resSubs) {
        setSubOptions(resSubs);
        setShowSub(true);
      }
    }
  };

  const handleChangeSubs = async (value) => {
    actionSaveSearch('');
    setSort('-sold');
    setType([]);
    setSc([]);
    setRam([]);
    setRom([]);
    setRes([]);
    setCpu([]);
    setSex([]);
    setPin([]);
    setFace([]);
    if (value) {
      setSub(value._id);
    }
  };

  const handleChangePrice = async (item) => {
    console.log(item);
    actionSaveSearch('');
    if (item) {
      setPrice(item.value);
      setPriceValue(item.index);
      console.log(priceValue);
    }
  };

  const handleChangeStar = async (item) => {
    console.log(item);
    actionSaveSearch('');
    if (item) {
      setStar(item.value);
    }
  };

  const handleChangeColor = async (item) => {
    actionSaveSearch('');
    if (item) {
      setColor(item.value);
    }
  };

  const handleChangeType = async (item) => {
    actionSaveSearch('');
    if (item) {
      setType(item.value);
    }
  };

  const handleChangeSc = async (item) => {
    actionSaveSearch('');
    if (item) {
      setSc(item.value);
    }
  };

  const handleChangeRam = async (item) => {
    actionSaveSearch('');
    if (item) {
      setRam(item.value);
    }
  };

  const handleChangeRom = async (item) => {
    actionSaveSearch('');
    if (item) {
      setRam(item.value);
    }
  };

  const handleChangeSex = async (item) => {
    actionSaveSearch('');
    if (item) {
      setSex(item.value);
    }
  };

  const handleChangePin = async (item) => {
    actionSaveSearch('');
    if (item) {
      setPin(item.value);
    }
  };

  const handleChangeFace = async (item) => {
    actionSaveSearch('');
    if (item) {
      setFace(item.value);
    }
  };

  const handleChangeRes = async (item) => {
    actionSaveSearch('');
    if (item) {
      setRes(item.value);
    }
  };

  const handleChangeCpu = async (item) => {
    actionSaveSearch('');
    if (item) {
      setCpu(item.value);
    }
  };

  const onResetFilter = () => {
    actionSaveSearch('');
    setCategory([]);
    setPrice([]);
    setSub([]);
    setSort('-sold');
    setType([]);
    setSc([]);
    setRam([]);
    setRom([]);
    setRes([]);
    setCpu([]);
    setSex([]);
    setPin([]);
    setFace([]);
  };

  // function
  const onChangePage = (page, newPage) => {
    const data = {
      query: query || '',
      page: newPage,
      limit: items || 20,
    };
    const params = queryString.stringify(data);
    const url = `/shop?${params}`;
    history.push(url);
  };

  const handleChange = (event, newValue) => {
    for (let i = 0; i < sortOptions.length; i++) {
      if (sortOptions[i].index === newValue) {
        setSort(sortOptions[i].value);
      }
    }
    setValue(newValue);
  };

  const showPagination = (length) => {
    if (length > 0) {
      return (
        <Box display="flex" justifyContent="end" width="100%" m="0.5rem">
          <Pagination
            variant="outlined"
            shape="rounded"
            count={Math.ceil(length / items)}
            page={page}
            onChange={onChangePage}
          />
        </Box>
      );
    }
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }

  const showListProducts = (data) => {
    if (data.length > 0) {
      return (
        <>
          {width < 600 ? (
            <>
              <Grid container justify="flex-start">
                {data.slice(0, 4).map((item, index) => (
                  <Grid item xs={6} key={index}>
                    <Product product={item} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              {data.map((item, index) => (
                <TabPanel className="tab-panel" value={value} index={index} key={index}>
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    {data?.map((listProduct) => (
                      <Grid item xs={6} sm={4} md={3} key={listProduct._id}>
                        <Product product={listProduct} />
                      </Grid>
                    ))}
                  </Grid>
                  {showPagination(lengthSearch)}
                </TabPanel>
              ))}
            </>
          )}
        </>
      );
    }
  };

  return (
    <div id="searchPage" ref={divRef}>
      <Typography variant="h5" className={classes.titleSeeMore} gutterBottom>
        {loadingSearch ? (
          <p>Loading...</p>
        ) : query.length > 0 ? (
          `Có ${lengthSearch} kết quả tìm kiếm cho '${query}'`
        ) : (
          `Có ${lengthSearch} sản phẩm`
        )}
      </Typography>
      <Box display="flex">
        <Paper className={classes.filter}>
          <Typography variant="button" className={classes.title}>
            <CategorySharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Danh mục sản
            phẩm
          </Typography>
          <RadioGroup>
            {categories?.map((item) => (
              <FormControlLabel
                key={item._id}
                value={item._id}
                control={<Radio size="small" style={{ padding: '4px' }} />}
                onChange={() => handleChangeCategory(item)}
                label={item.name}
              />
            ))}
          </RadioGroup>

          {showSub && (
            <>
              <Typography variant="button" className={classes.title}>
                <BrandingWatermarkSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} />{' '}
                Thương hiệu
              </Typography>
              <RadioGroup>
                {subOptions?.map((item) => (
                  <FormControlLabel
                    key={item._id}
                    value={item._id}
                    control={<Radio size="small" style={{ padding: '4px' }} />}
                    onChange={() => handleChangeSubs(item)}
                    label={item.name}
                  />
                ))}
              </RadioGroup>
            </>
          )}
          <Typography variant="button" className={classes.title}>
            <LocalOfferSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Giá
          </Typography>
          <RadioGroup>
            {priceOptions?.map((item, index) => (
              <FormControlLabel
                key={item.index}
                value={item.index}
                control={<Radio size="small" style={{ padding: '4px' }} />}
                onChange={() => handleChangePrice(item)}
                label={item.label}
              />
            ))}
          </RadioGroup>
          <Typography variant="button" className={classes.title}>
            <ThumbUpSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Đánh giá
          </Typography>
          <RadioGroup>
            {starOptions?.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.index}
                control={
                  <Box
                    display="flex"
                    alignItems="center"
                    width={200}
                    onClick={() => handleChangeStar(item)}
                  >
                    <Rating readOnly name="hover-feedback" value={item.value[0]} precision={0.5} />
                    <Box ml={2}>{item.label}</Box>
                  </Box>
                }
              />
            ))}
          </RadioGroup>
          <Typography variant="button" className={classes.title}>
            <PaletteSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Màu sắc
          </Typography>
          <RadioGroup className={classes.colorForm}>
            {colorOptions?.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={
                  <Radio
                    size="small"
                    icon={<Brightness1SharpIcon />}
                    checkedIcon={<CheckCircleSharpIcon />}
                    style={{
                      padding: '4px',
                      color: `${item.code}`,
                    }}
                  />
                }
                onChange={() => handleChangeColor(item)}
              />
            ))}
          </RadioGroup>

          {/* smart phone */}
          {category === '6139b459b9a9f76d315ecf58' && (
            <>
              <Typography variant="button" className={classes.title}>
                <ClassSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Loại điện
                thoại
              </Typography>
              <RadioGroup>
                {phoneType?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeType(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <AspectRatioSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Màn
                hình
              </Typography>
              <RadioGroup>
                {phoneSc?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeSc(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <PanoramaHorizontalSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} />{' '}
                RAM
              </Typography>
              <RadioGroup>
                {phoneRam?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeRam(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <CastConnectedSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Ổ
                cứng
              </Typography>
              <RadioGroup>
                {phoneRom?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeRom(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </>
          )}

          {/* laptop */}
          {category === '6142bff8d0c33220905c8bd2' && (
            <>
              <Typography variant="button" className={classes.title}>
                <HdrStrongSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Độ phần
                giải
              </Typography>
              <RadioGroup>
                {laptopRes?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeRes(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <BookmarkSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> CPU
              </Typography>
              <RadioGroup>
                {laptopCpu?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeCpu(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <AspectRatioSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Màn
                hình
              </Typography>
              <RadioGroup>
                {laptopSc?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeSc(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <PanoramaHorizontalSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} />{' '}
                RAM
              </Typography>
              <RadioGroup>
                {laptopRam?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeRam(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <CastConnectedSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Ổ
                cứng
              </Typography>
              <RadioGroup>
                {laptopRom?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeRom(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </>
          )}

          {/* tablet */}
          {category === '6142c006d0c33220905c8bd3' && (
            <>
              <Typography variant="button" className={classes.title}>
                <AspectRatioSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Màn
                hình
              </Typography>
              <RadioGroup>
                {tabletSc?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeSc(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <PanoramaHorizontalSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} />{' '}
                RAM
              </Typography>
              <RadioGroup>
                {tabletRam?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeRam(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <CastConnectedSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Ổ
                cứng
              </Typography>
              <RadioGroup>
                {tabletRom?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeRom(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </>
          )}

          {/* smart watch */}
          {category === '61376ecfa8d3c977efbcfa07' && (
            <>
              <Typography variant="button" className={classes.title}>
                <WcSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Đối tượng sử
                dụng
              </Typography>
              <RadioGroup>
                {watchSex?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeSex(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <FiberPinSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Thời
                lượng pin
              </Typography>
              <RadioGroup>
                {smWatchPin?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangePin(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <VideoLabelSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Hình
                dáng mặt
              </Typography>
              <RadioGroup>
                {smWatchFace?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeFace(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <FullscreenSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Đường
                kính mặt
              </Typography>
              <RadioGroup>
                {smWatchSc?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeSc(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </>
          )}

          {/* fashion watch */}
          {category === '61376edaa8d3c977efbcfa08' && (
            <>
              <Typography variant="button" className={classes.title}>
                <WcSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Đối tượng sử
                dụng
              </Typography>
              <RadioGroup>
                {watchSex?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeSex(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <Typography variant="button" className={classes.title}>
                <FullscreenSharpIcon fontSize="inherit" style={{ marginRight: '0.5rem' }} /> Đường
                kính mặt
              </Typography>
              <RadioGroup>
                {watchSc?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        style={{
                          padding: '4px',
                        }}
                      />
                    }
                    onChange={() => handleChangeSc(item)}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </>
          )}

          <Box m="1rem 0" sx={{ p: 3 }}>
            <Button
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={onResetFilter}
              startIcon={<ClearAllSharpIcon />}
            >
              Xóa tất cả
            </Button>
          </Box>
        </Paper>
        {dataSearch?.length > 0 ? (
          <>
            {/* <ProductFilterSidebar className={classes.filter} /> */}

            <div className={classes.listItems}>
              {loadingSearch ? (
                <div>
                  <Box m="1rem 0.5rem">
                    <Skeleton animation="pulse" variant="rect" height={40} width="60%" />
                  </Box>
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    {[...Array(8)].map((item, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Box m="0.5rem">
                          <Box mb={1}>
                            <Skeleton animation="pulse" variant="rect" height={250} width="100%" />
                          </Box>
                          <Box mb={1}>
                            <Skeleton animation="pulse" variant="rect" height={15} width="70%" />
                          </Box>
                          <Box mb={1}>
                            <Skeleton animation="pulse" variant="rect" height={15} width="50%" />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : (
                dataSearch?.length > 0 && (
                  <>
                    <AppBar position="static" className={classes.appBar}>
                      <AntTabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                        variant="scrollable"
                        scrollButtons="auto"
                      >
                        {sortOptions.map((c) => (
                          <AntTab key={c.label} label={c.label} />
                        ))}
                      </AntTabs>
                    </AppBar>

                    <>{showListProducts(dataSearch)}</>
                  </>
                )
              )}
            </div>
          </>
        ) : loadingSearch ? (
          <SimpleBackdrop />
        ) : (
          <Box m="1rem auto" textAlign="center">
            <ImageSearchIcon color="disabled" fontSize="large" />
            <Typography variant="body1" className={classes.titleSeeMore} gutterBottom>
              Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn...
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
}
