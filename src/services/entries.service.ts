import firebase from '../firebase';
import { EntryData } from '../models/entry.data';

let db: firebase.firestore.Firestore;
let entries: EntryData[];

export async function get(): Promise<EntryData[]> {
  if (!entries) {
    await _init();
  }
  return entries;
}

export async function fetch(id: string): Promise<EntryData | null> {
  if (!entries) {
    await _init();
  }
  return entries?.find(el => el.id === id) || null;
}

export async function update(id: string, entry: Partial<EntryData>): Promise<void> {
  if (!db) {
    await _init();
  }
  const ref = db.collection('poems').doc(id);
  return ref.update(entry);
}

async function _init() {
  db = firebase.firestore();
  const querySnapshot = await db.collection('poems').orderBy('created', 'desc').get();
  entries = querySnapshot?.docs.map((doc) => ({id: doc.id, ...doc.data()} as EntryData)).sort((a, b) => a.type.localeCompare(b.type));
}
