import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PoemData } from '../models/poem.data';
import { get as getPoems } from '../services/poems.service';

export default function PoemsList() {
  const [poems, setPoems] = useState<PoemData[]>([]);

  useEffect(() => {
    getPoems().then(setPoems);
  }, []);

  return (
    <ul>
      {poems?.map((el, i) => (<li key={i}><Link to={'/poems/'+el.id}>{el.title}</Link></li>))}
    </ul>
  );
}