import * as React from 'react';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '../Button';
import MuiInput from '../Input';

import { addEmployee } from '../../..//api/addEmployee';
import { getEmployees } from '../../../api/getEmployees';
import { makeStyles } from '@material-ui/core/styles';

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
  const [success, setSuccess] = React.useState(false);
  const cc = useStyles();

  const handleClose = () => {
    setSuccess(false);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const addEmployeeRes = await addEmployee(values);

      if (addEmployeeRes.status === 200) {
        getEmployees().then((data) => setData(data));
      }
    } catch (err) {
      setSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(props) => {
          return (
            <Form onSubmit={props.handleSubmit}>
              <div className={cc.firstNameWrapper}>
                <MuiInput
                  id="firstname"
                  name="firstname"
                  value={props.values.firstname}
                  label="First Name"
                  onChange={props.handleChange}
                />
              </div>

              <div className={cc.lastNameWrapper}>
                <MuiInput
                  id="lastname"
                  name="lastname"
                  value={props.values.lastname}
                  label="Last Name"
                  onChange={props.handleChange}
                />
              </div>
              <div className={cc.salaryWrapper}>
                <MuiInput
                  id="salary"
                  name="salary"
                  value={props.values.salary}
                  label="Gross Salary"
                  onChange={props.handleChange}
                />
              </div>

              <div className={cc.buttonWrapper}>
                <Button isLoading={isLoading} type="submit">
                  Add
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          This employee already exists
        </MuiAlert>
      </Snackbar>
    </>
  );
};

const useStyles = makeStyles({
  firstNameWrapper: {
    padding: '20px 0px'
  },
  lastNameWrapper: {
    paddingBottom: 20
  },
  salaryWrapper: {
    paddingBottom: 20
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Roboto'
  }
});

export default AddEmployeeForm;
