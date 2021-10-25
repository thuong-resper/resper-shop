import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
  },
  image: {
    backgroundImage:
      'url(https://res.cloudinary.com/dfxk0fqfp/image/upload/v1626085179/watchshopstorage/ae4c19104953739.5f6e14db3d440_cbdnuu.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  pageCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {},
  },
  paper: {
    maxWidth: theme.spacing(50),
    width: '100%',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
  },
  spacing: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  buttonProgress: {
    color: 'primary',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  iconEmail: {
    fontSize: '6rem',
    padding: '1rem',
    backgroundColor: '#3f51b514',
    borderRadius: '1rem',
  },
}));
