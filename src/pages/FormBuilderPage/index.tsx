import { Button } from "@mui/material";
import { FormQuestion } from "../../components/FormQuestion";
import { FormQuestionContainer } from "../../components/FormQuestionContainer";
import { Template } from "../../components/Template";
import { clearForm, updateTitle } from "../../contexts/reducers/formSlice";
import { saveForm } from "../../contexts/thunks/formThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "./styles.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
interface IFormBuilder {}

export const FormBuilderPage = (props: IFormBuilder) => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form.form);
  const error = useAppSelector((state) => state.form.error);

  const handleSave = () => {
    if (form?.questions?.length > 0 && form?.title?.length > 0) {
      dispatch(saveForm(form));
      if (error.length > 0) {
        Swal.fire({
          title: "Erro ao salvar o formulário!",
          icon: "error",
          confirmButtonText: "Okay",
        });
      } else {
        Swal.fire({
          title: "Formulário Salvo!",
          icon: "success",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  const handleTitle = (value: string) => {
    dispatch(updateTitle({ title: value }));
  };

  const handleClearForm = () => {
    dispatch(clearForm(null));
  };

  useEffect(() => {
    handleClearForm();
    return handleClearForm();
  }, []);

  return (
    <Template>
      <input
        type="text"
        className="title"
        onChange={(event) => handleTitle(event.target.value)}
        value={form?.title}
      />

      <FormQuestion />
      <FormQuestionContainer />

      <Button className="save-btn" variant="outlined" onClick={handleSave}>
        Salvar
      </Button>
    </Template>
  );
};
