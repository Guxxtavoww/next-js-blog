'use client';

import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <FaSpinner className="animate-spin text-2xl color-gray-400" />
    </div>
  );
}
