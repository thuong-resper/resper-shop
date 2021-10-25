import ProductCollections from 'components/Products/ProductCollections/ProductCollections';
import ProductListTopTen from 'components/Products/ProductListTopTen/ProductListTopTen';
import ProductListMan from 'components/Products/ProductPremium/ProductListMan';
import ProductListWoman from 'components/Products/ProductPremium/ProductListWoman';
import ProductPremium from 'components/Products/ProductPremium/ProductPremium';
import { UserContext } from 'contexts/UserContext';
import React, { useContext, useEffect } from 'react';
import Banner from '../../components/Products/ProductBanner/ProductBanner';
import ProductRoutes from '../../components/Products/ProductKind/ProductRoutes';
import './styles.css';

const WatchPage = (props) => {
  const state = useContext(UserContext);
  console.log(state);

  useEffect(() => {
    // actionGetTopFashion();
    // actionGetPremiumProducts();
  }, []);

  return (
    <div>
      <ProductListTopTen />
      {/* <Banner />
      <ProductRoutes />
    
      <ProductPremium />
      <ProductCollections />
      <ProductListMan />
      <ProductListWoman /> */}
      {/* watch news*/}
      <div className="top-15"></div>
    </div>
  );
};

export default WatchPage;
