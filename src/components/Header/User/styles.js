import { makeStyles } from '@material-ui/core/styles';
import { green, purple, grey } from '@material-ui/core/colors';
export const useStyles = makeStyles((theme) => ({
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: '#65676b',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: '#65676b',
    backgroundColor: '#F2F3F5',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#65676b',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
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

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  iconSpacing: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
  spacing: {
    padding: '5px 10px 0 10px',
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
