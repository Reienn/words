import { FC, useEffect, useState } from 'react';
import { EntryData } from '../models/entry.data';
import EditEntry from './edit-entry.component';
import firebase from '../firebase';

const auth = firebase.auth();

interface EditListProps {
  entries: EntryData[],
  changed: () => void,
}
const EditList: FC<EditListProps> = ({ entries, changed }) => {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [user, setUser] = useState<firebase.User | null>();
  const [editEntries, setEditEntries] = useState<(Partial<EntryData>)[]>([]);

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    entries && setEditEntries([{}, ...entries]);
  }, [entries])

  const signIn = () => {
    if (!(login && password)) { return; }
    try {
      auth.signInWithEmailAndPassword(login, password);
    } catch (_) { }
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="editor">
      {!user && <div className="login-form">
        <div>
          <label>Login:</label> <input type="text" onChange={e => setLogin(e.target.value)} />
        </div>
        <div>
          <label>Hasło:</label> <input type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <button onClick={signIn}>Login</button>
      </div>}
      {user && <>
        <h2>Edytor</h2>
        <button className="logout-button" onClick={signOut}>Wyloguj</button>
        <ul>
          {editEntries.map((el, i) => (
            <li key={el.id || i}>
              <EditEntry entry={el} changed={changed} />
            </li>))}
        </ul>
      </>
      }
    </div>
  );
}

export default EditList;