import { Skeleton } from '@mui/material';
import { RiExpandUpDownLine } from '@remixicon/react';

function SkeletonUserPanel() {
  return (
    <>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="rounded" width={200} height={40} />
      <div className="ml-auto cursor-pointer hover:bg-zinc-800 hover:shadow-inner rounded-full p-2">
        <RiExpandUpDownLine />
      </div>
    </>
  );
}

export { SkeletonUserPanel };
