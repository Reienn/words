import firebase from '../firebase';
import { EntryData } from '../models/entry.data';

let db: firebase.firestore.Firestore;
let entries: EntryData[];

export async function get(cache = true): Promise<EntryData[]> {
  if (!entries) {
    await _init();
  }
  if (!cache) {
    await getEntries();
  }
  return entries;
}

export async function fetch(id: string): Promise<EntryData | null> {
  if (!entries) {
    await _init();
  }
  return entries?.find(el => el.id === id) || null;
}

export async function save(entry: Partial<EntryData>): Promise<void> {
  if (!db) {
    await _init();
  }
  if (entry.id) {
    return db.collection('poems').doc(entry.id).update(entry);
  }
  const newEntry = {
    created: firebase.firestore.FieldValue.serverTimestamp(),
    ...entry
  };
  return db.collection('poems').doc().set(newEntry);
}

export async function remove(id: string): Promise<void> {
  if (!id) { return; }
  if (!db) {
    await _init();
  }
  return db.collection('poems').doc(id).delete();
}

async function _init() {
  db = firebase.firestore();
  await getEntries();
}

async function getEntries() {
  const querySnapshot = await db.collection('poems').orderBy('created', 'desc').get();
  entries = querySnapshot?.docs.map((doc) => ({id: doc.id, ...doc.data()} as EntryData)).sort((a, b) => a.type.localeCompare(b.type));
}
