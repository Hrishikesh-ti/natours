import axios from 'axios';
import { Fragment, Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import TourItem from '../components/TourItem';
import BufferIcon from '../ui/BufferIcon';

function ToursPage() {
  const { tours } = useLoaderData();

  return (
    <Fragment>
      <main className="main">
        <div className="card-container">
          <Suspense fallback={<BufferIcon />}>
            <Await resolve={tours}>
              {(loadedTours) =>
                loadedTours.map((tour, ind) => (
                  <TourItem tour={tour} key={ind} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </main>
    </Fragment>
  );
}
export default ToursPage;

async function loadTours() {
  try {
    const response = await axios.get('https://natours-api-1zra.onrender.com/');
    const { tours } = response.data;

    return tours;
  } catch (error) {
    throw json({ message: error.message }, { status: 500 });
  }
}

export function loader() {
  return defer({
    tours: loadTours(),
  });
}
