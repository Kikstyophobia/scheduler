import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";



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
      .catch(() => {
        transition(ERROR_SAVE, true);
      })

  }


  function deleteInterview(name, interviewer) {
    const interview = {
      student: name, 
      interviewer
    };

    transition(DELETING, true);
    props.cancelInterview(props.id, interview)
      .then(() =>  {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      })
  }

  // if (props.interview) {
  //   console.log("this is what we want", props.interview.interviewer);

  // }

  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />
      { mode === EMPTY && <Empty onAdd={() => {(transition(CREATE))}} /> }
      { mode === SAVING && <Status message={'Saving'} />}
      { mode === ERROR_SAVE && <Error message={'Could not save appointment.'}  onClose={() => {transition(SHOW, true)}} />}
      { mode === DELETING && <Status message={'Deleting'} />}
      { mode === ERROR_DELETE && <Error message={'Could not delete appointment.'}  onClose={() => {transition(SHOW, true)}} />}
      { mode === CONFIRM && <Confirm onConfirm={deleteInterview} onCancel={() => {transition(SHOW)}}/>}
      { mode === EDIT && 
        <Form 
          // value={props.value}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onChange={props.onChange}
          onClick={() => {back()}}
          onSave={save}
        /> }
      { mode === CREATE &&
        <Form 
          // value={props.value}
          student={props.student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onChange={props.onChange}
          onClick={() => {back()}}
          onSave={save}
        />
      }
      { mode === SHOW && props.interview.interviewer && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => {transition(EDIT)}}
        />
      )}
    </article>
  )
}