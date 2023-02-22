import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckAuth(props) {
  const cookieData = document.cookie;
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookieData) {
      navigate('/login');
    }
  }, [navigate, cookieData]);

  return <>{props.children}</>;
}

export default CheckAuth;
