import React from 'react'
import classes from './DetailCard.module.css';
const DetailCard = (props) => {
  return (
    <div className={classes.container}>
        <div>
            {props.icon}
        </div>
        <div>
            <h4>{props.text}</h4>
            <h2>{props.value}</h2>
        </div>
    </div>
  )
}

export default DetailCard