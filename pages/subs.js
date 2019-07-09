import { findByIMDB } from '../services/themoviedb';

import SubsContainer from '../components/SubsContainer';
import ItemInfo from '../components/ItemInfo';

const Subs = ({ info, imdb }) => {
  return (
    <>
      <div className='wrapper'>
        <div>
          <ItemInfo info={info} />
          <SubsContainer service='opensubtitles' imdb={imdb} />
          <SubsContainer service='yifi' imdb={imdb} />
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
}

Subs.getInitialProps = async ({ req }) => {
  const { imdb } = req.params

  let info = {};

  try {
    info = await findByIMDB(imdb);
  } catch (e) {
    console.error(e);
  }

  return { info, imdb }
}

export default Subs;
