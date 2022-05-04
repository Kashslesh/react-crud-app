import {Fragment, useState} from 'react';
import classes from './Items.module.css';
import {useDispatch} from 'react-redux';
import Form from '../Form/Form';
import Card from '../UI/Card';
import {personsActions} from '../store/DataSlicer';

const Items = (props) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
  // Request for delete some value  i used to props id like an id
  const deletHandler = () => {
    const sendRequest = async (id) => {
      try {
        const response = await fetch(
          `https://dbpersons-default-rtdb.firebaseio.com/persons/${id}.json`,
          {
            method: 'DELETE',
            body: {persons: id},
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
          },
        );
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
      dispatch(personsActions.getStatus());
    };
    sendRequest(props.id);
    dispatch(personsActions.loseStatus());
  };
  const toggleHandler = () => {
    setToggle((prevState) => !prevState);
  };
  // request to put some data in db, i used to props id like an id
  const putRequest = async (firstname, secondName, email) => {
    try {
      const response = await fetch(
        `https://dbpersons-default-rtdb.firebaseio.com/persons/${props.id}.json`,
        {
          method: 'PUT',
          body: {persons: props.id},
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(firstname, secondName, email),
        },
      );
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
    dispatch(personsActions.getStatus());
    setToggle(false);
    dispatch(personsActions.loseStatus());
  };

  return (
    <Fragment>
      <li className={classes.item}>
        <figure>
          <blockquote>
            <p>{props.secondName}</p>
          </blockquote>
          <figcaption>{props.firstName}</figcaption>
          <figcaption>{props.email}</figcaption>
        </figure>
        <button onClick={toggleHandler} className="btn">
          Change
        </button>
        <button onClick={deletHandler} className="btn">
          Delete
        </button>
        {error && <p>{error}</p>}
      </li>
      {toggle && (
        <Card>
          <Form inCommingFunctions={putRequest} />
        </Card>
      )}
    </Fragment>
  );
};

export default Items;
