import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PoemData } from '../models/poem.data';
import { fetch } from '../services/poems.service';
import sanitizeHtml from 'sanitize-html';

export default function Poem() {
  let { id } = useParams() as any;

  const [poem, setPoem] = useState<PoemData | null>();

  useEffect(() => {
    fetch(id).then(setPoem);
  }, []);

  return (
    <>{
    poem &&
    <div>
      <h2>{poem.title}</h2>
      <p dangerouslySetInnerHTML={{__html: sanitizeHtml(poem.content)}}></p>
      <div id="buttons">
        <Link to={'/poems/'+(+id-1)}>poprzedni</Link>
        <Link to={'/poems'}>powrót</Link>
        <Link to={'/poems/'+(+id+1)}>następny</Link>
      </div>
    </div>
    }</>
  );
}