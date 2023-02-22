import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Footer from './_footer';
import MainNavigation from './_header';

function Layout() {
  const data = useLoaderData();
  const { hasCookie, name, img } = data;

  return (
    <>
      <MainNavigation hasCookie={hasCookie} name={name} image={img} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;

export function loader() {
  const cookieData = document.cookie;

  let img = 'default.jpg';
  let name = '';

  if (cookieData) {
    const user = JSON.parse(localStorage.getItem('user'));
    img = user.photo;
    name = user.name;
  }
  if (!cookieData) {
    return { hasCookie: false };
  }
  const data = {
    hasCookie: true,
    img,
    name,
  };
  return data;
}
