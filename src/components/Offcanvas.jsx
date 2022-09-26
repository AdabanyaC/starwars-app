import React, { useEffect } from "react";

const Canvas = ({
  canvasTitle,
  canvasDescription,
  onRequestClose,
  canvasComponent,
}) => {
  // Use useEffect to add an event listener to the document
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        // Close the canvas when the Escape key is pressed
        onRequestClose();
      }
    }

    // Prevent scolling
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Clear things up when unmounting this component
    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="backdrop bottom-0 left-0 absolute overflow-auto right-0 top-0 z-9999">
      <div className=" animate__animated animate__slideInRight animate__faster">
        <div className="w-1/3 bg-black absolute right-0 min-h-screen top-0">
          <div className="flex justify-between flex-row-reverse bg-main-yellow px-4 py-6 shadow">
            <div
              className="cursor-pointer self-center"
              onClick={onRequestClose}
            >
              <i className="bi bi-x-circle"></i>
            </div>
            <div className="">
              <div className="mx-auto">
                <h1 className="text-xl font-bold">{canvasTitle}</h1>
                <span className="text-xs">
                  Served By the StarWars API -{" "}
                  <a
                    href="https://swapi.dev/"
                    className="text-blue-800 underline"
                  >
                    https://swapi.dev/
                  </a>
                </span>
              </div>
            </div>
          </div>

          {canvasComponent}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
