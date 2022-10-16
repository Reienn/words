import { FC } from 'react';
import { Link } from 'react-router-dom';
import { EntryData, EntryType } from '../models/entry.data';

const HOMEPAGE_IMAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/words-portfolio.appspot.com/o/homepage.svg?alt=media&token=bfeae678-629c-40a0-ba3b-d6a3d67d9edc';

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
        <div className="entry-image svg-image main-image" style={{ backgroundImage: `url(${HOMEPAGE_IMAGE_URL})` }}></div>
        <div className="subtitle">
          Called by my inner yearnings, <span>I cast the net of words</span><br />to catch glimpses <span>of (im)possible worlds</span>
        </div>
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