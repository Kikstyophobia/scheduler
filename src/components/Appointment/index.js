import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview) 
      .then(() => {
        transition(SAVING)
      })
      .then(() => {
        transition(SHOW);
      })
  }

  console.log("int props",props.interview);
  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />
      { mode === EMPTY && <Empty onAdd={() => {(transition(CREATE))}} /> }
      { mode === SAVING && <Show />}
      { mode === CREATE &&
        <Form 
          value={props.value}
          student={props.student}
          interviewer={props.interviewer}
          interviewers={[]}
          onChange={props.onChange}
          onClick={() => {back()}}
          onSave={save}
        />
      }
      { mode === SHOW && (
        <Show 
          student={props.interview.student}
          interview={props.interview.interviewer}
        />
      )}
    </article>
  )
}