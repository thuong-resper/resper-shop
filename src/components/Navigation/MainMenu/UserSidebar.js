import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserSidebarItems } from './MainMenuData';

const useStyles = makeStyles((theme) => ({
  menu: {
    height: '100vh',
    width: '250px',
    borderRight: '1px solid #e6e6e6',
  },
  menuItems: {
    width: '100%',
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    color: '#637381',
    '&#active': {
      backgroundColor: '#ebf9f1',
      color: '#00ab55',
    },
    '&:hover': { backgroundColor: '#919eab14' },
  },
  icon: {
    display: 'grid',
    flex: '30%',
    placeItems: 'center',
  },
  title: {
    flex: '70%',
  },
}));

const UserSidebar = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.menu}>
        {UserSidebarItems.map((item, index) => {
          return (
            <Link
              key={index}
              id={window.location.pathname === item.link ? 'active' : ''}
              to={item.link}
              className={classes.menuItems}
            >
              <div className={classes.icon}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <div className={classes.title}>{item.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserSidebar;
