export enum EntryType {
  Poem = 'poem',
  Story = 'story'
}

export interface EntryData {
  id: string;
  slug: string;
  title: string;
  content: string;
  created: string;
  image: string;
  type: EntryType;
}