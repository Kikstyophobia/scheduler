import InterviewerList from 'components/InterviewerList';
import {React, useState} from 'react';


export function getAppointmentsForDay(state, day) {
  let objDays = state.days;
  let objAppointments = state.appointments;

  let dayArray = objDays.filter((obj) => 
    obj.name === day
  )

  if (dayArray.length === 0) {
    return [];
  }
  
  let interviewArray = dayArray[0].appointments
    .map(num => {
      return objAppointments[num]
    }) 

  return interviewArray
}


export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }

  let interviewerObj = {...interview, interviewer: state.interviewers[interview.interviewer] };

  return interviewerObj;
}


export function getInterviewersForDay(state, day) {
  let objDays = state.days;

  let dayArray = objDays.filter((obj) => 
    obj.name === day
  )

  if (dayArray.length === 0) {
    return [];
  }
  
  let interviewArray = dayArray[0].interviewers
    .map(num => {
      return state.interviewers[num]
    }) 

  return interviewArray
}


  

