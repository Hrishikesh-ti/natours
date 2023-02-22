function StoreUser( user ) {
  try {
    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo ? user.photo : 'default.jpg',
    };
    localStorage.setItem('user', JSON.stringify(userData));
  } catch (error) {
    console.log(error);
  }
}

export default StoreUser;
