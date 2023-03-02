import axios from 'axios';
import { json, redirect } from 'react-router-dom';

export async function loader() {
  const configuration = {
    method: 'post',
    url: 'https://natours-api-1zra.onrender.com/logout',
    withCredentials: true,
  };

  try {
    await axios(configuration);
    localStorage.removeItem('user');
    return redirect('/');
  } catch ({ response }) {
    const error = response.data;
    throw json({ message: error.message }, { status: error.status });
  }
}
