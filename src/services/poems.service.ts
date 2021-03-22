import firebase from '../firebase';
import { PoemData } from '../models/poem.data';

let poems: PoemData[];

export async function get(): Promise<PoemData[]> {
  if (!poems) {
    await _init();
  }
  return poems;
}

export async function fetch(id: string): Promise<PoemData | null> {
  if (!poems) {
    await _init();
  }
  return poems?.find(el => el.id === id) || null;
}

async function _init() {
  const db = firebase.firestore();
  const querySnapshot = await db.collection('poems').orderBy('created', 'desc').get();
  poems = querySnapshot?.docs.map((doc) => ({id: doc.id, ...doc.data()} as PoemData));
}
