import { Box, FormControl, InputLabel, Select, Typography } from '@material-ui/core';
import React from 'react';
import { statusOrder } from 'staticOptions';

const OrderUpdated = ({ order, handleStatusChange }) => {
  const translateToVn = (key) => {
    for (let i = 0; i < statusOrder.length; i++) {
      if (statusOrder[i].value === key) {
        return statusOrder[i].vn;
      }
    }
  };
  return (
    <div>
      <Box p="1rem 0">
        <Typography variant="h6">Cập nhật đơn hàng</Typography>
        <Box m="1rem 0" display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Trạng thái</Typography>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-age-native-simple">
              {translateToVn(order?.orderStatus)}
            </InputLabel>
            <Select
              native
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
              onChange={(e) => handleStatusChange(order?._id, e.target.value)}
              label="Trạng thái"
            >
              <option aria-label="None" value="" />
              <option value="Not Processed">Chưa thực hiện</option>
              <option value="Processing">Đang xử lý</option>
              <option value="Dispatched">Đang vận chuyển</option>
              <option value="Cancelled">Đã hủy</option>
              <option value="Completed">Hoàn thành</option>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
};

export default OrderUpdated;
