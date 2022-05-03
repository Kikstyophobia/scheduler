import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  
  
  const listItems = props.days.map(day => {
    console.log("props",day.spots);
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    )
  })


  return( 
    <ul> 
      {listItems}
    </ul> 
  )
}
