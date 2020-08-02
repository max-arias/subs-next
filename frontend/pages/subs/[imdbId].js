// import { findByIMDB, getDetailsByMovieId } from '../services/themoviedb';

// import SubsContainer from '../components/SubsContainer';

// const movieDbUrl = 'https://image.tmdb.org/t/p/';

const Subs = ({ imdbId }) => {
//   const movieInfo = info.movie_results[0];

  return (
      <span>{imdbId}</span>
  )
}

export async function getServerSideProps(ctx) {
  console.log('ctx.query', ctx.query)
  const { imdbId } = ctx.query;

//     // const { imdbId } = req.params

//     // // let info = {};
//     // // let extra_info = {};

//     // // try {
//     // //   info = await findByIMDB(imdb);
//     // //   extra_info = await getDetailsByMovieId(info.movie_results[0].id);
//     // // } catch (e) {
//     // //   console.error(e);
//     // // }

//     // console.log('extra_info', extra_info)

//     return { imdbId }
  return { props: { imdbId } }
}

export default Subs;
