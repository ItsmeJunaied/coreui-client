import React from 'react';
import HomeHeader from './layouts/HomeHeader';
import HomeFeatures from './layouts/HomeFeatures';
import HomeProduct from './layouts/HomeProduct';
import HomeThemes from './layouts/HomeThemes';
import HomeFooter from './layouts/HomeFooter';
import Carousels from '../views/base/carousels/Carousels'

const Home = () => {
  return (
    <div>
      <HomeHeader isAuthenticated={false} />
      <Carousels />
      <HomeFeatures />
      <HomeProduct />
      <HomeThemes />
      <HomeFooter />
    </div>
  )
}

export default Home;
