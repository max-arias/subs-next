import { findByIMDB } from '../services/themoviedb.js';

const Subs = ({ shows }) => (
  <>
    <div className='wrapper'>
      <div>{JSON.stringify(shows)}</div>
      <div>{JSON.stringify(shows)}</div>
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
  const { term } = req.params
  const shows = await findByIMDB(term);

  console.log(`Fetched: ${term}`)

  return { shows }
}

export default Subs;
