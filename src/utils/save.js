import React, { useRef } from "react";

import * as htmlToImage from "html-to-image";
import LevelIcon from "./svg";
import { levelClassInside } from "../const";
import $ from "jquery";
function App(prop) {
  const domEl = useRef(null);

  const downloadImage = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);

    // download image
    const link = document.createElement("a");
    link.download = "" + prop.id + ".png";
    link.href = dataUrl;
    $("body").append(link);
    link.click();
    $(".dl" + prop.id).remove();
    setTimeout(() => {
      //$(".dl:first").trigger("click");
    }, 500);
  };

  return (
    <div className="App">
      <button onClick={downloadImage} className={"dl dl" + prop.id}>
        Download Image
      </button>
      <div
        id="domEl"
        ref={domEl}
        style={{ display: "inline-block", padding: "0 25px" }}
      >
        <LevelIcon
          level={prop.id}
          mode="gifts"
          text={""}
          classinside={levelClassInside(1)}
          number={""}
          width="512px"
        />
      </div>
    </div>
  );
}

export default App;
