import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState(null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onClick();
  }

  const validate = () => {
    if (!student) {
      setError("Student name cannot be empty.")
      return;
    } 
    
    if (!interviewer) {
      setError("Must select an interviewer.")
      return;
    }

    props.onSave(student, interviewer);
    
  }
 
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        {error && <p>{error}</p>}
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event)=> {
              if (error) {
                setError(null);
              }
              setStudent(event.target.value);
            }}
          />
        </form >
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}
