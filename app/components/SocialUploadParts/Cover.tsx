import React from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";

const Cover = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg w-[514.8px] h-[121.2px]">
        <ArrowUpTrayIcon
          className="w-[21.6px] h-[21.6px] text-gray-400"
          aria-hidden="true"
        />

        <div className="text-center text-btfont">
          <p>Drag and drop image here</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded w-full text-xs">
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default Cover;
