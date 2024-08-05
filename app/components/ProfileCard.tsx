import React from "react";
import Thumbnail from "./profileUplaod/Thumbnail";
import Cover from "./profileUplaod/Cover";
import SocialUpload from "./SocialUpload";

const ProfileCard: React.FC = () => {
  return (
    <>
      {/* <div className="max-w-5xl mx-auto bg-white shadow-md">
        <div className="relative">
          <Cover />
          <Thumbnail />
        </div>
      </div>
      <hr className="my-11" /> */}
      <SocialUpload />
    </>
  );
};

export default ProfileCard;
