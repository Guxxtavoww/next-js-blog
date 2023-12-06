'use client';

import React from 'react';
import { SiGithub } from 'react-icons/si';

import Loader from '../../ui/loader';
import { Button } from '../../ui/button';
import { useGithubLogin } from '../hooks/github-login.hook';

export default function GithubLogin() {
  const { isPending, mutateAsync } = useGithubLogin();

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => mutateAsync()}
      disabled={isPending}
    >
      {isPending ? (
        <Loader />
      ) : (
        <>
          <SiGithub /> Login
        </>
      )}
    </Button>
  );
}
