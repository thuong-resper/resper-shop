import { notification } from 'antd';

export const CustomizeNotification =
  (type) =>
  ({ message, description }) => {
    notification[type].open({
      message: message,
      description: description,
      placement: 'bottomRight',
      style: {
        width: 600,
      },
    });
  };
