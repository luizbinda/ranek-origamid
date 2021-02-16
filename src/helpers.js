export default (obj) => {
  let queryString = '';
  // eslint-disable-next-line no-restricted-syntax,guard-for-in
  for (const key in obj) {
    queryString += `&${key}=${obj[key]}`;
  }
  return queryString;
};

export const numeroPreco = (valor) => {
  const Numbervalor = Number(valor);
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(Numbervalor)) {
    return Numbervalor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  return '';
};
