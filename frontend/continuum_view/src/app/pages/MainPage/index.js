import * as React from 'react';
import DataTable from '../../components/DataTable';
import AddEmployeeForm from '../../components/AddEmployeeForm';
import { getEmployees } from '../../../api/getEmployees';
import { makeStyles } from '@material-ui/core/styles';

const MainPage = () => {
  const [data, setData] = React.useState([]);
  const cc = useStyles();
  React.useEffect(() => {
    getEmployees().then((data) => setData(data));
  }, []);

  const stateTaxDeduction = (totalAmount) => {
    const parsedTotalAmount = Number(totalAmount);
    if (parsedTotalAmount > 0 && parsedTotalAmount <= 8932) {
      return (1 / 100) * totalAmount;
    } else if (parsedTotalAmount >= 8933 && parsedTotalAmount <= 21175) {
      return (2 / 100) * totalAmount;
    } else if (parsedTotalAmount >= 21176 && parsedTotalAmount <= 33421) {
      return (4 / 100) * totalAmount;
    } else if (parsedTotalAmount >= 33422 && parsedTotalAmount <= 46394) {
      return (6 / 100) * totalAmount;
    } else if (parsedTotalAmount >= 46395 && parsedTotalAmount <= 58634) {
      return (8 / 100) * totalAmount;
    } else if (parsedTotalAmount >= 58635 && parsedTotalAmount <= 299508) {
      return (9.3 / 100) * totalAmount;
    } else if (parsedTotalAmount >= 299509 && parsedTotalAmount <= 359407) {
      return (10.3 / 100) * totalAmount;
    }
  };

  const netSalary = (totalAmount) => {
    const parsedTotalAmount = Number(totalAmount);
    const deduction = stateTaxDeduction(totalAmount);
    const netSalary = parsedTotalAmount - deduction;
    return netSalary;
  };
  return (
    <div className={cc.mainPageContainer}>
      <div className={cc.addEmployeeFormWrapper}>
        <div className={cc.addEmployeeTitleWrapper}>Add new employee</div>
        <AddEmployeeForm setData={setData} />
      </div>
      <div className={cc.dataTableWrapper}>
        <DataTable
          data={data || []}
          stateTaxDeduction={stateTaxDeduction}
          netSalary={netSalary}
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  mainPageContainer: {
    // backgroundColor: 'rgba(209, 214, 209, 0.87)',
    // border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
    // height: '100%',
    width: '100%',
    height: '100vh',
    paddingTop: 20
  },
  addEmployeeFormWrapper: {
    padding: '20px 0px',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // margin: '20px 0px',
    border: '1px solid black',
    boxShadow: '10px 10px 8px #888888',
    borderRadius: '20px',
    minWidth: 360
  },
  addEmployeeTitleWrapper: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  dataTableWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    // margin: '20px 0px',
    // minWidth: 360,
    height: '100%'
  }
});

export default MainPage;
