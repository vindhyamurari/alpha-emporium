import React, { ReactElement, useState } from "react";
import { ReactComponent as RegisterImage } from "../Images/register.svg";
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
import {useSelector} from 'react-redux';
import UserServices from '../Services/user-services';
import { error } from "console";

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
  const [modalShow, setModalShow] = React.useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [passwordMatch, setpasswordMatch] = useState("");
  
  let history = useHistory();
  const user=useSelector((state:any)=>state.user);

  const apiCall=new UserServices();

  const [register, setregister] = useState({
    name:"",
    email: "",
    phone:"",
    avatar:"",
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

  const submitFormDetails = (e: any) => {
    e.preventDefault();
    let {name,email,avatar,phone,password}=register;
    phone=`+91${phone}`;
    const userDetails={name,email,avatar,phone,password}
   apiCall.registerUser(userDetails)
   .then((returnValue)=>{console.log('user Registered',returnValue);history.push('/')})
   .catch((error)=>{setModalShow(true);
    if (error.response) {
      setmodalMessage(error.response.data.message);
      return;
    }
    setmodalMessage(error.message);
  })
   
  };
  return (
      <div className="container" style={{marginLeft:'15vw'}}>
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
            <p style={{ color: "#800020", marginLeft: "0vw" }}>
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
          <div>
         <TextField
            label="Avatar"
            placeholder="Enter Profile Image "
            name="avatar"
            autoComplete="off"
            type="text"
            onChange={inputEvent}
            className={classes.myinput}
          /></div>
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
          </div>
        </div>
      </div>
  );
}
