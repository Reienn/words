import writings from '../data/writings.json';
import { EntryData, EntryType } from '../models/entry.data';

const typeOrder = [EntryType.Poem, EntryType.Story];

const entries: EntryData[] = (writings as EntryData[])
  .slice()
  .sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type) || b.created.localeCompare(a.created));

export function get(): EntryData[] {
  return entries;
}

export function imageUrl(image: string): string {
  return /^https?:\/\//.test(image) ? image : `${process.env.PUBLIC_URL}/images/${image}`;
}
