import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
// const EDIT = "EDIT";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview) 
      .then(() => {
        transition(SHOW);
      })
  }


  function deleteInterview(name, interviewer) {
    const interview = {
      student: name, 
      interviewer
    };

    transition(DELETING);
    props.cancelInterview(props.id, interview)
      .then(() =>  {
        transition(EMPTY);
      })
  }

  
  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />
      { mode === EMPTY && <Empty onAdd={() => {(transition(CREATE))}} /> }
      { mode === SAVING && <Status message={'Saving'} />}
      { mode === DELETING && <Status message={'Deleting'} />}
      { mode === CONFIRM && <Confirm onConfirm={deleteInterview} onCancel={() => {transition(SHOW)}}/>}
      {/* { mode === EDIT && 
        <Form 
          value={props.value}
          student={props.student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onChange={props.onChange}
          onClick={() => {back()}}
          onSave={save}
        /> } */}
      { mode === CREATE &&
        <Form 
          value={props.value}
          student={props.student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onChange={props.onChange}
          onClick={() => {back()}}
          onSave={save}
        />
      }
      { mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          // onEdit={() => {transition(EDIT)}}
        />
      )}
    </article>
  )
}