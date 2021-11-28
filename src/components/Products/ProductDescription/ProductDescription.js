import { Button, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AlertDialogSlide from 'components/UI/Modal/CustomModal';
import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import styles from './styles.module.css';
const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: '20px',
    margin: 'auto',
    padding: '20px 0',
    maxWidth: '750px',
  },
  wrapperDialog: {
    position: 'relative',
    marginBottom: '20px',
    margin: 'auto',
    padding: '20px 0',
    maxWidth: '685px',
  },
  content: { height: '450px', overflow: 'hidden', transition: '.3s' },
  bgContent: {
    background:
      'linear-gradient(to bottom,rgba(255 255 255/0),rgba(255 255 255/62.5),rgba(255 255 255/1))',
    bottom: '15px',
    height: '105px',
    left: '0',
    position: 'absolute',
    width: '100%',
  },
  btnShowContent: {
    position: 'relative',
    display: 'block',
    margin: 'auto',
  },
}));

const ProductDescription = ({ product }) => {
  const classes = useStyles();

  return (
    <Box m="0.5rem">
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Typography variant="h6">Mô tả sản phẩm</Typography>
          {product?.description ? (
            <div>{ReactHtmlParser(product?.description)}</div>
          ) : (
            <Box>
              <Typography variant="body1">
                Thương hiệu đồng hồ Aviator đại diện cho những người trẻ nhiệt huyết, mạnh mẽ và máu
                lửa. Thiết kế tinh xảo cùng với độ bền bỉ rất cao luôn là những ưu điểm nổi bật giúp
                thương hiệu Aviator chiếm một chỗ đứng quan trọng trong lòng những tín đồ yêu thích
                đồng hồ.
              </Typography>
              <Box m="0.5rem 0" color="primary.main" width="fit-content">
                <Link to="/" style={{ display: 'flex' }}>
                  <Typography variant="body1">See more</Typography>
                  <ChevronRightIcon />
                </Link>
              </Box>
              <iframe
                src="https://www.youtube.com/embed/k578BAHaZgE?start=115&amp;rel=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.thegioididong.com"
                frameBorder="0"
                title="This is a unique title"
                allowFullScreen=""
                data-gtm-yt-inspected-1070012_61="true"
                id="877687752"
                data-gtm-yt-inspected-1070012_79="true"
                className={styles.iframe}
              ></iframe>
              <Typography variant="h6">
                Mẫu đồng hồ này có thiết kế tinh tế, sang trọng và nam tính, phù hợp cho các quý ông
                lịch lãm, thanh lịch
              </Typography>
              <Typography variant="body1" gutterBottom>
                Đồng hồ nam Aviator AVW8517G352 là sản phẩm của hãng đồng hồ Aviator nổi tiếng, đến
                từ nước Nga.
              </Typography>
              <img
                alt="Đồng hồ nam Aviator AVW8517G352 có kiểu dáng thanh lịch"
                data-original="https://cdn.tgdd.vn/Products/Images/7264/209724/aviator-avw6971g352-nam-1-3.jpg"
                title="Đồng hồ nam Aviator AVW8517G352 có kiểu dáng thanh lịch"
                src="https://cdn.tgdd.vn/Products/Images/7264/209724/aviator-avw6971g352-nam-1-3.jpg"
                className={styles.iframe}
              ></img>
            </Box>
          )}
        </div>
        <div className={classes.bgContent}></div>
        <AlertDialogSlide
          title="Mô tả sản phẩm"
          component={
            <div className={classes.wrapperDialog}>
              <div>
                {product?.description ? (
                  <div>{ReactHtmlParser(product?.description)}</div>
                ) : (
                  <Box>
                    <Typography variant="body1">
                      Thương hiệu đồng hồ Aviator đại diện cho những người trẻ nhiệt huyết, mạnh mẽ
                      và máu lửa. Thiết kế tinh xảo cùng với độ bền bỉ rất cao luôn là những ưu điểm
                      nổi bật giúp thương hiệu Aviator chiếm một chỗ đứng quan trọng trong lòng
                      những tín đồ yêu thích đồng hồ.
                    </Typography>
                    <Box m="0.5rem 0" color="primary.main" width="fit-content">
                      <Link to="/" style={{ display: 'flex' }}>
                        <Typography variant="body1">See more</Typography>
                        <ChevronRightIcon />
                      </Link>
                    </Box>
                    <iframe
                      src="https://www.youtube.com/embed/k578BAHaZgE?start=115&amp;rel=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.thegioididong.com"
                      frameBorder="0"
                      title="This is a unique title"
                      allowFullScreen=""
                      data-gtm-yt-inspected-1070012_61="true"
                      id="877687752"
                      data-gtm-yt-inspected-1070012_79="true"
                      className={styles.iframe}
                    ></iframe>
                    <Typography variant="h6">
                      Mẫu đồng hồ này có thiết kế tinh tế, sang trọng và nam tính, phù hợp cho các
                      quý ông lịch lãm, thanh lịch
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Đồng hồ nam Aviator AVW8517G352 là sản phẩm của hãng đồng hồ Aviator nổi
                      tiếng, đến từ nước Nga.
                    </Typography>
                    <img
                      alt="Đồng hồ nam Aviator AVW8517G352 có kiểu dáng thanh lịch"
                      data-original="https://cdn.tgdd.vn/Products/Images/7264/209724/aviator-avw6971g352-nam-1-3.jpg"
                      title="Đồng hồ nam Aviator AVW8517G352 có kiểu dáng thanh lịch"
                      src="https://cdn.tgdd.vn/Products/Images/7264/209724/aviator-avw6971g352-nam-1-3.jpg"
                      className={styles.iframe}
                    ></img>
                  </Box>
                )}
              </div>
            </div>
          }
          disagreeButton={false}
          fullScreen
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            className={classes.btnShowContent}
          >
            Xem thêm
          </Button>
        </AlertDialogSlide>
      </div>
    </Box>
  );
};

export default ProductDescription;
