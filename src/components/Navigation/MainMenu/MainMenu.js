import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { mainMenuItems } from './MainMenuData';

const useStyles = makeStyles((theme) => ({
  menu: {
    marginBottom: '0.5rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#bbdefb',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      textAlign: 'center',
    },
  },
  menuItems: {
    color: '#000',
    lineHeight: '16px',
    display: 'flex',
    padding: '0 9px',
    height: '43px',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    margin: '0 1px',
    '&:hover': { backgroundColor: '#ffff' },
    '&#active': {
      backgroundColor: '#ffff',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '5rem',
    },
  },
  itemIcon: {
    padding: '0 10px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const MainMenu = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.menu}>
        {mainMenuItems.map((item, index) => {
          return (
            <Link
              key={index}
              id={window.location.pathname === item.link ? 'active' : ''}
              to={item.link}
              className={classes.menuItems}
            >
              <div className={classes.itemIcon}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <div>{item.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MainMenu;
