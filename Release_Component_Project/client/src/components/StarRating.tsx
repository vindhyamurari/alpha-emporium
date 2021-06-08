import React, { ReactElement, useEffect, useRef } from 'react'
import '../styles/StarRating.css'

interface Props {
    rating:number
}

export default function StarRating({rating}: Props): ReactElement {
let starRef = useRef<HTMLDivElement>(null)
let percentage=(rating/5) *100;
let width=`${percentage}%`
percentage=0;
useEffect(() => {
   starRef.current?.style.setProperty('width',width)
})
    return (
        <div  className="stars-background">
        <div ref={starRef} className="fa-stars"></div>
        </div>
    )
}
