import * as React from 'react';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import Button from '../Button';
import MuiInput from '../Input';
import { addEmployee } from '../../..//api/addEmployee';
import { getEmployees } from '../../../api/getEmployees';

const initialValues = {
  firstname: '',
  lastname: ''
};

const validationSchema = object().shape({
  firstname: string().required('Firstname is a required field'),
  lastname: string().required('Lastname is a required field')
});

const AddEmployeeForm = ({ setData }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const addEmployeeRes = await addEmployee(values);

      if (addEmployeeRes.status === 200) {
        getEmployees().then((data) => setData(data));
      }
    } catch (err) {
      console.log('error AddEmployeeFOrm', err);
      // TODO: set a red snackbar toast employee already exists
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form onSubmit={props.handleSubmit}>
            <div>
              <MuiInput
                id="firstname"
                name="firstname"
                value={props.values.firstname}
                label="First Name"
                onChange={props.handleChange}
              />
            </div>

            <div>
              <MuiInput
                id="lastname"
                name="lastname"
                value={props.values.lastname}
                label="Last Name"
                onChange={props.handleChange}
              />
            </div>
            <div>
              <MuiInput
                id="salary"
                name="salary"
                value={props.values.salary}
                label="Gross Salary"
                onChange={props.handleChange}
              />
            </div>

            <div>
              <Button isLoading={isLoading} type="submit">
                submit
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEmployeeForm;
