import { CircularProgress } from '@mui/material';

function BufferIcon() {
  return (
    <div
      style={{
        margin: ' auto',
        display: 'flex',
      }}
    >
      <CircularProgress
        style={{
          margin: 'auto',
        }}
        color="success"
      />
    </div>
  );
}

export default BufferIcon;
