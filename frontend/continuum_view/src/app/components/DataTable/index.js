import * as React from 'react';
import {
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody
} from '@material-ui/core';
import Paper from '@material-ui/core/paper';
import { makeStyles } from '@material-ui/core/styles';

// NOTE: render list of current employees
const DataTable = ({ data, stateTaxDeduction, netSalary }) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const cc = useStyles();

  return (
    <TableContainer
      classes={{
        root: cc.tableContainer
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 375 }}>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Gross Salary</TableCell>
            <TableCell>CA Income Tax</TableCell>
            <TableCell>Net Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.first_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.first_name} {row.last_name}
              </TableCell>
              <TableCell align="left">
                ${numberWithCommas(row.salary)}
              </TableCell>
              <TableCell align="left">
                ${numberWithCommas(stateTaxDeduction(row.salary).toFixed(2))}
              </TableCell>
              <TableCell align="left">
                ${numberWithCommas(netSalary(row.salary).toFixed(2))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles({
  tableContainer: {
    width: '100%',
    minWidth: 375,
    height: '100%'
  },

});

export default DataTable;
