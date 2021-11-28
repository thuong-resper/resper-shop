import { Box } from '@material-ui/core';
import MainMenu from 'components/Navigation/MainMenu/MainMenu';
import WatchNews from 'components/WatchNews/WatchNews';
import HomeBanner from './Banner/HomeBanner';
import TopTenLaptop from './TopTen/Laptop';
import TopTenPhone from './TopTen/Phone';
import TopTenWatch from './TopTen/Watch';

const HomePage = (props) => {
  return (
    <div>
      <MainMenu />
      <HomeBanner />
      <Box m="0.5rem 0">
        <TopTenPhone />
      </Box>
      <Box m="0.5rem 0">
        <TopTenLaptop />
      </Box>
      <Box m="0.5rem 0">
        <TopTenWatch />
      </Box>
      <Box m="0.5rem 0">
        <WatchNews />
      </Box>
    </div>
  );
};

export default HomePage;
