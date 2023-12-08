import React from 'react';

export default async function EditPost({ params }: { params: { id: string } }) {
  return (
    <>
      <p>{params.id}</p>
    </>
  );
}
