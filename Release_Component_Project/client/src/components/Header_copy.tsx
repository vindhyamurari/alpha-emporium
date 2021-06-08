import React, { ReactElement ,useEffect,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { Avatar, createStyles, fade, InputAdornment, makeStyles, TextField, Theme } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import '../styles/Header.css'
import {useSelector,useDispatch} from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
interface Props {}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    search: {
      position: 'relative',
      borderRadius: /* theme.shape.borderRadius */'2vw',
      marginTop:'0.3vw',
      marginBottom:'0.3vw',
      backgroundColor: fade(theme.palette.common.white, 1),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.55),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'gray',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  },
  )
);



export default function Header({}: Props): ReactElement {
  const [authorizedDisplay, setauthorizedDisplay] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] =React.useState<HTMLButtonElement | null>(null);
  const [anchorElSearch, setAnchorElSearch] =React.useState<HTMLButtonElement | null>(null);
  const dispatch=useDispatch();
  const user=useSelector((state:any)=>state.user);
  const [userSearchInput, setuserSearchInput] = useState('');

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
    // console.log('in logout')
    // dispatch({ type: "USER_LOGGED_OUT" });
    // console.log('dispatch done')
    // setauthorizedDisplay(false);
    // history.push("/");
  };
  useEffect(() => {
    // if (state.token != "") {
    //   setauthorizedDisplay(true);
    // }
  },/*  [state.token] */);
  const userSearchOption =(userSearchOn:string)=>{
    console.log(userSearchOn);
    setAnchorElSearch(null);
  }
  const userOption=(userSelectedOption:string)=>{
    if(userSelectedOption==='myOrders'){
      history.push('/',{from:'myOrders'})
    }
    else if(userSelectedOption==='myCart'){
      history.push('/cart');
    }
    // else if(userSelectedOption==='myAnswers'){
    //   history.push('/myAnswers',{from:'myAnswers'});
    // }
    // else if(userSelectedOption==='myUpVotedQuestions'){
    //   history.push('/',{from:'myUpVotedQuestions'})
    // }
    // else if(userSelectedOption==='myUpVotedAnswers'){
    //   history.push('/myAnswers',{from:'myUpVotedAnswers'});
    // }
    setAnchorEl(null);
  }
  const searchEvent=(e:any)=>{
    setuserSearchInput(e.target.value);
  }

  return (
    <nav className="navbar navbar-expand-md navbar my-nav-bar">
        <Link to="/" style={{textDecoration:'none'}}><h6 className="navbar-brand-titleOne">Alpha Emporium</h6></Link>
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
          <div className="nav navbar-right">
           
             {/* <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            /> */}
          <TextField
        // className={classes.margin}
        id="input-with-icon-textfield"
        // label="Search"
        onChange={searchEvent}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div style={{display:'inline-block'}}>
                      <Button onClick={handleClickSearch}>
                      <ExpandMoreRoundedIcon style={{color:'#800020'}}/>
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
                        <Typography style={{cursor:'pointer'}} className={classes.typography} onClick={()=>userSearchOption('title')}>
                         Title
                        </Typography>
                        <Typography style={{cursor:'pointer'}} className={classes.typography} onClick={()=>userSearchOption('author')}>
                         Author
                        </Typography>
                        <Typography style={{cursor:'pointer'}} className={classes.typography} onClick={()=>userSearchOption('rating')}>
                         Rating 
                        </Typography>
                        <Typography style={{cursor:'pointer'}} className={classes.typography} onClick={()=>userSearchOption('category')}>
                         Category
                        </Typography>
                      </Popover>
                    </div>
            </InputAdornment>
          ),
        }}
      />
      {/* </div> */}
                    <Link className="nav-link" to="/login" title="Sign In" style={{color:'#800020',float:'right',marginLeft:'15vw'}}>
                    <HowToRegIcon/>
                    </Link>
            <div style={{display:'inline-block'}}>
                      <Button onClick={handleClick}>
                        <Avatar style={{backgroundColor:'#800020'}}>J</Avatar>
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
                        <Typography style={{cursor:'pointer'}} className={classes.typography} onClick={()=>userOption('myOrders')}>
                         My Orders
                        </Typography>
                        <Typography style={{cursor:'pointer'}} className={classes.typography} onClick={()=>userOption('myCart')}>
                         My Cart
                        </Typography>
                        <Typography style={{cursor:'pointer'}} className={classes.typography} onClick={logout}>
                         Logout
                        </Typography>
                      </Popover>
                    </div>
          </div>
        </div>
      </nav>
  );
}
