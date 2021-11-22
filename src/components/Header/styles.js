import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
  header: { width: '100%', backgroundColor: '#e3f2fd' },
  wrap: {
    width: 1280,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  grow: {
    flexGrow: 1,
  },

  title: {
    color: '#65676b',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer',
  },
}));
