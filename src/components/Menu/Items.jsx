import React from 'react';
import Item from './Item';
import classes from './Items.module.css';
import menuList from './menuList';

const Items = ({ items, onIncrease }) => {
  return (
    <div className={classes.items}>
      {menuList.map((menu) => (
        <Item
          key={menu.id}
          name={menu.name}
          price={menu.price}
          menu={menu}
          onIncrease={onIncrease}
          items={items}
        />
      ))}
    </div>
  );
};

export default React.memo(Items);
