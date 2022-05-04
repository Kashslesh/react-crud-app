import classes from './ListItems.module.css';
import Items from './Items';

const ListItems = (props) => {
  return (
    <ul className={classes.list}>
      {props.lists.map((item) => (
        <Items
          key={item.id}
          id={item.id}
          firstName={item.firstName}
          secondName={item.secondName}
          email={item.email}
        />
      ))}
    </ul>
  );
};

export default ListItems;
