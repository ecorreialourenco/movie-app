const url = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getMovieDetails = async (id: string) =>
  await fetch(`${url}/movie/${id}?api_key=${apiKey}`)
    .then(async (res) => await res.json())
    .catch((err) => {
      console.log("err", err);
      return null;
    });
