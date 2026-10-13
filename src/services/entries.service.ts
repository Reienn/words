import writings from '../data/writings.json';
import { EntryData, EntryType } from '../models/entry.data';

const typeOrder = [EntryType.Poem, EntryType.Story];

const entries: EntryData[] = (writings as EntryData[])
  .slice()
  // Stable sort: entries with the same date keep their order from writings.json
  .sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type) || Date.parse(b.created) - Date.parse(a.created));

export function get(): EntryData[] {
  return entries;
}

export function imageUrl(image: string): string {
  return /^https?:\/\//.test(image) ? image : `${import.meta.env.BASE_URL}images/${image}`;
}
