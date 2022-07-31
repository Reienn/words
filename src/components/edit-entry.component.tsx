import { ChangeEvent, FC, MouseEventHandler, useState } from 'react';
import { EntryData } from '../models/entry.data';
import { save, remove } from '../services/entries.service';

interface EditEntryProps {
  entry: Partial<EntryData>,
  changed: () => void,
}
const EditEntry: FC<EditEntryProps> = ({ entry, changed }) => {
  const [formData, setFormData] = useState<Partial<EntryData>>(entry);
  const [collapsed, setCollapsed] = useState(true);

  const onChange = (value: string, field: keyof EntryData) => {
    setFormData({ ...formData, [field]: value });
  }

  const onSave = async () => {
    await save(formData);
    if (!formData.id) {
      setCollapsed(true);
      setFormData({});
    }
    changed();
  }

  const onRemove = async () => {
    if (!formData.id) { return; }
    if (window.confirm('Czy na pewno?')) {
      await remove(formData.id);
      changed();
    }
  }

  return (
    <>
      <h3 className={`edit-title ${!formData.id ? 'add-title' : ''}`} onClick={() => setCollapsed(!collapsed)}>
        <span className={`arrow-icon ${collapsed ? 'right' : 'down'}`}/>
        {formData.title || 'Dodaj nowy'}
        {formData.id && <button className="remove-button" onClick={e => {e.stopPropagation(); onRemove();}}>&#10005;</button>}
      </h3>
      {!collapsed && <div className="entry-form">
        <div>
          <label>Tytuł: </label>
          <input type="text" value={formData.title} onChange={e => onChange(e.target.value, 'title')} />
        </div>
        <div>
          <label>Slug: </label>
          <input type="text" value={formData.slug} onChange={e => onChange(e.target.value, 'slug')} />
        </div>
        <div>
          <label>Treść: </label>
          <textarea value={formData.content?.split('<br>').join('\n')} onChange={e =>
            onChange(e.target.value?.split('\n').join('<br>'), 'content')} />
        </div>
        <div>
          <label>Grafika: </label>
          <input type="text" value={formData.image} onChange={e => onChange(e.target.value, 'image')} />
        </div>
        <div>
          <label>Typ: </label>
          <select onChange={e => onChange(e.target.value, 'type')}>
            <option disabled selected> </option>
            <option value="poem" selected={formData.type === 'poem'}>Wiersz</option>
            <option value="story" selected={formData.type === 'story'}>Proza</option>
          </select>
        </div>
        <div className="save-button">
          <button onClick={onSave}>{entry.id ? 'Zapisz' : 'Dodaj'}</button>
        </div>
      </div>}
    </>
  );
}

export default EditEntry;