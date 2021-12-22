import React, { useState } from "react";
import { GiFrozenBlock } from "react-icons/gi";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import WalletPopup from "./subComponents/WalletPopup";

const Header = () => {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  return (
    <React.Fragment>
      <WalletPopup isOpen={isOpen} closeModal={closeModal}/>
      <div className="m-3 rounded-lg">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            {/* Left */}
            <div className="w-80 flex items-center">
              <span className="flex p-2 rounded-lg bg-white">
                <GiFrozenBlock
                  className="h-6 w-6 text-black"
                  aria-hidden="true"
                />
              </span>
            </div>

            {/* Mid */}
            <div className="">
              <strong className=" text-gray-300 cursor-pointer hover:text-primary mx-4">
                <Link to="/">Explore</Link>
              </strong>
              <strong className=" text-gray-300 cursor-pointer hover:text-primary mx-4">
                <Link to="/guide">User Guide</Link>
              </strong>
              <strong className=" text-gray-300 cursor-pointer hover:text-primary mx-4">
                About
              </strong>
            </div>

            {/* Right */}
            <div className="flex w-80 md:w-auto sm:auto sm:flex justify-between ">
              {/* Create NFT */}
              <div className="order-1 mt-2 mx-4 flex-shrink-0 sm:order-4 sm:mt-0   text-primary border border-primary rounded-lg hover:text-black hover:bg-primary ">
                <Link to="/create">
                  <span className="flex items-center justify-center px-4 py-2 text-sm font-medium ">
                    <IoMdAddCircle className="h-4 w-4" aria-hidden="true" />
                    &nbsp; Create
                  </span>
                </Link>
              </div>
              {/* Connect */}
              <div className="order-1 mt-2 mx-4 flex-shrink-0 sm:order-4 sm:mt-0  text-white border border-gray-400 rounded-lg hover:text-primar hover:border-primary hover:text-primary">
                <span
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium cursor-pointer"
                  onClick={openModal}
                >
                  Connect Wallet
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Header;
