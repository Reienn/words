import { FC, useState } from 'react';
import { EntryData } from '../models/entry.data';
import EditEntry from './edit-entry.component';
import firebase from '../firebase';

const auth = firebase.auth();

interface EditListProps {
  entries: EntryData[]
}
const EditList: FC<EditListProps> = ({ entries }) => {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [user, setUser] = useState<firebase.User | null>();

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

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
    <div className="wrapper editor">
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
          {entries?.map((el, i) => (
            <li key={i}>
              <EditEntry entry={el} />
            </li>))}
        </ul>
      </>
      }
    </div>
  );
}

export default EditList;