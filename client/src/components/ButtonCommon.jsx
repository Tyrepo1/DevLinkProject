import {Button} from '@mui/base'

const ButtonCommon = ({ icon, title ,classButton="",classText="",type,onClick=() => {
  
}}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${classButton}` }
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "1rem",
        backgroundColor: "hsl(0, 0%, 100%)",
        border: "4px solid hsl(0, 0%, 90%)",
        textAlign: "center",
        cursor: "pointer"}}
    >
      {icon}
      <div
        className={`${classText}`}
      >
        {title}
      </div>
    </Button>
  );
};
export default ButtonCommon;
