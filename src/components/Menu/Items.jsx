import React from 'react';

import classes from './Items.module.css';
import menuList from './menuList';

const Items = () => (
  <div className={classes.items}>
    {menuList.map((menu) => (
      <li className={classes.content}>
        <div className={classes.photo}>
          <img src={menu.img} alt={menu.description} />
        </div>
        <div className={classes.overlay}>
          <h3 className={classes.description}>{menu.description}</h3>

          <div className={classes.itemInfo}>
            <button>-</button>
            <h3>{menu.price}</h3>
            <button>+</button>
          </div>
        </div>
      </li>
    ))}
  </div>
);

export default Items;
