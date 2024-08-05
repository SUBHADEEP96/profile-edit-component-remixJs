import React from "react";

import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import Cover from "./SocialUploadParts/Cover";
import Profile from "./SocialUploadParts/Profile";

const SocialUpload = () => {
  return (
    <div className="flex space-x-4 w-screen">
      {/* Circular Upload Section */}

      <Profile />
      {/* Rectangular Upload Section */}

      <Cover />
    </div>
  );
};

export default SocialUpload;
