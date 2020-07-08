import PropTypes from 'prop-types';
import React from 'react';

import DesktopContainer from '../components/menu/DesktopContainer';
import MobileContainer from '../components/menu/MobileContainer';
import HomepageHeading from '../components/homepage/HomepageHeading';

const ResponsiveContainer = ({ children, heading }) => (
  <div>
    <DesktopContainer heading={heading}>
      {HomepageHeading}
      {children}
    </DesktopContainer>
    <MobileContainer heading={heading}>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.node,
};

export default ResponsiveContainer;
