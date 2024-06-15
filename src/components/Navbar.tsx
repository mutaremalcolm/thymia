"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ModeToggle  from '../components/ThemeToggle';
import { X, GitBranch, Brain } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="./" className="flex items-center">
          <Brain size={24} className="text-black dark:text-white mr-2" />
          <span className="text-black dark:text-white text-xl font-semibold">
            Two-Back
          </span>
        </Link>

        <div className="flex items-center space-x-4">
        <Image src='/assets/navbar/x.jpeg' alt='hero image' width={24} height={24} className="text-black dark:text-white cursor-pointer"/>
          <Link
            href="https://github.com/mutaremalcolm/Thymia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitBranch
              size={24}
              className="text-black dark:text-white cursor-pointer"
            />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
