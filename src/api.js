import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000',
});

export const getCep = (cep) => axios.get(`https://viacep.com.br/ws/${cep}/json/`);
