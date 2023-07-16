import { Li, List, Delete } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsOperations';

const getVisibleTasks = (contacts, filter) => {
  const normilizedFilter = filter.toLowerCase();
  return contacts.filter(contact =>
    contact['name'].toLowerCase().includes(normilizedFilter)
  );
};

const Items = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const visibleTasks = getVisibleTasks(contacts, filter);
  const dispatch = useDispatch();
  return (
    <List>
      {visibleTasks.length ? (
        visibleTasks.map(({ id, name, number }) => (
          <Li key={id}>
            <p>
              {name}: {number}
              <Delete onClick={() => dispatch(deleteContact(id))}>
                Delete
              </Delete>
            </p>
          </Li>
        ))
      ) : (
        <h3>There are no contacts in your phonebook</h3>
      )}
    </List>
  );
};

export default Items;