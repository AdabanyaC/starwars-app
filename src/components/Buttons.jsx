export const PrimaryButton = ({ btnText, bgColor, textColor }) => {
  return (
    <button
      className={`px-6 py-3 rounded font-semibold ${bgColor} ${
        bgColor === "main-red" ? `text-white` : textColor
      }`}
    >
      {btnText}
    </button>
  );
};

export const PrimaryButtonWithIcon = ({
  btnText,
  bgColor,
  textColor,
  onClick,
}) => {
  return (
    <button
      className={`flex gap-2 px-6 py-3 rounded font-semibold bg-main-yellow`}
      onClick={onClick}
    >
      <p>{btnText}</p>
      <i className="bi bi-camera-reels-fill"></i>
    </button>
  );
};

export const PrimaryButtonLg = ({ btnText, bgColor, textColor }) => {
  return (
    <button
      className={`px-16 py-4 font-semibold rounded ${bgColor} ${
        bgColor === "main-red" ? `text-white` : textColor
      }`}
    >
      {btnText}
    </button>
  );
};
