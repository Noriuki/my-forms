import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { FormView } from "../../components/FormView";
import { Template } from "../../components/Template";
import { fetchForm } from "../../contexts/thunks/formThunk";
import { useAppDispatch } from "../../hooks/hooks";
import "./styles.css";
interface IFormViewPage {}
export const FormViewPage = (props: IFormViewPage) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (id) {
      dispatch(fetchForm(id));
    }
  }, []);

  return (
    <Template>
      <FormView />
    </Template>
  );
};
