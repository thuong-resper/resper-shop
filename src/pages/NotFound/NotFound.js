import { Box, Button, Container, Typography } from '@material-ui/core';

const NotFound = () => (
  <>
    <title>404 | Material Kit</title>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h6">
          It looks like something is missing!
        </Typography>
        <Box
          sx={{
            textAlign: 'center',
          }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <img
            alt="Under development"
            src="/images/static/undraw_page_not_found_su7k.svg"
            style={{
              margin: '20px 0',
              display: 'inline-block',
              maxWidth: '100%',
              width: 560,
            }}
          />
        </Box>
        <Box
          sx={{
            textAlign: 'center',
          }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            onClick={() => {
              window.history.back();
            }}
            variant="contained"
            color="primary"
          >
            Go Back
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
