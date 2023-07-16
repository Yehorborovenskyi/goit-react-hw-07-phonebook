import Section from './Section';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contactsOperations';
import { selectError, selectIsLoading } from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      <Section title="Phonebook">
        <ContactForm />
      </Section>

      <Section title="Contacts">
        <Filter />
        {isLoading && !error && (
          <b style={{ marginLeft: 70 }}>Request in progress...</b>
        )}
        {error && (
          <b style={{ marginLeft: 70 }}>
            The operation failed with error: ${error}
          </b>
        )}
        {!isLoading && !error && <ContactList />}
      </Section>
    </div>
  );
};