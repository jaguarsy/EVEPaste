import axios from 'axios';

const getIdByName = name => axios
  .get(`https://zkillboard.com/autocomplete/${encodeURIComponent(name)}/`)
  .then((result) => {
    const list = result.data || [];
    const first = list.find(p => p.type === 'character');
    if (first) {
      return first.id;
    }
    return null;
  });

const getStatsById = (id) => {
  if (!id) {
    return Promise.resolve();
  }

  return axios
    .get(`https://zkillboard.com/api/stats/characterID/${id}/`)
    .then(result => result.data);
};

export default name => getIdByName(name).then(getStatsById);
