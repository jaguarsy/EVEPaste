import axios from 'axios';

export default (data) => {
  const formData = new FormData();
  formData.append('raw_textarea', data);
  formData.append('market', 'jita');

  return axios
    .request({
      url: 'https://evepraisal.com/appraisal.json',
      method: 'post',
      data: formData,
    })
    .then((res) => {
      console.info('Res:', res);
      return res.data || {};
    });
};
