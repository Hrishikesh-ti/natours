import { Navigate, useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent.js';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';
  message = error.message;
  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      {error && error.status === 401 && <Navigate to="/login" replace={true} />}
      {error && error.status !== 401 && (
        <PageContent title={title}>
          <p>{message}</p>
        </PageContent>
      )}
      {/* )} */}
    </>
  );
}

export default ErrorPage;
