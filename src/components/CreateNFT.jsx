import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
//_____________________________
import { HiSelector } from "react-icons/hi";
import { GoCheck } from "react-icons/go";
import { BiEdit, BiImageAdd, BiLoaderAlt } from "react-icons/bi";
//_____________________________
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useMoralis } from "react-moralis";
//_____________________________
import { NFTMinterOneAddress, NFTMinterTwoAddress } from "../config";
import NFTMinterOne from "../artifacts/contracts/NFTMinterOne.sol/NFTMinterOne.json";
import NFTMinterTwo from "../artifacts/contracts/NFTMinterTwo.sol/NFTMinterTwo.json";
import MessagePopup from "./subComponents/MessagePopup";
import TransactionPopup from "./subComponents/TransactionPopup";
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
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  // Moralis
  const { authenticate, isAuthenticated, Moralis } = useMoralis();
  // Form
  const [selected, setSelected] = useState(collection[0]);
  const [creating, setCreating] = useState(false);
  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  // Message Popup
  const [popup, setPopup] = useState({
    isOpen: false,
    heading: "",
    message: "",
  });
  const handlePopupState = (popupState) => {
    setPopup(popupState, "", "");
  };
  const triggerPopup = (heading, message) => {
    setPopup({ isOpen: true, heading, message });
  };
  // Message Popup --END
  // Transaction Popup
  const [transPopup, setTransPopup] = useState({
    isOpen: false,
    message: "",
  });
  const handleTransPopupState = (popupState) => {
    setTransPopup(popupState, "");
  };
  const triggerTransPopup = (message) => {
    setTransPopup({ isOpen: true, message });
  };
  // Transaction Popup --END
  // 1.Upload file [i.e. Image] to IPFS
  const handleUploadImage = async (event) => {
    console.log("Handle Image Upload");
    const data = event.target.files[0];
    try {
      if (isAuthenticated) {
        console.log("Image Uploading...");
        const file = new Moralis.File(data.name, data);
        await file.saveIPFS({ useMasterKey: true }).then((response) => {
          setFormInput({ ...formInput, imageUrl: response.ipfs() });
        });
      } else {
        if (!window.ethereum)
          triggerPopup(
            "Warring",
            "Non ethereum enabled browser... \n Download Metamask"
          );
        else authenticate();
      }
    } catch (error) {
      triggerPopup("Error", error.message);
    }
  };
  // 2.Creating Item and Saving it to IPFS
  const createItem = async (e) => {
    const { name, description, imageUrl } = formInput;
    // // Return if there is no name, description or file URL
    if (!name || !description || !imageUrl) {
      triggerPopup("Error", "Upload Name, Description, and Image");
      return;
    }
    setCreating(true);
    const metadata = {
      name: name,
      description: description,
      image: imageUrl,
    };
    setFormInput({ name: "", description: "", imageUrl: "" });
    e.preventDefault();
    // Save Token Metadata to IPFS
    try {
      const file = new Moralis.File("file.json", {
        base64: btoa(JSON.stringify(metadata)),
      });
      // Upload Token URI
      if (isAuthenticated) {
        await file.saveIPFS({ useMasterKey: true }).then((responce) => {
          mintItem(responce.ipfs());
        });
      } else {
        triggerPopup("Error", "User not Authenticated");
        setCreating(false);
        return;
      }
    } catch (error) {
      triggerPopup("Error in Uplading Token MetaData to IPFS:", error.message);
      setCreating(false);
    }
  };
  // 3.Mint item
  const mintItem = async (url) => {
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
    try {
      if (selected.id === 1) transaction = await contract1.createToken(url);
      else if (selected.id === 2)
        transaction = await contract2.createToken(url);
      let tx = await transaction.wait(); // wait for transaction to complete...
      // Trigger Transaction Popup
      triggerTransPopup(JSON.stringify(tx));
      setCreating(false);
    } catch (error) {
      triggerPopup("Error", error.message);
      setCreating(false);
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      triggerPopup("Warring", "Non ethereum enabled browser");
    }
  }, []);

  return (
    <div className="p-4 my-10 flex justify-center w-full">
      <div className="xl:w-3/5 lg:w-1/2 md:w-10/12 sm:w-11/12 justify-center">
        {popup.isOpen && (
          <MessagePopup
            isOpen={popup.isOpen}
            heading={popup.heading}
            message={popup.message}
            handlePopup={handlePopupState}
          />
        )}
        {transPopup.isOpen && (
          <TransactionPopup
            isOpen={transPopup.isOpen}
            message={transPopup.message}
            handlePopup={handleTransPopupState}
          />
        )}

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
                {formInput.imageUrl ? (
                  <img
                    src={formInput.imageUrl}
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
                      required
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
                  className="border border-white dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-primary bg-transparent placeholder-gray-500 text-gray-100 dark:text-gray-400"
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
                disabled={
                  !formInput.imageUrl ||
                  !formInput.name ||
                  !formInput.description
                }
                type="submit"
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-lg text-sm font-medium rounded-md  ${
                  formInput.imageUrl && formInput.name && formInput.description
                    ? "text-primary bg-secondary border-primary hover:bg-primary hover:text-secondary"
                    : " cursor-not-allowed bg-green-100 text-gray-400"
                }`}
                onClick={(event) => createItem(event)}
              >
                {creating ? (
                  <span className="flex">
                    <BiLoaderAlt className="animate-spin h-5 w-5 mr-3" />
                    Creating...
                  </span>
                ) : (
                  <span>Create</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateNFT;
