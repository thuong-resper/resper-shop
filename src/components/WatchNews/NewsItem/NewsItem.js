import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export const NewsItem = (props) => {
  return (
    <div className="news-item">
      <div style={{ padding: '0 0.75rem' }}>
        <Link to="#" className="guide">
          <div className="guide-div">
            <img
              src="https://cdn.tgdd.vn/Files/2021/10/12/1389798/cach-tra-cuu-tu-dien-tren-iphone-21_800x450-500x500.jpg"
              alt="f"
            ></img>
          </div>
          <h3>
            Cách tra cứu từ điển trên iPhone ngay tại thanh tìm kiếm nhanh (Spotlight) cực kỳ tiện
            lợi cho bạn
          </h3>
          <span>23 giờ trước</span>
        </Link>
      </div>
      <div style={{ padding: '0 0.75rem' }}>
        <Link to="#" className="guide">
          <div className="guide-div">
            <img
              src="https://cdn.tgdd.vn/Files/2021/10/12/1389643/thumb_1280x720-200x200.jpg"
              alt="f"
            ></img>
          </div>
          <h3>
            Vô vàn điện thoại Xiaomi đang có ưu đãi sốc, đáng sắm nhất tháng 10 này, trong đó có máy
            giảm thẳng tận 5 triệu đồng
          </h3>
          <span>23 giờ trước</span>
        </Link>
      </div>
      <div style={{ padding: '0 0.75rem' }}>
        <Link to="#" className="guide">
          <div className="guide-div">
            <img
              src="https://cdn.tgdd.vn/Files/2021/10/13/1390029/vivo-v21-5g-neon-spark-ra-mat_1280x720-200x200.jpg"
              alt="f"
            ></img>
          </div>
          <h3>
            Vivo V21 5G Neon Spark ra mắt: Màu sắc trẻ trung nổi bật cá tính, giá không đổi so với
            các phiên bản màu khác
          </h3>
          <span>23 giờ trước</span>
        </Link>
      </div>
      <div style={{ padding: '0 0.75rem' }}>
        <Link to="#" className="guide">
          <div className="guide-div">
            <img
              src="https://cdn.tgdd.vn/Files/2021/10/13/1389990/xiaomi-12-1_1280x720-200x200.jpg"
              alt="f"
            ></img>
          </div>
          <h3>
            Flagship Xiaomi 12 được đồn đoán sở hữu chip Snapdragon 898 chưa ra mắt, mặt lưng gốm và
            pin 5.000mAh
          </h3>
          <span>23 giờ trước</span>
        </Link>
      </div>
      <div style={{ padding: '0 0.75rem' }}>
        <Link to="#" className="guide">
          <div className="guide-div">
            <img
              src="https://cdn.tgdd.vn/Files/2021/10/12/1389752/note20cu-t10-1_1280x720-200x200.jpg"
              alt="f"
            ></img>
          </div>
          <h3>
            Galaxy Note 20 cũ giá đang rất hấp dẫn luôn, nghe đâu là rẻ hơn máy mới rất nhiều mà lại
            còn được giảm sốc nữa đó
          </h3>
          <span>23 giờ trước</span>
        </Link>
      </div>
      <div style={{ padding: '0 0.75rem' }}>
        <Link to="#" className="guide">
          <div className="guide-div">
            <img
              src="https://cdn.tgdd.vn/Files/2021/10/10/1389221/thumb_1280x720-200x200.jpg"
              alt="f"
            ></img>
          </div>
          <h3>
            Khám phá TOP 6 điện thoại Xiaomi 5G đáng sắm nhất 2021, MiFans sẽ ấn tượng với 3 chiếc
            điện thoại 5G mới nhất cho mà xem
          </h3>
          <span>23 giờ trước</span>
        </Link>
      </div>
      <div style={{ padding: '0 0.75rem' }}>
        <Link to="#" className="guide">
          <div className="guide-div">
            <img
              data-original="https://cdn.tgdd.vn/Files/2021/03/09/1333762/donghonukorlexks038-01_800x451-600x400.jpg"
              src="https://cdn.tgdd.vn/Files/2021/03/09/1333762/donghonukorlexks038-01_800x451-600x400.jpg"
              alt="f"
            ></img>
          </div>
          <h3>
            Bạn biết gì chưa? Đồng hồ Korlex thiết kế năng động, trẻ trung xả hàng đồng giảm đến 50%
            tất cả model đấy, tham khảo ngay
          </h3>
          <span>23 giờ trước</span>
        </Link>
      </div>
      <div style={{ padding: '0.75rem', float: 'right' }}>
        <Link to="#" className="viewall">
          See all watch news
        </Link>
      </div>
    </div>
  );
};
