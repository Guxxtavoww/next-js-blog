'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className=" animate-pulse space-y-5">
      <div className="flex justify-between items-center">
        <h1 className=" h-10 w-56 bg-graident-dark rounded-md"></h1>
        <h1 className=" h-10  w-48 bg-graident-dark rounded-md"></h1>
      </div>
      <div className=" border h-96 rounded-md bg-graident-dark "></div>
    </div>
  );
}
