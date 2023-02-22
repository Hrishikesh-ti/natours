import { Form, redirect, useNavigation } from 'react-router-dom';
import axios from 'axios';
import StoreUser from '../components/StoreUser';
import BufferIcon from '../ui/BufferIcon';

function LoginPage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <main className="main">
      {isSubmitting && <BufferIcon />}
      {!isSubmitting && (
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
          <Form method="post" className="form form--login">
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required="required"
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required="required"
                minLength="8"
              />
            </div>

            <div className="form__group">
              <button disabled={isSubmitting} className="btn btn--green">
                {isSubmitting ? 'Submitting...' : 'Login'}
              </button>
            </div>
          </Form>
        </div>
      )}
    </main>
  );
}

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const configuration = {
    method: 'post',
    url: 'http://localhost:5001/login',
    data: authData,
    withCredentials: true,
  };
  // make the API call
  try {
    const response = await axios(configuration);
    if (response.status === 422 || response.status === 401) {
      return response;
    }
    const { data } = response.data;
    const { user } = data;

    StoreUser(user);

    return redirect('/');
  } catch (error) {
    return redirect('/login');
  }
}
