import React from 'react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-foco-blue text-white text-center text-[11px] sm:text-sm py-2 sm:py-3 px-2 sm:px-4">
        <p className="max-w-screen-md mx-auto leading-tight sm:leading-normal">
          On your first order{" "}
          <span className="font-bold bg-foco-orange px-2 py-1 rounded-md inline-block">
            30% OFF
          </span>{" "}
          | For all products buy now and get the offer
        </p>
      </div>
    </header>
  );
};

export default Navbar;
