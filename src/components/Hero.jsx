import React, { Fragment, useState } from "react";
import StarwarsLogo from "./../assets/logo.png";
import HeroBg from "./../assets/hero/herobg.svg";
import { PrimaryButtonOutlineWithIcon, PrimaryButtonWithIcon } from "./Buttons";
import Offcanvas from "./Offcanvas";
import MovieList from "./MovieList";

const heroStyle = {
  backgroundImage: `url(${HeroBg})`,
};

const Hero = () => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const toggleOffCanvas = () => {
    setShowOffCanvas(!showOffCanvas);
  };

  return (
    <Fragment>
      {showOffCanvas && (
        <Offcanvas
          canvasTitle="List of Available Movies"
          onRequestClose={toggleOffCanvas}
          canvasComponent={<MovieList />}
        />
      )}
      <div className={`bg-black h-screen overflow-hidden`} style={heroStyle}>
        <div className="flex justify-end px-4 pt-8 animate__animated animate__fadeIn animate__delay-2s">
          <PrimaryButtonOutlineWithIcon
            btnText={"View Github Repository"}
            url="https://github.com/AdabanyaC/starwars-app"
          />
        </div>
        <div className="flex flex-col items-center h-full">
          <img
            src={StarwarsLogo}
            alt="Starwars Logo"
            className="h-3/4 animate__animated animate__zoomIn"
          />
          <div className="animate__animated animate__backInUp">
            <PrimaryButtonWithIcon
              btnText={"Choose a Star Wars Movie"}
              onClick={toggleOffCanvas}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
