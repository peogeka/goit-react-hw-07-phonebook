import { Item, Text, List, Button, Wrapper } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { selectContacts, selectError, selectIsLoading, selectStatusFilter } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import { useEffect } from 'react';

export function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectStatusFilter);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && !error && <b>Request in progress...</b>}
      {error && <b>Error: {error}</b>}
      {contacts?.length > 0 && (
        <List>
          {(filter.length > 0
            ? contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
            : contacts
          ).map(item => (
            <Item key={item.id}>
              <Wrapper>
                <Text>
                  {item.name}: {item.phone}
                </Text>
                <Button onClick={() => dispatch(deleteContact(item.id))}>Delete</Button>
              </Wrapper>
            </Item>
          ))}
        </List>
      )}
    </>
  );
}
