import { Button } from '@material-ui/core';
import { Avatar, Chip, makeStyles, Typography } from '@material-ui/core';
import { Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  mainReply: {
    display: 'block',
    margin: '0.5rem 0',
    padding: '0.5rem',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
  },
  wrapper: { padding: '1rem' },
  d_flex: { display: 'flex', alignItems: 'center', marginBottom: '0.5rem' },
  item: { marginRight: 8 },
  smallAv: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  editBtn: { textAlign: 'right', marginTop: '0.5rem', position: 'relative' },
  textArea: {
    borderRadius: '0.5rem',
    '&:focus': { borderColor: '#3f51b5', boxShadow: 'none' },
    '&:hover': { borderColor: '#3f51b5' },
  },
}));
export default function FromReply({
  setReplyComment,
  socket,
  token,
  user,
  idUser,
  idProduct,
  idComment,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  // function
  const onFinishReplyComment = (value) => {
    if (token) {
      if (value) {
        socket.emit('userCreateComment', {
          id_product: idProduct,
          idComment: idComment,
          content: value.content.trim(),
          token: token,
          idUser: idUser,
          send: 'repLyComment',
        });
        setReplyComment(false);
      }
    } else {
      history.push('/login');
    }
  };

  return (
    <>
      <div className={classes.mainReply} id="main_reply">
        {user && (
          <div className={classes.d_flex}>
            <div className={classes.item}>
              <Avatar alt="resper" src={user.avatar} className={classes.smallAv} />
            </div>
            <div className={classes.item}>
              <Typography variant="subtitle2">{user.name}</Typography>
            </div>
            <div className={classes.item}>
              {user.role === 1 && <Chip color="primary" size="small" label="Quản trị viên" />}
            </div>
          </div>
        )}
        <Form form={form} onFinish={onFinishReplyComment}>
          <Form.Item name="content">
            <TextArea
              className={classes.textArea}
              placeholder="Mời bạn để lại bình luận"
              rows={4}
              max={20}
              maxLength={700}
            />
          </Form.Item>
          <div className={classes.editBtn}>
            <Button type="submit" size="small" color="primary">
              Lưu
            </Button>
            <Button size="small" color="secondary" onClick={() => setReplyComment(false)}>
              Hủy
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
