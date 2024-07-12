import React from "react";

export const Avatar = ({ userLogo, alt = "", extraCss = "" }) => {
  return (
    <div
      className={`bg-transparent rounded-circle ${extraCss}`}
      style={extraCssAvatar}
    >
      <img
        src={userLogo}
        alt={alt}
        style={{
          width: extraCssAvatar.width,
          height: extraCssAvatar.height,
        }}
      />
    </div>
  );
};

export const extraCssAvatar = {
  width: "30px",
  height: "30px",
  overflow: "hidden",
};
