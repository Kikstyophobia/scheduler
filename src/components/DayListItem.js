import React from "react";
import 'components/DayListItem.scss';
import classNames from "classnames";


export default function DayListItem(props) {
  let returnVal = "";
  
  function formatSpots() {
    if (props.spots === 0) {
      returnVal = "no spots";
    } else if (props.spots === 1) {
      returnVal = "1 spot";
    } else {
      returnVal = `${props.spots} spots`; 
    }
    return returnVal;
  }


  const dayClass = classNames('day-list__item',
    {'day-list__item--selected':props.selected, 'day-list__item--full':!props.spots}
  )

  return (
    <li className={dayClass} onClick={()=> props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}