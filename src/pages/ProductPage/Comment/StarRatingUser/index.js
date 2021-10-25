import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarRateIcon from '@material-ui/icons/StarRate';
import { Rating } from '@material-ui/lab';
import { Progress } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';
export default function StarRatingUser({ starRating, sumStarRating, nameProduct, reviewRating }) {
  const { oneStars, twoStars, threeStars, fourStars, fiveStars } = starRating;
  console.log(reviewRating);
  return (
    <>
      <div className="box-border">
        <div className="rating">
          <p className="rating__title">Đánh giá {nameProduct}</p>
          <div className="rating-star left">
            <div className="rating-left">
              <div className="rating-top">
                <p className="point">{reviewRating.toFixed(1)}</p>
                <Rating
                  name="half-rating-read"
                  defaultValue={reviewRating}
                  precision={0.5}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  readOnly
                  className="rating-item"
                />
                <Link to="/rating">
                  <p>{sumStarRating} đánh giá</p>
                </Link>
              </div>
              <div className="control-start-rating">
                <div className="items-start-rating">
                  <div className="control-start">
                    <p>1</p>
                    <StarRateIcon style={{ color: '#fed330' }} />
                  </div>
                  <Progress
                    percent={((oneStars / sumStarRating) * 100).toFixed(1)}
                    size="small"
                    strokeColor={{
                      from: '#f25800',
                      to: '#ff7d26',
                    }}
                    status="active"
                  />
                </div>
                <div className="items-start-rating">
                  <div className="control-start">
                    <p>2</p>
                    <StarRateIcon style={{ color: '#fed330' }} />
                  </div>
                  <Progress
                    percent={((twoStars / sumStarRating) * 100).toFixed(1)}
                    size="small"
                    strokeColor={{
                      from: '#f25800',
                      to: '#ff7d26',
                    }}
                    status="active"
                  />
                </div>
                <div className="items-start-rating">
                  <div className="control-start">
                    <p>3</p>
                    <StarRateIcon style={{ color: '#fed330' }} />
                  </div>
                  <Progress
                    percent={((threeStars / sumStarRating) * 100).toFixed(1)}
                    size="small"
                    strokeColor={{
                      from: '#f25800',
                      to: '#ff7d26',
                    }}
                    status="active"
                  />
                </div>
                <div className="items-start-rating">
                  <div className="control-start">
                    <p>4</p>
                    <StarRateIcon style={{ color: '#fed330' }} />
                  </div>
                  <Progress
                    percent={((fourStars / sumStarRating) * 100).toFixed(1)}
                    size="small"
                    strokeColor={{
                      from: '#f25800',
                      to: '#ff7d26',
                    }}
                    status="active"
                  />
                </div>
                <div className="items-start-rating">
                  <div className="control-start">
                    <p>5</p>
                    <StarRateIcon style={{ color: '#fed330' }} />
                  </div>
                  <Progress
                    percent={((fiveStars / sumStarRating) * 100).toFixed(1)}
                    size="small"
                    strokeColor={{
                      from: '#f25800',
                      to: '#ff7d26',
                    }}
                    status="active"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
