import React from 'react';
import Link from 'next/link';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export default function Footer() {
  return (
    <footer className=" border-t py-10">
      <div className="max-w-7xl py-10 px-5 md:p-0 space-y-5  mx-auto flex justify-between md:items-end flex-col md:flex-row">
        <div className="space-y-10">
          <div className="space-y-2 w-full sm:w-96">
            <h1 className="text-3xl font-bold">Next JS Blog</h1>
            <p className="">
              Explore um mundo de insights e conhecimento de codificação em
              nosso blog site, onde cada artigo é um passo para dominar a arte
              de programação e permanecer à frente no cenário tecnológico
              dinâmico
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/Guxxtavoww"
              className="hover:text-green-500"
              passHref
              target="_blank"
            >
              <GitHubLogoIcon className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/gustavo-augusto-3a513b1b5/"
              className="hover:text-green-500"
              passHref
              target="_blank"
            >
              <LinkedInLogoIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <h1 className="text-sm">
          &copy; 2023 Gustavo Augusto. Todos os direitos reservados.
        </h1>
      </div>
    </footer>
  );
}
