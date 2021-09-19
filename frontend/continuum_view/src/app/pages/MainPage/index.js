import * as React from 'react';
import DataTable from '../../components/DataTable';
import AddEmployeeForm from '../../components/AddEmployeeForm';
import { getEmployees } from '../../../api/getEmployees';

const MainPage = () => {
  const [data, setData] = React.useState([]);
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
    <div>
      <div>
        <AddEmployeeForm setData={setData} />
      </div>
      <div>
        <DataTable
          data={data || []}
          stateTaxDeduction={stateTaxDeduction}
          netSalary={netSalary}
        />
      </div>
    </div>
  );
};

export default MainPage;
