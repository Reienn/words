import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EntryData } from '../models/entry.data';
import sanitizeHtml from 'sanitize-html';

interface EntryProps {
  entries: EntryData[]
}

const Entry: FC<EntryProps> = ({ entries }) => {
  const { slug } = useParams() as { slug: string };
  const entryIndex = entries.findIndex(el => el.slug === slug);
  const entry = entries[entryIndex];
  const next = entries[entryIndex < entries.length - 1 ? entryIndex + 1 : 0];
  const prev = entries[entryIndex > 0 ? entryIndex - 1 : entries.length - 1];

  return (
    <>{
      entry &&
      <>
        <div className="left-side">
          <div className="home-link"><Link to={'/'}>słowa</Link></div>
          <h2 id="header">{entry.title}</h2>
          <div className="entry-image" style={{ backgroundImage: `url(${entry.image})` }}></div>
        </div>
        <div className="right-side">
          <div id="main">
            <div id="content">
              <div className="entry-text" dangerouslySetInnerHTML={{ __html: sanitizeHtml(entry.content) }}></div>
            </div>
          </div>
          <div className="buttons">
            <Link to={'/' + (prev?.slug)} title={prev.title} className="button"> &#8249; </Link>
            <span>{entryIndex + 1}</span>
            <Link to={'/' + (next?.slug)} title={next.title} className="button"> &#8250; </Link>
          </div>
        </div>
      </>
    }</>
  );
}

export default Entry;