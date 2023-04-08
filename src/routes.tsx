import { Route, Routes } from "react-router-dom";
import { FormBuilderPage } from "./pages/FormBuilderPage";
import { FormViewPage } from "./pages/FormViewPage";
import { HomePage } from "./pages/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/criar-formulario" element={<FormBuilderPage />} />
      <Route path="/visualizar-formulario/:id" element={<FormViewPage />} />
    </Routes>
  );
};
