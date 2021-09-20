# continuum_hr_prod

Full Stack Coding Challenge:

Create a simple, small HR web application written in Angular (or something similar) for the
front-end and Node.js for the backend. The data can be stored in whatever way you choose.

The application should allow you to enter employee names, salary information, deductions, and perform some calculations for their pay based on the information input.


# NOTES
- logout feature is not available, clear local storage in browser dev tools to "log out"

# Features
- user exists error is displayed if same username is used for "Create an account"
- creating a new user successfully will disaply a sucess toast
- incorrect password error displayed if wrong password used when logging in
- loading spinner on "create an account" and "log in" buttons. (if your internet speed is too fast, throttle through browser dev tools)
- adding employee with same name displays a error toast
- app will determine user's net salary based on amount entered. this is accomplished through gross salary - california percentage deducted based on gross
