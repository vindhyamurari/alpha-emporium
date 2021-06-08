import React, { ReactElement, useState } from "react";
import { ReactComponent as RegisterImage } from "../Images/register.svg";
import {toast,ToastContainer} from 'react-toastify';
import {
  Button,
  createMuiTheme,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import { MyVerticallyCenteredModal } from "./Popup";
import { Link, useHistory } from "react-router-dom";
import '../styles/register.css'
import { pink } from "@material-ui/core/colors";
import UserServices from '../Services/user-services';

interface Props {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "20ch",
      },
    },
    myinput: {
      width: 100000,
    },
    button: {
      marginLeft: theme.spacing(2),
      backgroundColor:'#800020',
      color:'white',
      fontFamily:'Piazzolla'
    },
  })
);
export default function Register({}: Props): ReactElement {
  const classes = useStyles();
  const [passwordMatch, setpasswordMatch] = useState("");
  
  let history = useHistory();
  

  const apiCall=new UserServices();

  const [register, setregister] = useState({
    name:"",
    email: "",
    phone:"",
    // avatar:"",
    password: "",
    confirmpassword: "",
  });
 

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    let name = event.target?.name;
    if (name === "confirmpassword") {
      if (!(register.password === value)) {
        setpasswordMatch("Passwords does not Match");
      } else {
        setpasswordMatch("");
      }
    }
    setregister((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const delay = (time: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), time);
    });
  };

  const submitFormDetails = (e: any) => {
    e.preventDefault();
    let {name,email,phone,password}=register;
    let phoneNumber=`+91${phone}`;
    const userDetails={name,email,phoneNumber,password}
    console.log(`userDetails`, userDetails)
   apiCall.registerUser(userDetails)
   .then(async (returnValue)=>{
    toast.success("Registered Successfully !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    await delay(5000);
    history.push("/");
    })
   .catch(async (error)=>{
    if (error.response) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await delay(5000);
      history.push("/");
      return;
    }
    toast.error(error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    await delay(5000);
    history.push("/");
  })
   
  };
  return (
    <div>
      <div className="container main-registration-contain">
        <div className="row registration-container">
          <div className="col registration-form"><div >
          <RegisterImage className='registration-image'></RegisterImage>
              </div></div>
          <div className="col registration-form">
          <form onSubmit={submitFormDetails} className={classes.root}>
      <ThemeProvider
          theme={createMuiTheme({
            palette: {
              primary: pink,
            },
          })}
        >
            <div className="regi-from-inner">
            <p className="para" style={{ color: "#800020", marginLeft: "0vw" }}>
                   Already A User ? Please <Link to="/login" style={{ textDecoration:"none" ,color: "#51A7AD", marginLeft: "0vw" }}> Sign In </Link>
                  </p>
          <div>
         <TextField
            label="Name"
            placeholder="Enter Name "
            name="name"
            autoComplete="off"
            type="text"
            onChange={inputEvent}
            className={classes.myinput}
          /></div>
            <div>
         <TextField
            label="Email"
            placeholder="Enter email "
            name="email"
            autoComplete="off"
            type="email"
            required
            onChange={inputEvent}
            className={classes.myinput}
          /></div>
          <div>
         <TextField
            label="Phone"
            placeholder="Enter Phone "
            name="phone"
            autoComplete="off"
            type="text"
            onChange={inputEvent}
            className={classes.myinput}
          /></div>
          {/* <div>
         <TextField
            label="Avatar"
            placeholder="Enter Profile Image "
            name="avatar"
            autoComplete="off"
            type="text"
            onChange={inputEvent}
            className={classes.myinput}
          /></div> */}
          <div>
        <TextField
            label="Password"
            placeholder="Enter Password"
            name="password"
            autoComplete="off"
            type="password"
            required
             onChange={inputEvent}
             className={classes.myinput}
          /></div>
          <div>
        <TextField
            label="Confirm Password"
            placeholder="Retype Password"
            name="confirmpassword"
            autoComplete="off"
            type="password"
            required
             onChange={inputEvent}
             className={classes.myinput}

          /></div>
          <p style={{ color: "red", marginLeft: "0vw", marginTop: "0.5vw" }}>
            {passwordMatch}
          </p>
          <div style={{marginTop:'2vw',marginLeft:'1.3vw'}}>
          <Button
            variant="outlined"
            size="medium"
            className={classes.button}
            type="submit"
             >
            Register
          </Button>
          </div>
          </div>
          </ThemeProvider>
      </form>
      <ToastContainer />
          </div>
        </div>
      </div>
      </div>
  );
}
