import axios from 'axios';
import React, { useRef } from 'react';
import { json } from 'react-router-dom';

function ChangePassword() {
  const ref = useRef();

  async function onSubmitHandler(e) {
    e.preventDefault();
    const { oldPassword, newPassword, conPassword } = ref.current;
    const configuration = {
      method: 'post',
      url: 'http://localhost:5001/update-password',
      data: {
        passwordCurrent: oldPassword.value,
        password: newPassword.value,
        passwordConfirm: conPassword.value,
      },
      withCredentials: true,
    };
    try {
      await axios(configuration);
    } catch (error) {
      const { response } = error;
      throw json(
        { message: response.data.message },
        { status: response.data.status }
      );
    }
  }

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Password change</h2>
      <form
        ref={ref}
        method="post"
        action="/me"
        onSubmit={onSubmitHandler}
        className="form form-user-password"
      >
        <div className="form__group">
          <label className="form__label" htmlFor="password-current">
            Current password
          </label>
          <input
            className="form__input"
            id="password-current"
            type="password"
            placeholder="••••••••"
            required="required"
            minLength={8}
            name="oldPassword"
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            New password
          </label>
          <input
            className="form__input"
            id="password"
            type="password"
            placeholder="••••••••"
            required="required"
            minLength={8}
            name="newPassword"
          />
        </div>
        <div className="form__group ma-bt-lg">
          <label className="form__label" htmlFor="password-confirm">
            Confirm password
          </label>
          <input
            className="form__input"
            id="password-confirm"
            type="password"
            placeholder="••••••••"
            required="required"
            minLength={8}
            name="conPassword"
          />
        </div>
        <div className="form__group right">
          <button
            type="submit"
            className="btn btn--small btn--green btn--save-password"
          >
            Save password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
