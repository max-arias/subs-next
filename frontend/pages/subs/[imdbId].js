
const Subs = ({ imdbId }) => {
//   const movieInfo = info.movie_results[0];

  return (
      <span>{imdbId}</span>
  )
}

export async function getServerSideProps(ctx) {
  console.log('ctx.query', ctx.query)
  const { imdbId } = ctx.query;

  return { props: { imdbId } }
}

export default Subs;
