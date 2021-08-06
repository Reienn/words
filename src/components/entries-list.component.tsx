import { FC } from 'react';
import { Link } from 'react-router-dom';
import { EntryData, EntryType } from '../models/entry.data';

interface EntriesListProps {
  entries: EntryData[]
}
const EntriesList: FC<EntriesListProps> = ({entries}) => {
  const poems: EntryData[] = [];
  const stories: EntryData[] = [];

  entries.forEach(entry => {
    switch (entry.type) {
      case EntryType.Poem:
        poems.push(entry);
        break;
      case EntryType.Story:
        stories.push(entry);
        break;
      default:
        break;
    }
  })

  return (
    <div className="wrapper">
      <div className="left-side">
        <h1 id="header">Słowa</h1>
        <div className="entry-image" style={{ backgroundImage: `url(https://live.staticflickr.com/8096/8516514956_40bc1873f1_c.jpg)` }}></div>
      </div>
      <div className="right-side">
        <div id="main">
          <div id="content">
            <h2>Poezja</h2>
            <ul>
              {poems?.map((el, i) => (<li key={i}><Link to={'/'+el.slug}>{el.title}</Link></li>))}
            </ul>
            <h2>Proza</h2>
            <ul>
              {stories?.map((el, i) => (<li key={i}><Link to={'/'+el.slug}>{el.title}</Link></li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntriesList;