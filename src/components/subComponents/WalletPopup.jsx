import { React, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GiFrozenBlock } from "react-icons/gi";
import { HiArrowNarrowRight } from "react-icons/hi";
const WalletPopup = ({ isOpen, closeModal }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl">
                <div className="flex justify-center">
                  <GiFrozenBlock className="w-12 h-12 rounded-full bg-secondary text-primary" />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-white flex justify-center m-4"
                >
                  Connect Wallet
                </Dialog.Title>
                <div>
                  {/* Metamask */}
                  <div className="p-4 mb-4 font-bold w-full flex items-center rounded-md border border-gray-500  hover:text-secondary hover:bg-primary hover:border-primary">
                    <img
                      src={process.env.PUBLIC_URL + "/images/metamask-logo.svg"}
                      alt="metamask"
                      className="mr-4"
                    />
                    Metamask
                    <HiArrowNarrowRight className="ml-auto text-2xl text-primary hover:text-secondary" />
                  </div>
                  {/* Metamask */}
                  <div className="p-4 mb-4 font-bold w-full flex items-center rounded-md border border-gray-500  hover:text-secondary hover:bg-primary hover:border-primary">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/walletconnect-logo.svg"
                      }
                      alt="metamask"
                      className="mr-4"
                    />
                    Wallet Connect
                    <HiArrowNarrowRight className="ml-auto text-2xl text-primary hover:text-secondary" />
                  </div>
                  {/* Metamask */}
                  <div className="p-4 mb-4 font-bold w-full flex items-center rounded-md border border-gray-500  hover:text-secondary hover:bg-primary hover:border-primary">
                    <img
                      src={process.env.PUBLIC_URL + "/images/trustwallet.svg"}
                      alt="trust wallet"
                      className="mr-4"
                      width={30}
                      height={30}
                    />
                    Trust Wallet
                    <HiArrowNarrowRight className="ml-auto text-2xl text-primary hover:text-secondary" />
                  </div>
                  {/* Metamask */}
                  <div className="p-4 mb-4 font-bold w-full flex items-center rounded-md border border-gray-500  hover:text-secondary hover:bg-primary hover:border-primary">
                    <img
                      src={process.env.PUBLIC_URL + "/images/dcent-logo.svg"}
                      alt="dcent wallet"
                      className="mr-4"
                    />
                    D'CENT Wallet
                    <HiArrowNarrowRight className="ml-auto text-2xl text-primary hover:text-secondary" />
                  </div>
                </div>


                  <p className="mt-4 text-xs text-center ">
                    By connecting, you agree to our <span className=" text-primary cursor-pointer">Terms</span> and <span className="text-primary cursor-pointer">Protocol
                    Disclaimer</span>.
                  </p>

              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default WalletPopup;
