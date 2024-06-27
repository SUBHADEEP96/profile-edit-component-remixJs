import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import {
  ArrowUpTrayIcon,
  TrashIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import "react-image-crop/dist/ReactCrop.css";

const Cover = () => {
  // State to manage the dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // State to manage the cover image URL
  const [coverImage, setCoverImage] = useState(
    "https://via.placeholder.com/1200x300"
  );

  // State to manage the image position
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 }); // Mouse offset
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 }); // Image dimensions

  // Handler for image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setCoverImage(e.target.result as string);
          setImagePosition({ x: 0, y: 0 }); // Reset image position on upload
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Handlers for dragging the image
  const handleMouseDown = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (e.button !== 0) return; // Only left mouse button
    const pos = { x: e.pageX, y: e.pageY };
    const rel = { x: pos.x - imagePosition.x, y: pos.y - imagePosition.y };
    setDragging(true);
    setRel(rel);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;

    let newX = e.pageX - rel.x;
    let newY = e.pageY - rel.y;

    // Constrain movement within the container
    const containerWidth = 1200; // Width of the container
    const containerHeight = 300; // Height of the container

    // Constrain horizontal movement
    if (newX > 0) newX = 0;
    if (newX < containerWidth - imgDimensions.width)
      newX = containerWidth - imgDimensions.width;

    // Constrain vertical movement
    if (newY > 0) newY = 0;
    if (newY < containerHeight - imgDimensions.height)
      newY = containerHeight - imgDimensions.height;

    setImagePosition({ x: newX, y: newY });
    e.stopPropagation();
    e.preventDefault();
  };

  // Function to get image dimensions
  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setImgDimensions({ width: naturalWidth, height: naturalHeight });
  };

  React.useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <>
      <div className="relative w-full h-72 overflow-hidden">
        <img
          src={coverImage}
          alt="Cover Photo"
          className="object-cover"
          style={{
            position: "absolute",
            top: `${imagePosition.y}px`,
            left: `${imagePosition.x}px`,
            cursor: dragging ? "grabbing" : "grab",
          }}
          onLoad={handleImageLoad}
          onMouseDown={handleMouseDown}
        />
      </div>
      <div className="absolute bottom-4 right-4">
        <div className="relative">
          <CameraIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute top-0 right-0 mt-6 w-48 bg-gray-800 text-white rounded shadow-lg">
              <div className="p-2 hover:bg-gray-600">
                <label htmlFor="fileInput" className="cursor-pointer">
                  <span className="flex gap-2">
                    <ArrowUpTrayIcon className="h-6 w-6" />
                    Upload
                  </span>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <div
                className="p-2 cursor-pointer hover:bg-gray-600"
                onClick={() => {}}
              >
                <span className="flex gap-2">
                  <ViewfinderCircleIcon className="h-6 w-6" />
                  Reposition
                </span>
              </div>
              <div
                className="p-2 cursor-pointer hover:bg-gray-600"
                onClick={() => {}}
              >
                <span className="flex gap-2">
                  <TrashIcon className="h-6 w-6" />
                  Remove
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cover;
