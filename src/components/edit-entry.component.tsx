import { ChangeEvent, FC, useState } from 'react';
import { EntryData } from '../models/entry.data';
import { update } from '../services/entries.service';

interface EditEntryProps {
  entry: EntryData
}
const EditEntry: FC<EditEntryProps> = ({ entry }) => {
  const [formData, setFormData] = useState<EntryData>(entry);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: keyof EntryData) => {
    setFormData({...formData, [field]: e.target.value });
  }

  return (
    <>
      <div>
        <label>Tytuł: </label>
        <input type="text" value={formData.title} onChange={e => onChange(e, 'title')}/>
      </div>
      <div>
        <label>Slug: </label>
        <input type="text" value={formData.slug} onChange={e => onChange(e, 'slug')}/>
      </div>
      <div>
        <label>Treść: </label>
        <textarea value={formData.content} onChange={e => onChange(e, 'content')} />
      </div>
      <div>
        <label>Grafika: </label>
        <input type="text" value={formData.image} onChange={e => onChange(e, 'image')} />
      </div>
      <div>
        <label>Typ: </label>
        <select onChange={e => onChange(e, 'type')}>
          <option value="poem" selected={formData.type === 'poem'}>Wiersz</option>
          <option value="story" selected={formData.type === 'story'}>Proza</option>
        </select>
      </div>
      <div className="save-button">
        <button onClick={() => update(entry.id, formData)}>Zapisz</button>
      </div>
    </>
  );
}

export default EditEntry;