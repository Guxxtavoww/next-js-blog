'use client';

import React from 'react';
import NavLinks from './components/nav-links';

export default function Layout(props: WithChildren) {
  return (
    <div className="space-y-5">
      <NavLinks />
      {props.children}
    </div>
  );
}
