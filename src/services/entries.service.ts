import firebase from '../firebase';
import { EntryData } from '../models/entry.data';

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

async function _init() {
  const db = firebase.firestore();
  const querySnapshot = await db.collection('poems').orderBy('created', 'desc').get();
  entries = querySnapshot?.docs.map((doc) => ({id: doc.id, ...doc.data()} as EntryData));
}
