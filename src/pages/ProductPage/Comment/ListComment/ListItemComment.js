import { Chip, makeStyles } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ItemComment from './ItemComment';

const useStyles = makeStyles((theme) => ({
  comment: {
    margin: '0 0.5rem',
    '@media (max-width: 600px)': {
      margin: 0,
    },
  },
}));

export default function ListItemComment({
  dataComment,
  token,
  socket,
  idUser,
  user,
  idProduct,
  actionCheckDeleteCmt,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [idComment, setIdComment] = useState('');
  const [replyComment, setReplyComment] = useState(false);
  const [isForm, setIsForm] = useState(false);

  const openFromReply = (_id) => {
    if (token) {
      setReplyComment(true);
      setIsForm(false);
      setIdComment(_id);
      setTimeout(() => {
        document.querySelector('#main_reply').scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    } else {
      history.push('/login');
    }
  };
  return (
    <div className={classes.comment}>
      {dataComment.map((item, index) => (
        <ItemComment
          key={index}
          item={item}
          token={token}
          socket={socket}
          idUser={idUser}
          user={user}
          idProduct={idProduct}
          actionCheckDeleteCmt={actionCheckDeleteCmt}
          replyComment={replyComment}
          setReplyComment={setReplyComment}
          idComment={idComment}
          setIdComment={setIdComment}
          isForm={isForm}
          setIsForm={setIsForm}
        >
          <Chip
            variant="outlined"
            size="small"
            icon={<ReplyIcon />}
            label="Trả lời"
            onClick={() => openFromReply(item._id)}
          />
          {item.reply.map((rl, index) => (
            <ItemComment
              key={index}
              item={rl}
              token={token}
              socket={socket}
              idUser={idUser}
              user={user}
              idProduct={idProduct}
              actionCheckDeleteCmt={actionCheckDeleteCmt}
              replyComment={replyComment}
              setReplyComment={setReplyComment}
              idComment={idComment}
              setIdComment={setIdComment}
              isForm={isForm}
              setIsForm={setIsForm}
            >
              <Chip
                variant="outlined"
                size="small"
                icon={<ReplyIcon />}
                label="Trả lời"
                onClick={() => openFromReply(item._id)}
              />
            </ItemComment>
          ))}
        </ItemComment>
      ))}
    </div>
  );
}
