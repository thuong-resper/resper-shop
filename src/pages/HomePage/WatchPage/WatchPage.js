import ProductCollections from 'components/Products/ProductCollections/ProductCollections';
import ProductListTopTen from 'components/Products/ProductListTopTen/ProductListTopTen';
import ProductListMan from 'components/Products/ProductPremium/ProductListMan';
import ProductListWoman from 'components/Products/ProductPremium/ProductListWoman';
import ProductPremium from 'components/Products/ProductPremium/ProductPremium';
import WatchNews from 'components/WatchNews/WatchNews';
import useWindowDimensions from 'hooks/useWindowDimensions';
import React from 'react';
import Banner from '../../../components/Products/ProductBanner/ProductBanner';
import ProductRoutes from '../../../components/Products/ProductKind/ProductRoutes';
import HomeMenu from '../HomeMenu';

const WatchPage = (props) => {
  const { width } = useWindowDimensions();

  return (
    <div>
      {width < 600 ? null : <HomeMenu i={4} />}
      <Banner />
      <ProductCollections />
      <ProductListTopTen />
      <ProductRoutes />
      <ProductPremium />
      <ProductListMan />
      <ProductListWoman />
      <WatchNews />
    </div>
  );
};

export default WatchPage;
