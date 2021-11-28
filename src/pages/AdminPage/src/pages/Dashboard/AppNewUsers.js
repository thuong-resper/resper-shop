import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fShortenNumber } from 'utils/formatNumber';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: '#04297a',
    backgroundColor: '#d0f2ff',
    borderRadius: '1rem',
  },
  iconWrapper: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
  },
  icon: {
    margin: 'auto auto 24px',
    display: 'flex',
    borderRadius: '50%',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    width: '64px',
    height: '64px',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
    color: '#0c53b7',
    backgroundImage:
      'linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)',
  },
}));

// ----------------------------------------------------------------------

const TOTAL = 1350000;

export default function AppNewUsers() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.iconWrapper}>
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faUserAlt} size="lg" />
        </div>
      </div>
      <Typography variant="h4" color="inherit">
        {fShortenNumber(TOTAL)}
      </Typography>
      <Typography variant="subtitle2" color="inherit" sx={{ opacity: 0.72 }}>
        New Users
      </Typography>
    </Card>
  );
}
