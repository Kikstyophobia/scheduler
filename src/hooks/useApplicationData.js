import { useState, useEffect } from 'react'
import axios from 'axios';


export default function useApplicationData() {
  const setDay = day => setState({...state, day})
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => (
        {...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
        
    })
  }, []);

  // calculates the amount of spots remaining
  function spotsRemaining(id, booked) {
    const isEditingInterview = !!state.appointments[id].interview && booked
    const copiedDays = [...state.days];
    const dayIndex = copiedDays.findIndex((appointment) => {
      return appointment.appointments.includes(id)
    })
    copiedDays[dayIndex].spots = isEditingInterview ? copiedDays[dayIndex].spots : (booked ? copiedDays[dayIndex].spots - 1 : copiedDays[dayIndex].spots + 1);
      setState((prev) => {
        return {...prev, days: copiedDays}
      })
  }
  // books and edits interviews
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }


    return axios.put(`/api/appointments/${id}`, {interview}) 
      .then(() => {
        setState((prev) => ({...prev, appointments}))
        spotsRemaining(id, true)
      })

  };

  // delete interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({...state, appointments})
        spotsRemaining(id, false)
      })
  };


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

};