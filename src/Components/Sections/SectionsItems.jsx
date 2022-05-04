import React, {Fragment, useState, useEffect, useCallback} from 'react';
import ListItems from '../Items/ListItems';
import LoadingSpinner from '../UI/LoadingSpinner';
import {useSelector} from 'react-redux';
import classes from './SectionsItems.module.css';
const SectionsItems = () => {
  const [getProfile, setProfile] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // for controle Api
  const statusForRender = useSelector((state) => state.person.isRender);

  useEffect(() => {
    const sendRequest = async () => {
      // Start of spinner
      setIsLoading(true);
      try {
        const response = await fetch('https://dbpersons-default-rtdb.firebaseio.com/persons.json');
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        // get et transform a data
        const loadedProfils = [];

        for (const key in data) {
          loadedProfils.push({
            id: key,
            firstName: data[key].firstName,
            secondName: data[key].secondName,
            email: data[key].email,
          });
        }
        // Set data Api
        setProfile(loadedProfils);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
      // End spinner
      setIsLoading(false);
    };
    sendRequest();
  }, [statusForRender]);
  // Sort method with toggle functions
  let sortProfile;
  const sortHandler = () => {
    setToggle((prevState) => !prevState);
    if (getProfile !== null) {
      sortProfile = getProfile;
      if (toggle) {
        sortProfile.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else {
        sortProfile.sort((a, b) => (b.name > a.name ? 1 : -1));
      }
      setProfile(sortProfile);
    }
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortHandler}>Sort </button>
      </div>
      {getProfile !== null && <ListItems className={classes.list} lists={getProfile} />}
      {isLoading && <LoadingSpinner />}
      {error && <p>{error}</p>}
    </Fragment>
  );
};
export default SectionsItems;
