import { nanoid } from 'nanoid';
import { Form, Label, Input, Button } from './ContactForm.styled';
import {
  useAddContactsMutation,
  useGetContactsQuery,
} from '../../redux/contactsSlice';

export function ContactForm() {
  const loginInputId = nanoid();
  const { data: contacts } = useGetContactsQuery();
  const [addContacts] = useAddContactsMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const phone = form.elements.phone.value;

    if (!contacts) return;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    )
      return alert(`${name} is alredy in contacts`);

    await addContacts({ name, phone });
    form.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={loginInputId}>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label htmlFor={loginInputId} className="Form__label">
        Number
        <Input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button className="Form__btn" type="submit">
        Add contact
      </Button>
    </Form>
  );
}
