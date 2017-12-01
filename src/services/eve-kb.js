import axios from 'axios';

const getIdByName = name => axios
  .get(`https://zkillboard.com/autocomplete/${encodeURIComponent(name)}/`)
  .then((result) => {
    const first = result.data && result.data[0];
    if (first) {
      return first.id;
    }
    return null;
  });

const getStatsById = (id) => {
  if (!id) {
    return Promise.resolve({});
  }

  return axios
    .get(`https://zkillboard.com/api/stats/characterID/${id}/`)
    .then(result => result.data);
};

export default name => getIdByName(name).then(getStatsById);
