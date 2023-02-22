import { Form, json, useActionData, useNavigation } from 'react-router-dom';
import axios from 'axios';

import { Alert, AlertTitle } from '@mui/material';
import BufferIcon from '../ui/BufferIcon';

function SignupPage() {
  const navigation = useNavigation();
  const user = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <main className="main">
      {isSubmitting && <BufferIcon />}
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">SignUp your account</h2>
        <Form method="post" className="form form--login">
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input"
              id="name"
              type="name"
              placeholder="hari das"
              required="required"
              name="name"
            />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required="required"
              name="email"
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
              placeholder="••••••••"
              required="required"
              name="password"
              minLength="8"
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="confirmPass">
              Confirm Password
            </label>
            <input
              className="form__input"
              id="confirmPass"
              type="password"
              placeholder="••••••••"
              required="required"
              name="confirmPassword"
              minLength="8"
            />
          </div>
          {user && user.status && (
            <Alert
              severity="error"
              style={{
                fontSize: '1.45rem',
                marginBottom: '20px',
              }}
            >
              <AlertTitle
                style={{
                  fontSize: '1.25rem',
                }}
              >
                Error
              </AlertTitle>
              {user.message}
            </Alert>
          )}

          <div className="form__group">
            <button disabled={isSubmitting} className="btn btn--green">
              {isSubmitting ? 'Submitting...' : 'SignUp'}
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password'),
    passwordConfirm: data.get('confirmPassword'),
  };

  const configuration = {
    method: 'post',
    url: 'http://localhost:5001/signup',
    data: authData,
    withCredentials: true,
  };
  // make the API call
  try {
    const response = await axios(configuration);
    const { data } = response.data;
    const { user } = data;

    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo ? user.photo : 'default.jpg',
    };
    localStorage.setItem('user', JSON.stringify(userData));

    if (user.status === 422 || user.status === 401) {
      return user;
    }

    return user;
  } catch ({ response }) {
    const error = response.data;
    if (error.status === 400) return error;
    throw json({ message: error.message }, { status: error.status });
  }
}

export default SignupPage;
