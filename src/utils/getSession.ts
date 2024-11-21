export const getSession = async () => {
  const url = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  return await fetch(
    `${url}/authentication/guest_session/new?api_key=${apiKey}`
  )
    .then(async (res) => {
      const item = await res.json();
      return item.guest_session_id;
    })
    .catch((err) => {
      console.log("err", err);
      return "";
    });
};
