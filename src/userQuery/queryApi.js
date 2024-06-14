/* import axios from 'axios';
import { useQuery } from 'react-query';

// Función para obtener usuarios con token JWT
export const getUsersWithToken = token => {
  return useQuery('users', async () => {
    const response = await axios.get('https://api.ejemplo.com/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  });
}; */