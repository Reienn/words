export enum EntryType {
  Poem = 'poem',
  Story = 'story'
}

export interface EntryData {
  slug: string;
  title: string;
  content: string;
  created: string;
  image: string;
  type: EntryType;
}
