import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} All-in-One Solana App. All rights reserved.</p>
        <p>
          <a href="https://github.com/shikhar-4739/wallet-adapter" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            GitHub
          </a>
          {' | '}
          <a href="https://x.com/ShikharVar77009" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            Twitter
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;