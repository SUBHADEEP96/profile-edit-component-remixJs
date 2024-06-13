import React, { useState } from "react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  ArrowUpCircleIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;
const ProfileCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipped, setFlipped] = useState(false);
  //

  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  //
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

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
      console.log(imageUrl);
    });
    reader.readAsDataURL(file as Blob);
  };

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(parseInt(event.target.value));
  };
  const zoomIn = () => {
    setZoomLevel((prev) => prev + 10);
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 10));
  };

  function onImageLoad(e: any) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: "%",
          width: 90,
        },
        1,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }

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
              height: imageSelected ? "400px" : "350px",
              transition: "height 0.3s ease",
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
                <div
                  className="flex justify-center items-center w-full h-full"
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                  }}
                >
                  {/* <img
                    src={URL.createObjectURL(uploadedImage as Blob)}
                    alt=""
                    className="max-h-full max-w-full object-cover rounded-lg"
                  /> */}
                  <ReactCrop
                    crop={crop}
                    circularCrop
                    keepSelection
                    aspect={ASPECT_RATIO}
                    minWidth={MIN_DIMENSION}
                    onChange={(c) => {
                      // console.log("c = > ", c);
                      // const centeredCrop = centerCrop(c, c.width, c.height);
                      return setCrop(c);
                    }}
                  >
                    <img
                      src={imgSrc}
                      className=" object-cover rounded-lg"
                      style={{ maxHeight: "170px" }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                </div>
              )}
            </div>
            {/* Image Controls */}
            {imageSelected && (
              <div className="flex justify-between mb-2">
                <div className="flex">
                  <MinusCircleIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={zoomOut}
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={zoomLevel}
                    onChange={handleZoomChange}
                    className="w-40 mx-2"
                  />
                  <PlusCircleIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={zoomIn}
                  />
                </div>
                <div className="flex space-x-2">
                  <ArrowUturnLeftIcon className="h-6 w-6 cursor-pointer" />
                  <ArrowUturnRightIcon className="h-6 w-6 cursor-pointer" />
                </div>
              </div>
            )}

            {/*  */}

            {/* Buttons */}
            <div className="flex justify-center">
              <button
                className={`px-8 py-2 rounded-full mr-4 ${
                  imageSelected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
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
