import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PoemData } from '../models/poem.data';

interface PoemsProps {
  poems: PoemData[]
}
const PoemsList: FC<PoemsProps> = ({poems}) => {
  return (
    <div className="wrapper">
      <div className="left-side">
        <h1 id="header">Słowa</h1>
        <div className="poem-image" style={{ backgroundImage: `url(https://live.staticflickr.com/8096/8516514956_40bc1873f1_c.jpg)` }}></div>
      </div>
      <div className="right-side">
        <div id="main">
          <div id="content">
            <ul>
              {poems?.map((el, i) => (<li key={i}><Link to={'/'+el.slug}>{el.title}</Link></li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoemsList;