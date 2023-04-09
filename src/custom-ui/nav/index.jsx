import { NavLink } from 'react-router-dom';

import classes from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

export const Nav = ({ children }) => {
  return <ul className={cx('nav')}>{children}</ul>;
};

export const NavItem = ({ children, icon, ...props }) => {
  const Icon = icon;
  return (
    <li>
      <NavLink activeClassName="selected" {...props}>
        <div className={cx('nav-item')}>
          {icon && <Icon />}
          {children}
        </div>
      </NavLink>
    </li>
  );
};
