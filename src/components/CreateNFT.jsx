import React, { useState, Fragment, useRef } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
//_____________________________
import { HiSelector } from "react-icons/hi";
import { GoCheck } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";
import { BiEdit, BiImageAdd, BiLoaderAlt } from "react-icons/bi";
//_____________________________
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useMoralis } from "react-moralis";
//_____________________________
import { NFTMinterOneAddress, NFTMinterTwoAddress } from "../config";
import NFTMinterOne from "../artifacts/contracts/NFTMinterOne.sol/NFTMinterOne.json";
import NFTMinterTwo from "../artifacts/contracts/NFTMinterTwo.sol/NFTMinterTwo.json";
//_____________________________

const collection = [
  {
    id: 1,
    name: "Humpty",
    avatar:
      "https://lh3.googleusercontent.com/uAg_pQTisrh5N3fXGGo1y60X3CIBXju59lAQZMTG4NNA1UkqfwjfOEIlKnEuPy5o72RoFv_baFDbneBJGrKFJlnQV0Yi_262yfXL=s130",
  },
  {
    id: 2,
    name: "Sneeky",
    avatar:
      "https://lh3.googleusercontent.com/2CXSiJHhSHccIL2KREdHqlEAiSgz5cCk2fbcI3cXOh2FQanfDfTvRde9_jY_ysc9_PZl3lO0JzeHX_ONdAdQ38RkZoYDXT7_qn0-YQ=s0",
  },
];

const CreateNFT = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
  });
  const [txDetails, setTxDetails] = useState("");
  const [selected, setSelected] = useState(collection[0]);
  const [creating, setCreating] = useState(false);
  //Popup
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // Moralis
  const { Moralis } = useMoralis();
  // Upload file [i.e. Image] to IPFS
  const handleUploadImage = async (event) => {
    const data = event.target.files[0];
    try {
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS({ useMasterKey: true }).then((response) => {
        setImageUrl(response.ipfs());
      });
    } catch (error) {
      console.log("Error Uplading Image to IPFS:", error);
    }
  };
  // Creating Item and Saving it to IPFS
  const createItem = async (e) => {
    const { name, description } = formInput;
    // Return if there is no name, description or file URL
    if (!name || !description || !imageUrl) return;
    setCreating(true);
    const metadata = {
      name: name,
      description: description,
      image: imageUrl,
    };
    setFormInput({ ...formInput, name: "", description: "" });
    e.preventDefault();
    setImageUrl("");
    // Save Token Metadata to IPFS
    try {
      const file = new Moralis.File("file.json", {
        base64: btoa(JSON.stringify(metadata)),
      });
      // Upload Token URI
      await file.saveIPFS({ useMasterKey: true }).then((responce) => {
        mintItem(responce.ipfs());
        setCreating(false);
      });
    } catch (error) {
      console.log("Error in Uplading Token MetaData to IPFS:", error);
    }
  };
  //  1.Mint item
  const mintItem = async (url) => {
    console.log("Minting... ");
    const web3Modal = new Web3Modal({});
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // NFT Contract
    let contract1 = new ethers.Contract(
      NFTMinterOneAddress,
      NFTMinterOne.abi,
      signer
    );
    let contract2 = new ethers.Contract(
      NFTMinterTwoAddress,
      NFTMinterTwo.abi,
      signer
    );
    let transaction;
    // Creating a new Token[i.e. NFT]
    if (selected.id === 1) transaction = await contract1.createToken(url);
    else if (selected.id === 2) transaction = await contract2.createToken(url);
    let tx = await transaction.wait(); // wait for transaction to complete...
    setTxDetails(tx);
    setOpen(true);
    console.log("Output:", tx);
  };

  return (
    <div className="p-4 my-10 flex justify-center w-full">
      <div className="xl:w-3/5 lg:w-1/2 md:w-10/12 sm:w-11/12 justify-center">
        {/* Popup */}
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

              {/* This element is to trick the browser into centering the modal contents. */}
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
                          className="text-xl font-bold leading-6 font-medium text-gray-900"
                        >
                          {txDetails?.confirmations === 1
                            ? "Transaction Successful!"
                            : "Transaction Unsuccessful"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm font-bold text-white">
                            {txDetails?.confirmations === 1 ? (
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
        {/* Popup End */}
        <h1 className="text-white font-semibold text-4xl mb-5">
          Create your NFT
        </h1>
        <form action="#" method="POST">
          <div className=" shadow-lg sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 backdrop-filter backdrop-blur-lg opacity-90 bg-gradient-to-l from-green-400 to-amber-400 space-y-6 sm:p-6">
              {/* Image */}
              <label className="text-lg font-semibold text-white dark:text-gray-100">
                Image, Video, Audio, or 3D Model
                <p className=" text-xs">
                  File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                  OGG, GLB, GLTF. Max size: 100 MB
                </p>
              </label>
              <div className="rounded relative h-48">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="pic"
                    className="w-full h-full object-cover rounded absolute shadow"
                  />
                ) : (
                  <BiImageAdd className="w-full h-full p-10 object-cover rounded absolute shadow" />
                )}

                <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                <div className="flex items-center rounded absolute right-0 mr-4 mt-4">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer p-2 rounded-md font-medium text-gray-200 hover:text-primary focus:text-green-200"
                  >
                    <p className="text-xs flex items-center">
                      Upload your Asset
                      <span className="ml-2">
                        <BiEdit />
                      </span>
                    </p>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleUploadImage}
                    />
                  </label>
                </div>
              </div>
              {/* Name */}
              <div className="mt-16 flex flex-col w-full">
                <label
                  htmlFor="name"
                  className="pb-2 text-xl font-semibold text-white dark:text-gray-100"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="border border-white dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-primary bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                  placeholder="@nft_name"
                  value={formInput.name}
                  onChange={(event) =>
                    setFormInput({ ...formInput, name: event.target.value })
                  }
                />
              </div>
              {/* Desccription */}
              <div className="mt-8 flex flex-col w-full">
                <label
                  htmlFor="description"
                  className="pb-2 text-xl font-semibold text-white dark:text-gray-100"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  className="bg-transparent border border-white dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-primary resize-none placeholder-gray-500 text-gray-100 dark:text-gray-200"
                  placeholder="Brief description for your asset."
                  rows={5}
                  value={formInput.description}
                  onChange={(event) =>
                    setFormInput({
                      ...formInput,
                      description: event.target.value,
                    })
                  }
                />
              </div>
              {/* DropDown */}
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-xl font-semibold text-white">
                      Collection
                    </Listbox.Label>
                    <div className=" relative">
                      <Listbox.Button className="relative w-full bg-tranparent border border-white rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                        <span className="flex items-center">
                          <img
                            src={selected.avatar}
                            alt="contract"
                            className="flex-shrink-0 h-6 w-6 rounded-full"
                          />
                          <span className="ml-3 block truncate text-white">
                            {selected.name}
                          </span>
                        </span>
                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <HiSelector
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-secondary border-primary border shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {collection.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "text-gray-900 bg-primary"
                                    : "text-white",
                                  "cursor-default select-none relative py-2 pl-3 pr-9"
                                )
                              }
                              value={person}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <img
                                      src={person.avatar}
                                      alt=""
                                      className="flex-shrink-0 h-6 w-6 rounded-full"
                                    />
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-bold"
                                          : "font-semibold",
                                        "ml-3 block truncate"
                                      )}
                                    >
                                      {person.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? "text-black" : "text-primary",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <GoCheck
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            {/* Create */}
            <div className="px-4 py-3 bg-secondary text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-lg text-sm font-medium rounded-md text-primary bg-secondary border-primary hover:bg-primary hover:text-secondary"
                onClick={(event) => createItem(event)}
              >
                {creating && (
                  <BiLoaderAlt className="animate-spin h-5 w-5 mr-3 text-primary hover:text-secondary" />
                )}
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateNFT;
