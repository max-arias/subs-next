// import { findByIMDB, getDetailsByMovieId } from '../services/themoviedb';

// import SubsContainer from '../components/SubsContainer';

// const movieDbUrl = 'https://image.tmdb.org/t/p/';

const Subs = ({ info, imdb, extra_info }) => {
//   const movieInfo = info.movie_results[0];

  return (
      <span>Subs</span>
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
  