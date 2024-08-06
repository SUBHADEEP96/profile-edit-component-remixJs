import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";

const Cover = () => {
  const [coverImage, setCoverImage] = useState(
    "https://via.placeholder.com/514x121"
  );
  const [imageSelected, setImageSelected] = useState(false);
  // State to manage the image position
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 }); // Mouse offset
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 }); // Image dimensions

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handler for image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setCoverImage(e.target.result as string);
          setImageSelected(true);
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

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    fileInputRef.current?.click();
  };
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg w-[514.8px] h-[121.2px] overflow-hidden">
        {imageSelected ? (
          <>
            <img
              src={coverImage}
              alt="Cover"
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
          </>
        ) : (
          <>
            <ArrowUpTrayIcon
              className="w-[21.6px] h-[21.6px] text-gray-400"
              aria-hidden="true"
            />

            <div className="text-center text-btfont">
              <p>Drag and drop image here</p>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center">
        <button
          className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded w-full text-xs"
          onClick={handleButtonClick}
        >
          Upload Image
        </button>
      </div>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default Cover;
