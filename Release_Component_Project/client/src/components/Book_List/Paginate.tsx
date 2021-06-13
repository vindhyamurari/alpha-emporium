import React, { ReactElement } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch} from 'react-redux';
import * as Constants from '../../Reducers/constants';
import '../../styles/paginate.css'

interface Props {
    booksPerPage:any,
    totalBooks:any
}

export default function Paginate({booksPerPage,totalBooks}: Props): ReactElement {

    let countOfPages=0
    for(let i=0;i<Math.ceil((totalBooks/booksPerPage));i++){
        countOfPages++;
    }
    const dispatch = useDispatch()

    const recordPageCount=(e:any,page: number)=>{
        dispatch({type:Constants.PAGE_NUMBER,payload:page});
    }

    return (
      <div className="pagination-holder">
        <Pagination className="pagination" count={countOfPages} color="secondary" onChange={recordPageCount} style={{marginBottom:'2vw'}}/>
      </div>
    );
  
}
