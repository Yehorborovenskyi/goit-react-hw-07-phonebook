import { Form, Label, Input, Submit } from './ContactForm.styled';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsOperations';
import { selectContacts } from 'redux/selectors';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact({ name, number }));
      form.reset();
    }
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={nameInputId}>
        Name
        <Input
          type="text"
          name="name"
          id={nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label htmlFor={numberInputId}>
        Number
        <Input
          type="tel"
          name="number"
          id={numberInputId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Submit>Add to contact</Submit>
    </Form>
  );
}