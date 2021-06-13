import React, { ReactElement, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Constants from '../Reducers/constants';
import {
  Avatar,
  createStyles,
  fade,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "../styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    search: {
      position: "relative",
      borderRadius: /* theme.shape.borderRadius */ "2vw",
      marginTop: "0.3vw",
      marginBottom: "0.3vw",
      backgroundColor: fade(theme.palette.common.white, 1),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.55),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "gray",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

export default function Header({}: Props): ReactElement {
  const [authorizedDisplay, setauthorizedDisplay] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [userSearchInput, setuserSearchInput] = useState('')
  const classes = useStyles();
  const book = useSelector((state :any)=> state.book)
  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [anchorElSearch, setAnchorElSearch] =
    React.useState<HTMLButtonElement | null>(null);
    
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  console.log(`user from header`, user)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClickSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSearch(event.currentTarget);
  };

  const handleCloseSearch = () => {
    setAnchorElSearch(null);
  };
  const openSearch = Boolean(anchorElSearch);
  const idSearch = openSearch ? "simple-popover" : undefined;

  let history = useHistory();
  const logout = () => {
    dispatch({ type: Constants.USER_LOGOUT });
    setauthorizedDisplay(false);
    history.push("/");
  };
  useEffect(
    () => {
       if (user.token != "") {
         setauthorizedDisplay(true);
         if(user.loggedInUser.role==='admin')
            setisAdmin(true)
          else
            setisAdmin(false)
       }
    },  [user.token] 
  );
  const userSearchOption = (userSearchOn: string) => {
    dispatch({type:Constants.SET_SEARCH_BY,payload:userSearchOn})
    setAnchorElSearch(null);
  };
  const userOption = (userSelectedOption: string) => {
    if (userSelectedOption === "myOrders") {
      history.push("/myOrders");
    } else if (userSelectedOption === "myCart") {
      history.push("/myCart");
    }
    else if (userSelectedOption === "addBook") {
      history.push("/admin-addBook");
    }
    // else if (userSelectedOption === "usersOrders") {
    //   history.push("/admin-usersOrders");
    // }
    setAnchorEl(null);
  };

  const searchInput=(e:any)=>{
    setuserSearchInput(e.target.value)
  }
  const checkIfEnter=(e:any)=>{
    if (e.charCode === 13) {
      dispatch({type:Constants.SET_SEARCH_INPUT,payload:userSearchInput})
    }
  }

  // useEffect(() => {
  //   setuserSearchInput('')
  // }, [book])

  return (
    <nav className="navbar navbar-expand-md navbar my-nav-bar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h6 className="navbar-brand-titleOne">Alpha Emporium</h6>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
          <div>
            <Button onClick={handleClickSearch} >
              <ExpandMoreRoundedIcon style={{ color: "#800020" }} />
            </Button>
            <Popover
              id={idSearch}
              open={openSearch}
              anchorEl={anchorElSearch}
              onClose={handleCloseSearch}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography
                style={{ cursor: "pointer" }}
                className={classes.typography}
                onClick={() => userSearchOption("title")}
              >
                Title
              </Typography>
              <Typography
                style={{ cursor: "pointer" }}
                className={classes.typography}
                onClick={() => userSearchOption("author")}
              >
                Author
              </Typography>
              <Typography
                style={{ cursor: "pointer" }}
                className={classes.typography}
                onClick={() => userSearchOption("rating")}
              >
                Rating
              </Typography>

              <Typography
                style={{ cursor: "pointer" }}
                className={classes.typography}
                onClick={() => userSearchOption("price")}
              >
                Price
              </Typography>
              <Typography
                style={{ cursor: "pointer" }}
                className={classes.typography}
                onClick={() => userSearchOption("tag")}
              >
                Tag
              </Typography>
              
            </Popover>
            </div>
            <div> <input className="form-control form-control-sm" type="text" onChange={searchInput} onKeyPress={checkIfEnter}></input></div>
         {authorizedDisplay?
         (!isAdmin ? 
          <div style={{ display: "inline-block",marginLeft:'24vw' }}>
         <Button onClick={handleClick}>
           <Avatar style={{ backgroundColor: "#800020" }}>{user.loggedInUser.name[0]}</Avatar>
         </Button>
         <Popover
           id={id}
           open={open}
           anchorEl={anchorEl}
           onClose={handleClose}
           anchorOrigin={{
             vertical: "bottom",
             horizontal: "center",
           }}
           transformOrigin={{
             vertical: "top",
             horizontal: "center",
           }}
         >
           <Typography
             style={{ cursor: "pointer" }}
             className={classes.typography}
             onClick={() => userOption("myOrders")}
           >
             My Orders
           </Typography>
           <Typography
             style={{ cursor: "pointer" }}
             className={classes.typography}
             onClick={() => userOption("myCart")}
           >
             My Cart
           </Typography>
           <Typography
             style={{ cursor: "pointer" }}
             className={classes.typography}
             onClick={logout}
           >
             Logout
           </Typography>
         </Popover>
       </div>:
          <div style={{ display: "inline-block",marginLeft:'24vw' }}>
          <Button onClick={handleClick}>
            <Avatar style={{ backgroundColor: "#800020" }}>{user.loggedInUser.name[0]}</Avatar>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography
              style={{ cursor: "pointer" }}
              className={classes.typography}
              onClick={() => userOption("addBook")}
            >
              Add Book
            </Typography>
            {/* <Typography
              style={{ cursor: "pointer" }}
              className={classes.typography}
              onClick={() => userOption("usersOrders")}
            >
              Users Orders
            </Typography> */}
            <Typography
              style={{ cursor: "pointer" }}
              className={classes.typography}
              onClick={logout}
            >
              Logout
            </Typography>
          </Popover>
        </div>
         )
        :
         <Link
         className="nav-link"
         to="/login"
         title="Sign In"
         style={{ color: "#800020", float: "right", marginLeft: "24vw" }}
       >
         <HowToRegIcon />
       </Link>
      
         }
         
      </div>
    </nav>
  );
}
