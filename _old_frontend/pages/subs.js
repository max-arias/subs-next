import { Icon, Typography } from 'antd';
const { Text } = Typography;

import { findByIMDB, getDetailsByMovieId } from '../services/themoviedb';

import SubsContainer from '../components/SubsContainer';

const movieDbUrl = 'https://image.tmdb.org/t/p/';

const Subs = ({ info, imdb, extra_info }) => {
  const movieInfo = info.movie_results[0];

  return (
    <>
      <div className='wrapper'>
        <div className="content">
          <div className="center">
            <div className="backdrop back" style={{backgroundImage: `url('${movieDbUrl}w1280/${movieInfo.backdrop_path}')`}} />
            <div className="title-info-container">
              <div className="poster back" style={{backgroundImage: `url('${movieDbUrl}w500/${movieInfo.poster_path}')`}} />
              <div className="title-info">
                <div className="title">{movieInfo.original_title}</div>
                <div className="info">
                  {extra_info && (
                    <>
                      <div>{extra_info.runtime} min</div>
                      <>
                        extra_info.genres.map((genre) => <Text underline>{genre.name}</Text>)
                      </>
                    </>
                  )}
                </div>
                <div className="description">{movieInfo.overview}</div>
                <div className="ratings">
                  <Icon type="star" /> -
                  {movieInfo.vote_average} -
                  {movieInfo.vote_count} votes
                </div>
              </div>
            </div>
            <div className="sub-container">
              <SubsContainer service='opensubtitles' imdb={imdb} />
              <SubsContainer service='yifi' imdb={imdb} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          background: #0F2027;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          display: grid;
          grid-template-columns: 1fr 6fr 1fr;
          grid-gap: 1rem;
        }

        .wrapper .content {
          background: #fff;
          grid-column-start: 2;
          padding: 2rem;
        }

        .wrapper .content .center {
          display: flex;
          justify-content: center;
        }

        .wrapper .content .back {
          background-repeat: no-repeat;
          background-size: contain;
        }

        .wrapper .content .backdrop {
          -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.2);
          -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.2);
          box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.2);
          border-radius: 5px;
          width: 80%;
          height: 595px;
        }

        .wrapper .content .poster {
          border-radius: 5px;
          height: 750px;
          width: 500px;
        }
      `}
      </style>
    </>
  )
}

Subs.getInitialProps = async ({ req }) => {
  const { imdb } = req.params

  let info = {};
  let extra_info = {};

  try {
    info = await findByIMDB(imdb);
    extra_info = await getDetailsByMovieId(info.movie_results[0].id);
  } catch (e) {
    console.error(e);
  }

  console.log('extra_info', extra_info)

  return { info, imdb }
}

export default Subs;
