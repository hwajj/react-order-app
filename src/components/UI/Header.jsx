import React from 'react';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = (props) => (
  <>
    <header className={classes.header}>
      <h1> 시스터즈 샌드위치</h1>
      <HeaderCartButton onShowCart={props.onShowCart} />
    </header>
    {/* <div className={classes.headerImage}>
      <img src={sandwitchesImage} alt='샌드위치 사진' />
    </div> */}
  </>
);

export default Header;
