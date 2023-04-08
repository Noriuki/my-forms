import { useEffect } from "react";
import { FormCard } from "../../components/FormCard";
import { Template } from "../../components/Template";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "./styles.css";
import { fetchFormList } from "../../contexts/thunks/formListThunk";
import { LoadingPage } from "../../components/LoadingPage";

interface IHomePage {}
export const HomePage = (props: IHomePage) => {
  const dispatch = useAppDispatch();
  const formList = useAppSelector((state) => state.formList.formList);
  const loading = useAppSelector((state) => state.formList.loading);

  useEffect(() => {
    dispatch(fetchFormList());
  }, []);

  return (
    <Template>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="home-container">
          {formList?.map((form) => (
            <FormCard
              key={form.id}
              id={form.id as string}
              title={form?.title}
            />
          ))}
        </div>
      )}
    </Template>
  );
};
