'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@mui/material';
import { RiExpandUpDownLine } from '@remixicon/react';

import { UserPanelOptions } from './UserPanelOptions';
import { SkeletonUserPanel } from './SkeletonUserPanel';

function UserPanel({user, rol, status}) {
  const [isUserPanelOptionsOpen, setIsUserPanelOptionsOpen] = useState();

  return (
    <>
      <div className="mt-auto bg-zinc-700 rounded-md mb-2 mx-2 shadow-inner select-none py-3">
        <div className="flex shadow-inner justify-center items-center gap-4 pl-3 pr-1">
          {status === 'authenticated' ? (
            <>
              <img
                src="/profile-placeholder.jpg"
                alt="user-profile"
                className="rounded-full w-[50px] h-[50px] object-cover"
              />
              <ul className="flex flex-col justify-center items-start">
                <li className="font-bold">{user}</li>
                <li className="opacity-80">{rol}</li>
              </ul>
              <div
                className="ml-auto cursor-pointer hover:bg-zinc-800 hover:shadow-inner rounded-full p-2"
                onClick={() =>
                  setIsUserPanelOptionsOpen(!isUserPanelOptionsOpen)
                }
              >
                <RiExpandUpDownLine />
              </div>
            </>
          ) : (
            <SkeletonUserPanel
              isUserPanelOptionsOpen={isUserPanelOptionsOpen}
              setIsUserPanelOptionsOpen={setIsUserPanelOptionsOpen}
            />
          )}
        </div>
      </div>
      <AnimatePresence>
        {isUserPanelOptionsOpen && <UserPanelOptions />}
      </AnimatePresence>
    </>
  );
}

export { UserPanel };
