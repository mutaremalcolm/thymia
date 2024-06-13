"use client"

import React from 'react';
import Link from 'next/link';
import  ThemeToggle  from '../components/ThemeToggle'; 
import { X, GitBranch, Brain } from 'lucide-react';


const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Brain size={24} className="text-black mr-2" />
          <span className="text-black text-xl font-semibold">Two-Brain</span>
        </div>

        <div className="flex items-center space-x-4">  
          <X size={24} className="text-black cursor-pointer" />
          <Link href="https://github.com/mutaremalcolm/Thymia" target="_blank" rel="noopener noreferrer">
            <GitBranch size={24} className="text-black cursor-pointer" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
