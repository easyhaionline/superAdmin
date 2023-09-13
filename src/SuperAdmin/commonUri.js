export const ServerURI = 'https://www.api.easyhaionline.com';
// export const ServerURI = "http://localhost:8080";
// export const ServerURI = 'http://192.168.29.12:8080';

export const authToken = '1j3kljlkf23j5lk&2f';

export const getAuth = () => {
  return localStorage.getItem(authToken);
};

export const setAuth = (token) => {
  localStorage.setItem(authToken, token);
};

export const removeAuth = () => {
  localStorage.removeItem(authToken);
};
