import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Card, CardContent, IconButton } from "@mui/material";
import { deleteForm } from "../../contexts/thunks/formListThunk";
import { useAppDispatch } from "../../hooks/hooks";
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface IFormCard {
  id: string;
  title: string;
}
export const FormCard = (props: IFormCard) => {
  const { id, title } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openForm = () => {
    navigate(`/visualizar-formulario/${id}`);
  };

  const handleDeleteForm = () => {
    dispatch(deleteForm(id));
  };

  return (
    <Card className="form-card">
      <CardContent className="form-title">
        <h3>{title}</h3>
      </CardContent>
      <CardContent className="form-action">
        <IconButton
          className="form-action-btn"
          onClick={handleDeleteForm}
          edge="end"
          color="primary"
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          className="form-action-btn"
          onClick={openForm}
          edge="end"
          color="primary"
        >
          <VisibilityIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};
