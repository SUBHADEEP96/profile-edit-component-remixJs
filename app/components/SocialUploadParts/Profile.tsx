// import React, { useState, useRef } from "react";
// import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
// import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
// import {
//   ArrowUpCircleIcon,
//   PlusCircleIcon,
//   MinusCircleIcon,
//   ArrowUturnLeftIcon,
//   ArrowUturnRightIcon,
// } from "@heroicons/react/24/outline";
// import ReactCrop, {
//   centerCrop,
//   convertToPixelCrop,
//   makeAspectCrop,
//   type Crop,
// } from "react-image-crop";
// import setCanvasPrev from "~/util/setCanvasPrev";
// import "react-image-crop/dist/ReactCrop.css";

// const ASPECT_RATIO = 1;
// const MIN_DIMENSION = 120;
// const Profile = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [imageSelected, setImageSelected] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState<File | null>(null);
//   const [zoomLevel, setZoomLevel] = useState(100);
//   const [rotation, setRotation] = useState(0);
//   const imgRef = useRef<HTMLImageElement | null>(null);
//   const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

//   const [imgSrc, setImgSrc] = useState("");
//   const [profileImg, setProfileImg] = useState(
//     "https://via.placeholder.com/120"
//   );

//   const [crop, setCrop] = useState<Crop>({
//     unit: "px",
//     x: 25,
//     y: 25,
//     width: 50,
//     height: 50,
//   });

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleImageChange = (file: File | null) => {
//     if (file) {
//       setUploadedImage(file);
//       setImageSelected(true);
//     }

//     const reader = new FileReader();
//     reader.addEventListener("load", () => {
//       const imageUrl = reader.result?.toString() || "";
//       setImgSrc(imageUrl);
//     });
//     if (file) reader.readAsDataURL(file);
//   };

//   const handleFileInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     handleImageChange(file);
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null;
//     handleImageChange(file);
//   };

//   const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setZoomLevel(parseInt(event.target.value));
//   };

//   const zoomIn = () => {
//     setZoomLevel((prev) => prev + 10);
//   };

//   const zoomOut = () => {
//     setZoomLevel((prev) => Math.max(prev - 10, 10));
//   };

//   const rotateLeft = () => {
//     setRotation((prev) => prev - 45);
//   };

//   const rotateRight = () => {
//     setRotation((prev) => prev + 45);
//   };

//   function onImageLoad(e: any) {
//     const { width, height } = e.currentTarget;
//     const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

//     const crop = makeAspectCrop(
//       {
//         unit: "%",
//         width: cropWidthInPercent,
//       },
//       ASPECT_RATIO,
//       width,
//       height
//     );
//     const centeredCrop = centerCrop(crop, width, height);
//     setCrop(centeredCrop);
//   }
//   return (
//     <>
//       <div className="mr-[130px]">
//         {imageSelected ? (
//           <img
//             src={profileImg}
//             alt="Profile Picture"
//             className="border-2 border-dashed border-gray-300 rounded-full w-[120px] h-[120px]"
//           />
//         ) : (
//           <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full w-[120px] h-[120px]">
//             <ArrowUpTrayIcon
//               className="w-[21.6px] h-[21.6px] text-gray-400"
//               aria-hidden="true"
//             />

//             <div className="text-center">
//               <p className="text-btfont">Drag and drop image here</p>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-center">
//           <button
//             className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded text-xs"
//             onClick={openModal}
//           >
//             Upload Image
//           </button>
//         </div>
//       </div>
//       {/*  */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
//           <div
//             className="bg-white p-8 max-w-lg w-full rounded-lg relative"
//             style={{
//               minHeight: "350px",
//               height: imageSelected ? "400px" : "350px",
//               transition: "height 0.3s ease",
//             }}
//           >
//             <div
//               className="absolute top-2 right-2 cursor-pointer text-lg"
//               onClick={closeModal}
//             >
//               <XMarkIcon className="h-6 w-6" />
//             </div>
//             <h3 className="text font-semibold mb-4">Upload Photo</h3>
//             <div
//               className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-4 shadow-xl h-[180px] w-full flex flex-col items-center justify-center"
//               style={{
//                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//                 transform: "translateY(-10px)",
//               }}
//               onDragOver={handleDragOver}
//               onDrop={handleDrop}
//             >
//               {!imageSelected ? (
//                 <>
//                   <div>
//                     <ArrowUpCircleIcon
//                       className="h-8 w-8 mb-2"
//                       style={{ stroke: "blue" }}
//                     />
//                   </div>
//                   <p>
//                     <span>
//                       Drag and Drop or{" "}
//                       <label
//                         htmlFor="fileInput"
//                         className="cursor-pointer text-blue-500 mt-2 pb-2 underline"
//                       >
//                         Choose File
//                       </label>{" "}
//                       to Upload
//                     </span>
//                   </p>
//                   <span className="text-gray-400">Files must be under 5MB</span>
//                   <input
//                     id="fileInput"
//                     type="file"
//                     className="hidden"
//                     onChange={handleFileInputChange}
//                   />
//                 </>
//               ) : (
//                 <div className="flex justify-center items-center w-full h-full overflow-hidden">
//                   <ReactCrop
//                     crop={crop}
//                     circularCrop
//                     keepSelection
//                     aspect={1}
//                     minWidth={MIN_DIMENSION}
//                     onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
//                   >
//                     <img
//                       ref={imgRef}
//                       src={imgSrc}
//                       className="object-cover rounded-lg"
//                       style={{
//                         transform: `scale(${
//                           zoomLevel / 100
//                         }) rotate(${rotation}deg)`,
//                         maxHeight: "200px",
//                       }}
//                       onLoad={onImageLoad}
//                     />
//                   </ReactCrop>
//                 </div>
//               )}
//             </div>
//             {imageSelected && (
//               <div className="flex justify-between mb-2">
//                 <div className="flex">
//                   <MinusCircleIcon
//                     className="h-6 w-6 cursor-pointer"
//                     onClick={zoomOut}
//                   />
//                   <input
//                     type="range"
//                     min="0"
//                     max="200"
//                     value={zoomLevel}
//                     onChange={handleZoomChange}
//                     className="w-40 mx-2"
//                   />
//                   <PlusCircleIcon
//                     className="h-6 w-6 cursor-pointer"
//                     onClick={zoomIn}
//                   />
//                 </div>
//                 <div className="flex space-x-2">
//                   <ArrowUturnLeftIcon
//                     className="h-6 w-6 cursor-pointer"
//                     onClick={rotateLeft}
//                   />
//                   <ArrowUturnRightIcon
//                     className="h-6 w-6 cursor-pointer"
//                     onClick={rotateRight}
//                   />
//                 </div>
//               </div>
//             )}
//             <div className="flex justify-center">
//               <button
//                 className={`px-8 py-2 rounded-full mr-4 ${
//                   imageSelected
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-black"
//                 }`}
//                 onClick={() => {
//                   const imgElement = imgRef.current;
//                   const canvasElement = previewCanvasRef.current;

//                   if (imgElement && canvasElement) {
//                     setCanvasPrev(
//                       imgElement,
//                       canvasElement,
//                       convertToPixelCrop(
//                         crop,
//                         imgElement.width,
//                         imgElement.height
//                       ),
//                       zoomLevel,
//                       rotation
//                     );
//                     const dataUrl = canvasElement.toDataURL();
//                     setProfileImg(dataUrl);
//                     closeModal();
//                   }
//                 }}
//               >
//                 Save
//               </button>

//               <button
//                 className="border border-black text-black bg-white px-8 py-2 rounded-full"
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//             </div>
//             <div className="flex justify-center">
//               <p
//                 className="text-red-500 underline m-1 cursor-pointer"
//                 onClick={() => setImageSelected(false)}
//               >
//                 Remove Photo
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//       {crop && (
//         <canvas
//           ref={previewCanvasRef}
//           className="w-36 h-36 rounded-full border-4 border-white hidden"
//         />
//       )}
//     </>
//   );
// };

// export default Profile;

//v2

// import React, { useState, useRef, ChangeEvent, MouseEvent } from "react";
// import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";

// const Profile: React.FC = () => {
//   const [profileImg, setProfileImg] = useState<string>(
//     "https://via.placeholder.com/120"
//   );
//   const [imageSelected, setImageSelected] = useState<boolean>(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     console.log("file ", file, event.target.files);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         console.log("reader result ", reader.result);
//         setProfileImg(reader.result as string);
//         setImageSelected(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <>
//       <div className="mr-[130px]">
//         {imageSelected ? (
//           <img
//             src={profileImg}
//             alt="Profile Picture"
//             className="border-2 border-dashed border-gray-300 rounded-full w-[120px] h-[120px]"
//           />
//         ) : (
//           <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full w-[120px] h-[120px]">
//             <ArrowUpTrayIcon
//               className="w-[21.6px] h-[21.6px] text-gray-400"
//               aria-hidden="true"
//             />
//             <div className="text-center">
//               <p className="text-btfont">Drag and drop image here</p>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-center">
//           <button
//             className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded text-xs"
//             onClick={handleButtonClick}
//           >
//             Upload Image
//           </button>
//         </div>
//       </div>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         style={{ display: "none" }}
//         ref={fileInputRef}
//       />
//     </>
//   );
// };

// export default Profile;

// v3

// import React, { useState, useRef, ChangeEvent, MouseEvent } from "react";
// import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";

// const Profile: React.FC = () => {
//   const [profileImg, setProfileImg] = useState<string>(
//     "https://via.placeholder.com/120"
//   );
//   const [imageSelected, setImageSelected] = useState<boolean>(false);
//   const [modalOpen, setModalOpen] = useState<boolean>(false);
//   const [croppedImg, setCroppedImg] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const imgRef = useRef<HTMLImageElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImg(reader.result as string);
//         setImageSelected(true);
//         setModalOpen(true); // Open the modal to crop the image
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
//     fileInputRef.current?.click();
//   };

//   const handleCrop = () => {
//     const canvas = canvasRef.current;
//     const img = imgRef.current;
//     if (canvas && img) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         canvas.width = 120; // desired width
//         canvas.height = 120; // desired height
//         ctx.drawImage(
//           img,
//           0,
//           0,
//           img.width,
//           img.height,
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );
//         const croppedImage = canvas.toDataURL("image/png");
//         setCroppedImg(croppedImage);
//         setProfileImg(croppedImage);
//         setImageSelected(true);
//         setModalOpen(false); // Close the modal
//       }
//     }
//   };

//   return (
//     <>
//       <div className="mr-[130px]">
//         {imageSelected ? (
//           <img
//             src={profileImg}
//             alt="Profile Picture"
//             className="border-2 border-dashed border-gray-300 rounded-full w-[120px] h-[120px]"
//           />
//         ) : (
//           <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full w-[120px] h-[120px]">
//             <ArrowUpTrayIcon
//               className="w-[21.6px] h-[21.6px] text-gray-400"
//               aria-hidden="true"
//             />
//             <div className="text-center">
//               <p className="text-btfont">Drag and drop image here</p>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-center">
//           <button
//             className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded text-xs"
//             onClick={handleButtonClick}
//           >
//             Upload Image
//           </button>
//         </div>
//       </div>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         style={{ display: "none" }}
//         ref={fileInputRef}
//       />
//       {modalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-lg font-bold mb-4">Crop Image</h2>
//             <div className="flex flex-col items-center">
//               <img
//                 ref={imgRef}
//                 src={profileImg}
//                 alt="To Crop"
//                 className="max-w-full mb-4"
//               />
//               <canvas ref={canvasRef} className="hidden"></canvas>
//               <div className="flex justify-between w-full">
//                 <button
//                   className="px-4 py-2 bg-gray-300 rounded"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-indigo-600 text-white rounded"
//                   onClick={handleCrop}
//                 >
//                   Crop
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Profile;

//v4

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  MouseEvent,
} from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";

const Profile: React.FC = () => {
  const [profileImg, setProfileImg] = useState<string>(
    "https://via.placeholder.com/120"
  );
  const [imageSelected, setImageSelected] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cropperRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [cropperPos, setCropperPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const img = imgRef.current;
    const cropper = cropperRef.current;
    if (img && cropper) {
      // Center the cropper by default
      const imgRect = img.getBoundingClientRect();
      const cropperRect = cropper.getBoundingClientRect();
      setCropperPos({
        top: imgRect.height / 2 - cropperRect.height / 2,
        left: imgRect.width / 2 - cropperRect.width / 2,
      });
    }
  }, [modalOpen]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
        setImageSelected(true);
        setModalOpen(true); // Open the modal to crop the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    fileInputRef.current?.click();
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const cropper = cropperRef.current;
    if (canvas && img && cropper) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const cropperRect = cropper.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        const scaleX = img.width / imgRect.width;
        const scaleY = img.height / imgRect.height;

        const cropX = (cropperRect.left - imgRect.left) * scaleX;
        const cropY = (cropperRect.top - imgRect.top) * scaleY;
        const cropWidth = cropperRect.width * scaleX;
        const cropHeight = cropperRect.height * scaleY;

        canvas.width = cropperRect.width;
        canvas.height = cropperRect.height;
        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const croppedImage = canvas.toDataURL("image/png");
        setCroppedImg(croppedImage);
        setProfileImg(croppedImage);
        setImageSelected(true);
        setModalOpen(false); // Close the modal
      }
    }
  };

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setDragStartPos({ x: event.clientX, y: event.clientY });
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const cropper = cropperRef.current;
      if (cropper) {
        const img = imgRef.current;
        const imgRect = img?.getBoundingClientRect();
        const cropperRect = cropper?.getBoundingClientRect();
        if (img && imgRect && cropper && cropperRect) {
          const offsetX = event.clientX - dragStartPos.x;
          const offsetY = event.clientY - dragStartPos.y;
          const newTop = cropperPos.top + offsetY;
          const newLeft = cropperPos.left + offsetX;

          // Ensure the cropper stays within the image bounds
          if (
            newTop >= 0 &&
            newTop + cropperRect.height <= imgRect.height &&
            newLeft >= 0 &&
            newLeft + cropperRect.width <= imgRect.width
          ) {
            setCropperPos({ top: newTop, left: newLeft });
            setDragStartPos({ x: event.clientX, y: event.clientY });
          }
        }
      }
    }
  };

  return (
    <>
      <div className="mr-[130px]">
        {imageSelected ? (
          <img
            src={profileImg}
            alt="Profile Picture"
            className="border-2 border-dashed border-gray-300 rounded-full w-[120px] h-[120px]"
          />
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full w-[120px] h-[120px]">
            <ArrowUpTrayIcon
              className="w-[21.6px] h-[21.6px] text-gray-400"
              aria-hidden="true"
            />
            <div className="text-center">
              <p className="text-btfont">Drag and drop image here</p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded text-xs"
            onClick={handleButtonClick}
          >
            Upload Image
          </button>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <h2 className="text-lg font-bold mb-4">Crop Image</h2>
            <div className="relative flex flex-col items-center">
              <img
                ref={imgRef}
                src={profileImg}
                alt="To Crop"
                className="max-w-full mb-4"
              />
              <div
                ref={cropperRef}
                className="absolute border-2 border-indigo-600 rounded-full w-[120px] h-[120px] cursor-move"
                style={{
                  top: `${cropperPos.top}px`,
                  left: `${cropperPos.left}px`,
                }}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onMouseMove={handleDrag}
              ></div>
              <canvas ref={canvasRef} className="hidden"></canvas>
              <div className="flex justify-between w-full mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                  onClick={handleCrop}
                >
                  Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
