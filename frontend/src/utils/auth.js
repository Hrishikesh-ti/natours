export default function getAuthUser() {
  const user = localStorage.getItem('user');
  return user;
}

export function tokenLoader() {
  return getAuthUser();
}

