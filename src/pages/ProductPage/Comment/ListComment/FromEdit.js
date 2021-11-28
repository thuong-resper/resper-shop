import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Form, Input } from 'antd';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  mainEdit: { margin: '0.5rem 0' },
  editBtn: { textAlign: 'right', marginTop: '0.5rem', position: 'relative' },
  textArea: {
    borderRadius: '0.5rem',
    '&:focus': { borderColor: '#3f51b5', boxShadow: 'none' },
    '&:hover': { borderColor: '#3f51b5' },
  },
  rating: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  root: { width: 200, display: 'flex', alignItems: 'center' },
}));

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export default function FromEdit({
  item,
  startOldEdit,
  start,
  setStart,
  token,
  socket,
  idUser,
  idComment,
  idProduct,
  setIsForm,
}) {
  const classes = useStyles();
  const [hoverEdit, setHoverEdit] = useState(-1);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  // create  state
  const [loadingSubmitCmt, setLoadingSubmitCmt] = useState(false);
  const [content, setContent] = useState('');
  // function
  const cancelFromEdit = () => {
    setIsForm(false);
    setContent('');
  };

  const onChangeTextArea = (e) => {
    setContent(e.target.value);
  };
  const onFinish = () => {
    try {
      if (content || startOldEdit !== start) {
        socket.emit('userUpdateComment', {
          _id: idComment,
          content: content,
          start: start,
          token: token,
          idUser: idUser,
          idProduct: idProduct,
        });
        setTimeout(() => {
          setIsForm(false);
          setLoadingSubmitCmt(false);
          setContent('');
        }, 500);
      } else {
        setIsForm(false);
        setLoadingSubmitCmt(false);
      }
    } catch (error) {}
  };
  return (
    <div className={classes.mainEdit} id="main_edit">
      <Form form={form} onFinish={onFinish}>
        {item.start > 0 && (
          <Box component="fieldset" className={classes.root}>
            <Rating
              name="size-medium"
              value={start}
              size="large"
              onChange={(e, newValue) => {
                setStart(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHoverEdit(newHover);
              }}
            />
            {start !== null && <Box ml={2}>{labels[hoverEdit !== -1 ? hoverEdit : start]}</Box>}
          </Box>
        )}
        <TextArea
          name="content"
          className={classes.textArea}
          placeholder="Mời bạn để lại bình luận"
          rows={4}
          max={20}
          defaultValue={item.content}
          onChange={onChangeTextArea}
          maxLength={700}
        />
        <div className={classes.editBtn}>
          <Button
            type="submit"
            size="small"
            color="primary"
            onClick={() => {
              setLoadingSubmitCmt(true);
            }}
            disabled={content.trim().length >= 1 ? false : true}
          >
            Lưu
          </Button>
          {loadingSubmitCmt && <CircularProgress size={12} />}
          <Button size="small" color="secondary" onClick={cancelFromEdit}>
            Hủy
          </Button>
        </div>
      </Form>
    </div>
  );
}
