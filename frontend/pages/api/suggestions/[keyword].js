export default async (req, res) => {
  const {
    query: { keyword },
  } = req

  const API_URL = process.env.API_URL || '/'

  const data = await fetch(`${API_URL}/suggestions?keyword=${keyword}`)
  let result = await data.json()
  result = result && result[0] && result[0].data ? result[0].data : null

  res.json(result)
}
