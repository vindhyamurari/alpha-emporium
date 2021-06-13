import React, { ReactElement } from 'react'
import {useSelector} from 'react-redux';

interface Props {
    
}

export default function Home({}: Props): ReactElement {
    const user=useSelector((state:any)=>state.user);
    return (
        <div>
            <h3>{user.token}</h3>
        </div>
    )
}
