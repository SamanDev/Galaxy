import React from "react";

const iconArea = (prop) => {
  return (
    <>
      <lord-icon
        src={"https://cdn.lordicon.com/" + prop.icon + ".json"}
        trigger={prop.trigger}
        delay="1500"
        colors={prop.colors ? prop.colors : "primary:#e4e4e4,secondary:#e8b730"}
        stroke={prop.stroke ? prop.stroke : "20"}
        style={{ width: prop.width, height: prop.height }}
        scale={prop.scale ? prop.scale : ""}
        state={prop.state ? prop.state : ""}
      ></lord-icon>
    </>
  );
};

export default iconArea;
