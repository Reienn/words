import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PoemData } from '../models/poem.data';
import sanitizeHtml from 'sanitize-html';

interface PoemProps {
  poems: PoemData[]
}

const Poem: FC<PoemProps> = ({ poems }) => {
  const { slug } = useParams() as { slug: string };
  const poemIndex = poems.findIndex(el => el.slug === slug);
  const poem = poems[poemIndex];
  const next = poems[poemIndex < poems.length - 1 ? poemIndex + 1 : 0];
  const prev = poems[poemIndex > 0 ? poemIndex - 1 : poems.length - 1];

  return (
    <>{
      poem &&
      <>
        <div className="left-side">
          <div className="home-link"><Link to={'/'}>słowa</Link></div>
          <h2 id="header">{poem.title}</h2>
          <div className="poem-image" style={{ backgroundImage: `url(${poem.image})` }}></div>
        </div>
        <div className="right-side">
          <div id="main">
            <div id="content">
              <div className="poem-text" dangerouslySetInnerHTML={{ __html: sanitizeHtml(poem.content) }}></div>
            </div>
          </div>
          <div className="buttons">
            <Link to={'/' + (prev?.slug)} title={prev.title} className="button"> &#8249; </Link>
            <span>{poemIndex + 1}</span>
            <Link to={'/' + (next?.slug)} title={next.title} className="button"> &#8250; </Link>
          </div>
        </div>
      </>
    }</>
  );
}

export default Poem;