import React, { useState, useRef, useCallback } from "react";
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
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import setCanvasPrev from "~/util/setCanvasPrev";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ProfileCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imgSrc, setImgSrc] = useState("");
  const [profileImg, setProfileImg] = useState(
    "https://via.placeholder.com/150"
  );
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setUploadedImage(file);
      setImageSelected(true);
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
    });
    if (file) reader.readAsDataURL(file);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    handleImageChange(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null;
    handleImageChange(file);
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

  const rotateLeft = () => {
    setRotation((prev) => prev - 45);
  };

  const rotateRight = () => {
    setRotation((prev) => prev + 45);
  };

  function onImageLoad(e: any) {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md">
      <div className="relative">
        <img
          src="https://via.placeholder.com/1200x300"
          alt="Cover Photo"
          className="w-full h-72 object-cover"
        />
        <div
          className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 cursor-pointer"
          onClick={openModal}
        >
          <CameraIcon className="h-6 w-6" />
        </div>
        <div className="absolute bottom-0 left-4 transform translate-y-1/2">
          <img
            src={profileImg}
            alt="Profile Picture"
            className="w-36 h-36 rounded-full border-4 border-white"
          />
          <div
            className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-2 cursor-pointer"
            onClick={openModal}
          >
            <CameraIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <div
            className="bg-white p-8 max-w-lg w-full rounded-lg relative"
            style={{
              minHeight: "350px",
              height: imageSelected ? "400px" : "350px",
              transition: "height 0.3s ease",
            }}
          >
            <div
              className="absolute top-2 right-2 cursor-pointer text-lg"
              onClick={closeModal}
            >
              <XMarkIcon className="h-6 w-6" />
            </div>
            <h3 className="text font-semibold mb-4">Upload Photo</h3>
            <div
              className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-4 shadow-xl h-[180px] w-full flex flex-col items-center justify-center"
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-10px)",
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {!imageSelected ? (
                <>
                  <div>
                    <ArrowUpCircleIcon
                      className="h-8 w-8 mb-2"
                      style={{ stroke: "blue" }}
                    />
                  </div>
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
                    onChange={handleFileInputChange}
                  />
                </>
              ) : (
                <div className="flex justify-center items-center w-full h-full overflow-hidden">
                  <ReactCrop
                    crop={crop}
                    circularCrop
                    keepSelection
                    aspect={ASPECT_RATIO}
                    minWidth={MIN_DIMENSION}
                    onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                  >
                    <img
                      ref={imgRef}
                      src={imgSrc}
                      className="object-cover rounded-lg"
                      style={{
                        transform: `scale(${
                          zoomLevel / 100
                        }) rotate(${rotation}deg)`,
                        maxHeight: "200px",
                      }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                </div>
              )}
            </div>
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
                  <ArrowUturnLeftIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={rotateLeft}
                  />
                  <ArrowUturnRightIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={rotateRight}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <button
                className={`px-8 py-2 rounded-full mr-4 ${
                  imageSelected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => {
                  const imgElement = imgRef.current;
                  const canvasElement = previewCanvasRef.current;

                  if (imgElement && canvasElement) {
                    setCanvasPrev(
                      imgElement,
                      canvasElement,
                      convertToPixelCrop(
                        crop,
                        imgElement.width,
                        imgElement.height
                      ),
                      zoomLevel,
                      rotation
                    );
                    const dataUrl = canvasElement.toDataURL();
                    setProfileImg(dataUrl);
                    closeModal();
                  }
                }}
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
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="w-36 h-36 rounded-full border-4 border-white hidden"
        />
      )}
    </div>
  );
};

export default ProfileCard;
