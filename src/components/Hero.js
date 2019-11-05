import React from 'react';

const Hero = props => {
  const { children, hero } = props;

  return <header className={hero}>{children}</header>;
};

export default Hero;
