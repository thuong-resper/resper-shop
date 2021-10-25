import { CircularProgress } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
// --Components
import ListItemComment from './ListItemComment';
// --CSS

const useStyles = makeStyles((theme) => ({
  groupComment: {
    overflow: 'hidden',
    boxShadow: '0 1px 6px rgb(239 233 242)',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    background: '#fff',
    borderRadius: '8px',
    position: 'relative',
    display: 'block',
    paddingBottom: '20px',
    '@media (max-width: 600px)': {
      margin: 0,
      border: 'none',
    },
  },
  groupLength: {
    margin: '0 0.5rem',
    display: 'flex',
    alignItems: 'center',
    '& p': { paddingLeft: '0.5rem', fontSize: '14px' },
  },
  btnMore: { textAlign: 'center' },
}));

export default function ListComment({
  dataComment,
  onChangePageComment,
  token,
  id_user,
  user,
  idProduct,
  socket,
  lengthComment,
  actionCheckDeleteCmt,
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [dataComment.length]);
  return (
    <>
      <p id="waitWriteComment" />
      {dataComment.length > 0 && (
        <div className={classes.groupComment}>
          <div className={classes.groupLength}>
            <Typography variant="h6">Khách Hàng Nhận Xét</Typography>
            <p>
              {dataComment.length} /{lengthComment} bình luận
            </p>
          </div>
          <ListItemComment
            dataComment={dataComment}
            token={token}
            socket={socket}
            idUser={id_user}
            user={user}
            idProduct={idProduct}
            actionCheckDeleteCmt={actionCheckDeleteCmt}
          />
          {loading && (
            <Box m="auto" width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          )}
          {!loading && dataComment.length < lengthComment && (
            <Box m="auto" width="100%" textAlign="center">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className={classes.btnMore}
                onClick={() => {
                  setLoading(true);
                  onChangePageComment(1);
                }}
              >
                Tải Thêm
              </Button>
            </Box>
          )}
        </div>
      )}
    </>
  );
}
