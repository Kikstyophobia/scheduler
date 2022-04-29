
export function getAppointmentsForDay(state, day) {
  let filteredAppointments = [];
  const foundDay = state.days.filter((d) => d.name === day)[0]

  if (state.days.length === 0 || foundDay === undefined) {
    return [];
  }
  
  foundDay.appointments.forEach((appointmentsId) => {
    filteredAppointments.push(state.appointments[appointmentsId])
    
  })

  return filteredAppointments;

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


  

