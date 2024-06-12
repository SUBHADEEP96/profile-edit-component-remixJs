import React, { useState } from "react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const ProfileCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setUploadedImage(file);
      setImageSelected(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md ">
      {/* Cover Photo */}
      <div className="relative">
        <img
          src="https://via.placeholder.com/1200x300"
          alt="Cover Photo"
          className="w-full h-72 object-cover"
        />
        {/* Camera Icon for Cover Photo */}
        <div
          className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 cursor-pointer"
          onClick={openModal}
        >
          <CameraIcon className="h-6 w-6" />
        </div>
        {/* Profile Picture */}
        <div className="absolute bottom-0 left-4 transform translate-y-1/2">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            className="w-36 h-36 rounded-full border-4 border-white"
          />
          {/* Camera Icon for Profile Picture */}
          <div
            className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-2 cursor-pointer"
            onClick={openModal}
          >
            <CameraIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <div
            className="bg-white p-8 max-w-lg w-full  rounded-lg relative"
            style={{
              minHeight: "350px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Close Icon */}
            <div
              className="absolute top-2 right-2 cursor-pointer text-lg"
              onClick={closeModal}
            >
              {/* X */}
              <XMarkIcon className="h-6 w-6" />
            </div>
            {/* Modal Header */}
            <h3 className="text font-semibold mb-4">Upload Photo</h3>
            {/* Drop Zone */}
            <div
              className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-4 shadow-xl h-[180px] w-full flex flex-col items-center justify-center"
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-10px)",
              }}
            >
              {!imageSelected ? (
                <>
                  {/* Drag and Drop Area */}
                  <div>
                    <ArrowUpCircleIcon
                      className="h-8 w-8 mb-2"
                      style={{ stroke: "blue" }}
                    />
                  </div>
                  {/* Or Upload Button */}
                  <p>
                    <span>
                      Drag and Drop or{" "}
                      <label
                        htmlFor="fileInput"
                        className="cursor-pointer text-blue-500 mt-2 pb-2 underline"
                      >
                        Choose File
                      </label>{" "}
                      to Upload
                    </span>
                  </p>

                  <span className="text-gray-400">Files must be under 5MB</span>

                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </>
              ) : (
                <>
                  <img
                    src={URL.createObjectURL(uploadedImage as Blob)}
                    alt=""
                    className="max-h-full max-w-full object-cover rounded-lg"
                  />
                </>
              )}
            </div>
            {/* Image Controls */}
            {imageSelected && (
              <div className="flex flex-between items-center mb-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={0}
                  onChange={() => {}}
                  className="w-full mb-2"
                />
                <div className="flex space-x-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                    // onClick={flipImage}
                  >
                    Flip Image
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-full"
                    // onClick={resetImage}
                  >
                    Reset Image
                  </button>
                </div>
              </div>
            )}

            {/*  */}

            {/* Buttons */}
            <div className="flex justify-center">
              <button
                className="bg-gray-200 text-black px-8 py-2 rounded-full mr-4"
                onClick={closeModal}
              >
                Save
              </button>
              <button
                className="border border-black text-black bg-white px-8 py-2 rounded-full"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
            <div className="flex justify-center">
              <p
                className="text-red-500 underline m-1 cursor-pointer"
                onClick={() => setImageSelected(false)}
              >
                Remove Photo
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
