import { findByIMDB } from '../services/themoviedb';
import { getSubs } from '../services/opensubtitles';

import OpenSubtitles from '../components/OpenSubtitles';
import ItemInfo from '../components/ItemInfo';

const Subs = ({ info, subs }) => (
  <>
    <div className='wrapper'>
      <div>
        <ItemInfo info={info} />
        <OpenSubtitles subs={subs} />
      </div>
      <div>{JSON.stringify(info)}</div>
    </div>

    <style jsx>{`
      .wrapper {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-gap: 1rem;
      }

      .wrapper .content {
        padding-top: 10rem;
      }
    `}
    </style>
  </>
)

Subs.getInitialProps = async ({ req }) => {
  const { imdb } = req.params

  let info = {};
  let subs = [];

  try {
    info = await findByIMDB(imdb);
    subs = await getSubs(imdb);
  } catch (e) {
    console.error(e);
  }

  console.log('subs', subs);

  console.log(`Fetched: ${imdb}`)

  return { info, subs }
}

export default Subs;
