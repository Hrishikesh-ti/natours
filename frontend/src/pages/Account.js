import { Alert } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import StoreUser from '../components/StoreUser';
import BufferIcon from '../ui/BufferIcon';
import AdminDetail, { MeNavItem } from '../utils/AccountNavItems';
import ChangePassword from '../utils/ChangePassword';

function AccountPage() {
  const { name, role, photo, email } = useLoaderData();
  const navigation = useNavigation();
  const [image, changeImage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [imgFile, setImgFile] = useState(`/img/users/${photo}`);
  const isLoading = navigation.state === 'loading';

  async function submit(e) {
    e.preventDefault();
    const userData = new FormData();
    userData.append('photo', image);

    const configuration = {
      method: 'patch',
      url: 'http://localhost:5001/updateMe',
      data: userData,
      withCredentials: true,
    };
    try {
      const res = await axios(configuration);
      const { user } = res.data;
      if (user.photo) {
        setImgFile(`/img/users/${user.photo}`);
      }
      setShowSuccess(true);
      StoreUser(user);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      // console.log(error);
    }
  }

  function changeImageHandler(event) {
    changeImage(event.target.files[0]);
  }

  return (
    <>
      {showSuccess && (
        <Alert className="alert" variant="filled" severity="success">
          Profile updated successfully!
        </Alert>
      )}
      {isLoading && <BufferIcon />}
      <main className="main">
        <div className="user-view">
          <nav className="user-view__menu">
            <ul className="side-nav">
              <MeNavItem />
              {role && role === 'admin' && <AdminDetail />}
            </ul>
          </nav>

          <div className="user-view__content">
            <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">
                Your account settings
              </h2>
              <Form onSubmit={submit} className="form form-user-data">
                <div className="form__group">
                  <label className="form__label" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="form__input"
                    id="name"
                    type="text"
                    defaultValue={`${name}`}
                    required="required"
                    name="name"
                  />
                </div>
                <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    className="form__input"
                    id="email"
                    type="email"
                    defaultValue={`${email}`}
                    required="required"
                    name="email"
                  />
                </div>
                <div className="form__group form__photo-upload">
                  <img className="form__user-photo" src={imgFile} alt="User" />
                  <input
                    className="form__upload"
                    type="file"
                    accept="img/*"
                    id="photo"
                    name="photo"
                    onChange={changeImageHandler}
                  />
                  <label htmlFor="photo">Choose new photo</label>
                </div>
                <div className="form__group right">
                  <button type="submit" className="btn btn--small btn--green">
                    Save settings
                  </button>
                </div>
              </Form>
            </div>

            <div className="line">&nbsp;</div>
            <ChangePassword />
          </div>
        </div>
      </main>
    </>
  );
}

export default AccountPage;

export function loader() {
  const cookie = document.cookie;
  if (!cookie) return redirect('/login');
  const storedUserData = JSON.parse(localStorage.getItem('user'));
  const userData = {
    name: storedUserData.name,
    email: storedUserData.email,
    photo: storedUserData.photo,
    role: storedUserData.role,
  };

  return userData;
}
