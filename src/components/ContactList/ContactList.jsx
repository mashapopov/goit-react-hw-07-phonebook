import { Ul, Li, Span, P, Button } from './contact.styled';
import {
  useDeleteContactsMutation,
  useGetContactsQuery,
} from '../../redux/contactsSlice';
import { useSelector } from 'react-redux';
import { selectFilters } from 'redux/selectors';

export const ContactList = () => {
  const filter = useSelector(selectFilters);
  const { data: contacts } = useGetContactsQuery();
  const [deleteContacts, { isLoading }] = useDeleteContactsMutation();

  if (!contacts) return;

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Ul>
        {filteredContacts.map(({ id, name, phone }) => (
          <Li key={id}>
            <P>{name}:</P>
            <Span>{phone}</Span>
            <Button
              type="button"
              onClick={() => deleteContacts(id)}
              disabled={isLoading}
            >
              Delete
            </Button>
          </Li>
        ))}
      </Ul>
    </>
  );
};
