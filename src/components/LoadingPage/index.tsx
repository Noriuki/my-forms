import { CircularProgress } from "@mui/material";
import "./styles.css";

interface IFormView {}
export const LoadingPage = (props: IFormView) => {
  return (
    <div className="loading-page-container">
      <CircularProgress className="loading-progress" />
    </div>
  );
};
