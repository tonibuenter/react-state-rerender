import React, { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// let last = null;

const AppList = () => {
  console.log('Render: App');
  const [users, setUsers] = React.useState([
    { id: 'a', name: 'Robin' },
    { id: 'b', name: 'Dennis' }
  ]);

  useEffect(() => {
    console.log('users', users.length);
  });

  //console.error(last !== setUsers ? 'DIFF last' : 'SAME last');
  // last = setUsers;

  const [text, setText] = React.useState('');

  const handleText = useCallback((event: any) => {
    setText(event.target.value);
  }, []);

  const handleAddUser = () => {
    setUsers(users.concat({ id: uuidv4(), name: text }));
  };

  const handleRemove = useCallback(
    (id: any) => {
      //console.log('users', users);
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );

  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleAddUser}>
        Add User
      </button>

      <List list={users} onRemove={handleRemove} />
    </div>
  );
};

const List = React.memo(({ list, onRemove }: any) => {
  console.log('Render: List');
  return (
    <ul>
      {list.map((item: any) => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
});

const ListItem = ({ item, onRemove }: any) => {
  console.log('Render: ListItem');
  return (
    <li>
      {item.name}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
};

export default AppList;
