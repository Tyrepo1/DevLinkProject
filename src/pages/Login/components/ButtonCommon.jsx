const ButtonCommon = ({ icon, title ,classButton="",classText="",type,onClick=() => {
  
}}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classButton}` }
    >
      {icon}
      <div
        className={`${classText}`}
      >
        {title}
      </div>
    </button>
  );
};
export default ButtonCommon;
