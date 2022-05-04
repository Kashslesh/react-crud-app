import React, {useState} from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Form.module.css';
import {useDispatch} from 'react-redux';
import {personsActions} from '../store/DataSlicer';

const Form = (props) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  // some simple controle for the  form and sets in states
  const firstNameHandler = (event) => {
    if (!event.target.value && event.target.value.length < 3) {
      return;
    } else {
      setFirstName(event.target.value);
    }
  };
  // some simple controle for the  form and sets in states
  const secondNameHandler = (event) => {
    if (!event.target.value && event.target.value.length < 3) {
      return;
    } else {
      setSecondName(event.target.value);
    }
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  // submition values throw props and clear the inputs
  const submitHandler = (event) => {
    event.preventDefault();
    if (firstName.trim() === '' && secondName.trim() === '') {
      return;
    }
    props.inCommingFunctions({firstName, secondName, email});
    dispatch(personsActions.getStatus());
    setEmail('');
    setFirstName('');
    setSecondName('');
  };

  return (
    <div>
      <form className={classes.control} onSubmit={submitHandler}>
        <label htmlFor="firstName">
          Prenom
          <input
            value={firstName}
            type="text"
            name="firstName"
            required
            onChange={firstNameHandler}
          />
        </label>
        <label htmlFor="secondName">
          Nom
          <input
            value={secondName}
            type="text"
            name="secondName"
            required
            onChange={secondNameHandler}
          />
        </label>
        <label htmlFor="email">
          Email
          <input value={email} type="email" name="email" required onChange={emailHandler} />
        </label>
        <div className={classes.actions}>
          <button className="btn" type="submit" name="btn">
            Ajouter
          </button>
        </div>
      </form>
      {/* Conditions if there are errors and splinner*/}
      {props.error && <p>{props.error}</p>}
      {props.isLoading && <LoadingSpinner />}
    </div>
  );
};
export default Form;
