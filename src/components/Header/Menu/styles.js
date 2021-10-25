import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
  title: {
    color: '#65676b',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer',
  },

  //drawer
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },

  // nested

  root_nested: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  top_16: {
    marginTop: 16,
  },
  btn: {
    textAlign: 'center',
    fontSize: 16,
    padding: '8px 0',
    borderRadius: 20,
    margin: 5,
    minWidth: 100,
    color: grey[50],
    backgroundColor: grey[900],
  },
  btn_lg: {
    border: '1px solid',
    color: grey[900],
    backgroundColor: grey[50],
  },

  button: {
    margin: theme.spacing(1),
    color: '#65676b',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));
