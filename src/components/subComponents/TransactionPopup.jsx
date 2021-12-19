import React, { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

function TransactionPopup() {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className=" bg-green-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold leading-6 text-gray-900"
                    >
                      {txDetails?.confirmations === 1
                        ? "Transaction Successful!"
                        : "Transaction Unsuccessful"}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm font-bold text-white">
                        {txDetails?.status === 1 ? (
                          <div>
                            <p>FROM:</p>
                            {txDetails?.from}
                            <p>FROM:</p>
                            <p>TO:</p>
                            {txDetails?.to}
                            <p>
                              Transaction Hash:
                              <span className="flex">
                                {txDetails?.transactionHash}{" "}
                                <span
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      txDetails?.transactionHash
                                    );
                                  }}
                                >
                                  <MdContentCopy />
                                </span>
                              </span>
                            </p>
                          </div>
                        ) : (
                          "Transaction unSuccessful"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-primary px-6 py-2 bg-transparent text-base font-medium text-primary hover:bg-primary hover:text-secondary sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default TransactionPopup;