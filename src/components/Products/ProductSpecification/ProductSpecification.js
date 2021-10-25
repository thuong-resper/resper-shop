import { Box, Typography, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import React from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import AlertDialogSlide from '../../UI/Modal/CustomModal';

const styles = {
  flexCenter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pd5: { padding: '0.5rem' },
  table: { minWidth: '30rem' },
  cellStyle: { width: '50%', padding: '1rem' },
};

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(attribute, value) {
  return { attribute, value };
}

const items = [
  createData('Face Diameter:', 159),
  createData('Face material:', 'Mineral'),
  createData('Frame material:', 'Stainless Steel'),
  createData('Face thickness:', 'Dày 9 mm'),
  createData('Wire material:', 'Leather'),
];

export default function ProductSpecification({ product }) {
  const { color, ram, rom, sc, res, cpu, pin, face } = product;

  const tableContent = (
    <TableBody>
      {color?.length > 0 && (
        <StyledTableRow>
          <TableCell component="th" scope="row" style={styles.cellStyle}>
            Màu sắc
          </TableCell>
          <TableCell align="left">{color.map((color) => color + ', ')}</TableCell>
        </StyledTableRow>
      )}
      {pin?.length > 0 && (
        <StyledTableRow>
          <TableCell component="th" scope="row" style={styles.cellStyle}>
            Thời lượng pin
          </TableCell>
          <TableCell align="left">{pin}&nbsp;giờ</TableCell>
        </StyledTableRow>
      )}
      {face?.length > 0 && (
        <StyledTableRow>
          <TableCell component="th" scope="row" style={styles.cellStyle}>
            Hình dáng mặt
          </TableCell>
          <TableCell align="left">{face}</TableCell>
        </StyledTableRow>
      )}
      {ram?.length > 0 && (
        <StyledTableRow>
          <TableCell component="th" scope="row" style={styles.cellStyle}>
            RAM
          </TableCell>
          <TableCell align="left">{ram}&nbsp;GB</TableCell>
        </StyledTableRow>
      )}
      {rom?.length > 0 && (
        <StyledTableRow>
          <TableCell component="th" scope="row" style={styles.cellStyle}>
            Bộ nhớ trong
          </TableCell>
          <TableCell align="left">{rom}&nbsp;GB</TableCell>
        </StyledTableRow>
      )}
      {sc?.length > 0 && (
        <StyledTableRow>
          <TableCell component="th" scope="row" style={styles.cellStyle}>
            Màn hình
          </TableCell>
          <TableCell align="left">{sc}&nbsp;inch</TableCell>
        </StyledTableRow>
      )}
      {res?.length > 0 && (
        <StyledTableRow>
          <TableCell component="th" scope="row" style={styles.cellStyle}>
            Độ phân giải
          </TableCell>
          <TableCell align="left">{res}</TableCell>
        </StyledTableRow>
      )}
      {cpu?.length > 0 && (
        <StyledTableRow>
          <TableCell component="th" scope="row" style={styles.cellStyle}>
            CPU
          </TableCell>
          <TableCell align="left">{cpu}</TableCell>
        </StyledTableRow>
      )}
    </TableBody>
  );
  const { width } = useWindowDimensions();
  return (
    <Box m="0 0.5rem">
      <Box style={styles.flexCenter}>
        <Typography variant="h5">Thông số kỹ thuật</Typography>

        <AlertDialogSlide
          title="Thông số kỹ thuật"
          iconAnchor={<MoreVertRoundedIcon />}
          component={
            <Box>
              <TableContainer>
                <Table style={width > 600 ? styles.table : null} aria-label="simple table">
                  {tableContent}
                </Table>
              </TableContainer>
            </Box>
          }
          disagreeButton={false}
          fullScreen={width <= 768 ? true : false}
        />
      </Box>

      <TableContainer>
        <Table aria-label="simple table">{tableContent}</Table>
      </TableContainer>

      <Box m="1rem 0"></Box>
    </Box>
  );
}
