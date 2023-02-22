import axios from 'axios';
import { Suspense } from 'react';
import { json, defer, Await, useLoaderData } from 'react-router-dom';
import DetailPage from '../components/Details';
import BufferIcon from '../ui/BufferIcon';

function TourDetailPage() {
  const { tour } = useLoaderData();

  return (
    <Suspense fallback={<BufferIcon />}>
      <Await resolve={tour}>
        {(loadedTour) => {
          return <DetailPage tour={loadedTour} />;
        }}
      </Await>
    </Suspense>
  );
}

async function loadTour(id) {
  try {
    const response = await axios.get('http://localhost:5001/tour/' + id, {
      withCredentials: true,
    });
    const { tour } = response.data;
    return tour;
  } catch ({ response }) {
    const error = response.data;
    throw json({ message: error.message }, { status: error.status });
  }
}

export function loader({ params }) {
  const id = params.tourId;

  return defer({
    tour: loadTour(id),
  });
}

export default TourDetailPage;
