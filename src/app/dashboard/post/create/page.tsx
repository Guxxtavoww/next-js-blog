'use client';

import React from 'react';
import CreatePostForm from './components/create-post-form';

export default function CreatePost() {
  return <CreatePostForm onSubmit={(data) => console.log(data)} />;
}
