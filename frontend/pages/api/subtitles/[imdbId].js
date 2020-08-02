export default async (req, res) => {
  const {
    query: { imdb },
  } = req

  // const API_URL = process.env.API_URL || '/'

  // const data = await fetch(`${API_URL}/subtitles/suggestion/${keyword}`)
  // const result = await data.json()

  res.json({ imdb })
}
