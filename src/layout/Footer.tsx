import React from 'react'

import { Typography } from "@material-tailwind/react";
 
export default function Footer() {
  return (
    <footer className="sticky top-[100vh] flex w-full flex-row flex-wrap items-center justify-center px-7 border-t border-blue-gray-50 py-3 text-center md:justify-between">
      <Typography variant="small" color="blue-gray" className="font-normal">
        &copy; 2023 CTQM Group
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li className='py-1 px-4 hover:bg-slate-200 hover:rounded transition duration-150 ease-out hover:ease-in'>
          <Typography variant="small" as="a" href="#" className="font-normal transition-colors focus:text-blue-500">
            License
          </Typography>
        </li>
        <li className='py-1 px-4 hover:bg-slate-200 hover:rounded transition duration-150 ease-out hover:ease-in'>
          <Typography variant="small" as="a" href="#" className="font-normal transition-colors focus:text-blue-500">
            Support
          </Typography>
        </li>
        <li className='py-1 px-4 hover:bg-slate-200 hover:rounded transition duration-150 ease-out hover:ease-in'>
          <Typography variant="small" as="a" href="#" className="font-normal transition-colors focus:text-blue-500">
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
