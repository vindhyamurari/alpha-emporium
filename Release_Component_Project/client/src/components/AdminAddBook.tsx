import React, { ReactElement,useState } from 'react'
import { Button, createMuiTheme, createStyles, Fab, makeStyles, TextField, Theme, ThemeProvider } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save' 
import { pink } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import '../styles/adminAddBook.css'
import BookServices from '../Services/book-services';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '20ch',
      },
    },
  myinput:{
    width:100000
},
button: {
    marginLeft: theme.spacing(2),
  },

  }),
  
);
interface Props {
    
}

export default function AdminAddBook({}: Props): ReactElement {
    const classes = useStyles();
    const bookServices=new BookServices();
    const user = useSelector((state:any )=> state.user)
    const history=useHistory();
    const [book, setbook] = useState<any>(
        {
            title:'',
            author:'',
            price:0,
            pages:'',
            tags:[],
            cover:'',
            authorImage:''
        })
        const [eachTag, seteachTag] = useState<any>("")
        const multipleTags = () => {
            if (eachTag !== "") {
              setbook({
                ...book,
                tags: [...book.tags, eachTag],
              });
              seteachTag("");
            }
          };
          const removeTags=(item:string)=>{
              let newtags=book.tags;
              newtags=newtags.filter((i:string)=>i!==item)
               setbook({...book,tags:newtags})
          }
        const inputEvent = (event: any) => {
            let value = event.target?.value;
            let name = event.target?.name;
            if (name === "eachTag") {
                seteachTag(value);
              } else  setbook((prevValue:any) => ({ ...prevValue, [name]: value }));
           
          };
        
        const submitFormDetails=(e:any)=>{
            e.preventDefault();
            bookServices.adminAddBook(book,user.token)
                .then((res:any)=>{
                    console.log('book added')
                    history.push('/')
                })
                .catch((err)=>{
                    console.log(err.message)
                })

        }
    return (
        <>
            <div>
            <form onSubmit={submitFormDetails} className={classes.root}>
         <ThemeProvider
          theme={createMuiTheme({
            palette: {
              primary: pink,
            },
          })}
        >
            <div className="add-book-from-inner">
            <div>
         <TextField
            label="Title"
            placeholder="Enter title "
            name="title"
            autoComplete="off"
            type="text"
            required
            onChange={inputEvent}
            className={classes.myinput}
          /></div>
          <div>
         <TextField
            label="author"
            placeholder="Enter author "
            name="author"
            autoComplete="off"
            type="text"
            onChange={inputEvent}
            className={classes.myinput}
          /></div>
            <div>
         <TextField
            label="Price"
            placeholder="Enter price "
            name="price"
            autoComplete="off"
            type="number"
            required
            onChange={inputEvent}
            className={classes.myinput}
          /></div>
          <div>
         <TextField
            label="Pages"
            placeholder="Enter pages "
            name="pages"
            autoComplete="off"
            type="text"
            onChange={inputEvent}
            className={classes.myinput}
          /></div>
          <div>
         <TextField
            label="Cover"
            placeholder="Enter Book Image "
            name="cover"
            autoComplete="off"
            type="text"
            onChange={inputEvent}
            className={classes.myinput}
          /></div>
          <div>
        <TextField
            label="Author Image"
            placeholder="Enter Author Image"
            name="authorImage"
            autoComplete="off"
            type="text"
            required
             onChange={inputEvent}
             className={classes.myinput}
          /></div>
          <div >
              <TextField
                label="Tags"
                placeholder="Enter tags"
                autoComplete="off"
                type="text"
                name="eachTag"
                onChange={inputEvent}
                value={eachTag}
              />
              <Fab
                size="small"
                aria-label="add"
                onClick={multipleTags}
                style={{ marginTop: "2vw" }}
              >
                <AddIcon />
              </Fab>
              <ul style={{listStyleType:'none'}}>
                {book.tags.map((item:any)=><div className="category-items-list">
                  <li style={{display:'inline-block'}}>{item}</li>
                  <i style={{display:'inline-block',marginLeft:'0.3vw'}} onClick={()=>removeTags(item)} className="fa fa-times" aria-hidden="true"></i>
                  </div>
                )}
              </ul>
            </div>
          <div style={{marginTop:'0.2vw',marginLeft:'1.3vw'}}>
          <Button
            variant="outlined"
            size="medium"
            className={classes.button}
            startIcon={<SaveIcon />}
            type="submit"
             >
            Add Book
          </Button>
          </div>
          </div>
          </ThemeProvider>
      </form>
            </div>
        </>
    )
}
