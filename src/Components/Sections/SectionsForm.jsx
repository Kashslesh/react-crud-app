import React, {Fragment, useState} from 'react';
import Card from '../UI/Card';
import Form from '../Form/Form';
import {useDispatch} from 'react-redux';
import {personsActions} from '../store/DataSlicer';
const SectionsForm = () => {
  // use dispatch for use actions from redux store like boolean in this example
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (requestData) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://dbpersons-default-rtdb.firebaseio.com/persons.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
    setIsLoading(false);
    dispatch(personsActions.loseStatus());
  };
  return (
    <Fragment>
      <Card>
        {/* Pass props for to get values */}
        <Form inCommingFunctions={sendRequest} isLoading={isLoading} error={error} />
      </Card>
    </Fragment>
  );
};
export default SectionsForm;
