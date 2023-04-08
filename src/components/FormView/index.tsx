import {
  Button,
  CircularProgress,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppSelector } from "../../hooks/hooks";
import "./styles.css";
import { LoadingPage } from "../LoadingPage";
import { IQuestionField } from "../../types";
interface IFormView {}

export const FormView = (props: IFormView) => {
  const [answers, setAnswers] = useState({} as any);
  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.form?.loading);
  const questions = useAppSelector((state) => state.form?.form.questions);
  const title = useAppSelector((state) => state.form?.form.title);

  const handleAnswerChange = (event: any, questionText: string) => {
    const newAnswers = { ...answers, [questionText]: event.target.value };
    setAnswers(newAnswers);
  };

  const handleAnswers = (event: any) => {
    event.preventDefault();

    if (Object.entries(answers).length === questions.length) {
      Swal.fire({
        title: "Resposta enviadas!",
        icon: "success",
        confirmButtonText: "Okay",
      });
      console.log(answers);
      navigate("/home");
    } else {
      Swal.fire({
        title: "Responda todas as perguntas",
        icon: "warning",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="form-view-wrapper">
          <h2>{title}</h2>
          <form>
            {questions?.map((question: IQuestionField) => (
              <>
                {question.type === "open" ? (
                  <div className="form-view-question-text" key={question.id}>
                    <TextField
                      sx={{ width: "100%" }}
                      aria-labelledby="titulo-da-pergunta"
                      color="primary"
                      size="small"
                      label={question.text}
                      variant="outlined"
                      required
                      value={answers[question.text] || ""}
                      onChange={(e) => handleAnswerChange(e, question.text)}
                    />
                  </div>
                ) : (
                  <div className="form-view-question-select" key={question.id}>
                    <InputLabel
                      sx={{ width: "100%" }}
                      id={`select-${question.id}`}
                    >
                      {question.text}
                    </InputLabel>
                    <RadioGroup
                      aria-labelledby={`select-${question.id}`}
                      value={answers[question.text] || ""}
                      onChange={(e) => handleAnswerChange(e, question.text)}
                    >
                      {question?.options?.map((option: any) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.text}
                          control={<Radio />}
                          label={option.text}
                        />
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </>
            ))}

            <Button
              className="submit-btn"
              type="submit"
              variant="text"
              onClick={handleAnswers}
            >
              Enviar respostas
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
