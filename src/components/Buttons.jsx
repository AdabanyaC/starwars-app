export const PrimaryButtonOutlineWithIcon = ({ btnText, url }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <button
        className={`flex gap-2 px-6 py-3 rounded font-semibold border text-white border-main-yellow hover:bg-main-yellow hover:text-black`}
      >
        <i className="bi bi-github"></i>
        <p>{btnText}</p>
      </button>
    </a>
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
