import React, { ReactElement, useState } from "react";
import { ReactComponent as LoginImage } from "../Images/login.svg";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  createMuiTheme,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import CheckIcon from "@material-ui/icons/Check";
import { MyVerticallyCenteredModal } from "./Popup";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/login.css";
import UserServices from "../Services/user-services";

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
      backgroundColor: "#800020",
      color: "white",
      fontFamily: "Piazzolla",
    },
  })
);
export default function Login({}: Props): ReactElement {
  const classes = useStyles();

  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();
  const dispatch = useDispatch();

  const apiCall = new UserServices();

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    let name = event.target?.name;
    setlogin((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const delay = (time: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), time);
    });
  };
  const submitFormDetails = (e: any) => {
    e.preventDefault();
    apiCall
      .loginUser(login, dispatch)
      .then(async (returnValue) => {
        toast.success("Login Successful !", {
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
      .catch(async (error) => {
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
      });
  };

  return (
    <div>
      <div className="container main-login-contain" >
        <div className="row login-container">
          <div className="col login-form">
            <div>
              <LoginImage className="login-image"></LoginImage>
            </div>
          </div>
          <div className="col login-form">
            <form onSubmit={submitFormDetails} className={classes.root}>
              <ThemeProvider
                theme={createMuiTheme({
                  palette: {
                    primary: grey,
                  },
                })}
              >
                <div className="logi-from-inner">
                  <p style={{ color: "#800020", marginLeft: "0vw" }}>
                    Not A User ? Please{" "}
                    <Link
                      to="/register"
                      style={{
                        textDecoration: "none",
                        color: "#51A7AD",
                        marginLeft: "0vw",
                      }}
                    >
                      {" "}
                      Sign Up{" "}
                    </Link>
                  </p>
                  <div>
                    <TextField
                      label="Username"
                      placeholder="Enter email "
                      name="email"
                      autoComplete="off"
                      type="text"
                      required
                      onChange={inputEvent}
                      className={classes.myinput}
                    />
                  </div>
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
                    />
                  </div>
                  <div style={{ marginTop: "2vw", marginLeft: "3.5vw" }}>
                    <Button
                      variant="outlined"
                      size="medium"
                      className={classes.button}
                      // startIcon={<CheckIcon />}
                      type="submit"
                    >
                      Login
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
