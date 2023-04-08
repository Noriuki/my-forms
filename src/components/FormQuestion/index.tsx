import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addQuestion, deleteQuestion } from "../../contexts/reducers/formSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { IOption, IQuestionField } from "../../types";
import "./styles.css";
interface IProps {
  children?: any;
  question?: IQuestionField;
}

export const FormQuestion = (props: IProps) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("open");
  const [options, setOptions] = useState<IOption[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.question) {
      handleViewQuestion();
    }
  }, []);

  function handleViewQuestion() {
    setText(props?.question?.text || "");
    setType(props?.question?.type || "open");
    setOptions(props?.question?.options || []);
  }

  const handleAddQuestion = () => {
    if (text.trim() !== "") {
      dispatch(addQuestion({ text, type, options }));
      setText("");
      setType("open");
      setOptions([]);
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    dispatch(deleteQuestion(questionId));
  };

  const handleOptionChange = (event: any, optionId: string) => {
    const newOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, text: event.target.value };
      }
      return option;
    });
    setOptions(newOptions);
  };

  const handleTypeChange = (event: any) => {
    setType(event.target.value);
    if (event.target.value === "open") {
      setOptions([]);
    } else {
      setOptions([{ id: uuidv4(), text: "" }]);
    }
  };

  return (
    <div className="question-container">
      <Box sx={{ width: "100%", margin: "1rem 0" }}>
        <InputLabel id="titulo-da-pergunta">Título</InputLabel>
        <TextField
          sx={{ width: "100%" }}
          aria-labelledby="titulo-da-pergunta"
          color="primary"
          size="small"
          variant="outlined"
          value={text}
          disabled={!!props.question}
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
      <Box sx={{ width: "100%", margin: "1rem 0" }}>
        <InputLabel id="tipo-da-pergunta">Tipo</InputLabel>
        <Select
          sx={{ width: "100%" }}
          labelId="tipo-da-pergunta"
          value={type}
          onChange={handleTypeChange}
          size="small"
          disabled={!!props.question}
        >
          <MenuItem value="open">Aberta</MenuItem>
          <MenuItem value="multiple-choice">Multipla escolha</MenuItem>
        </Select>
      </Box>
      {type === "multiple-choice" && (
        <Box sx={{ width: "100%" }}>
          <InputLabel id="opcoes-da-pergunta">Opções</InputLabel>

          {options?.map((option) => (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                margin: "0.5rem 0",
              }}
              key={option.id}
            >
              <TextField
                sx={{ width: "100%" }}
                color="primary"
                size="small"
                variant="outlined"
                value={option.text}
                disabled={!!props.question}
                onChange={(e) => handleOptionChange(e, option.id)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {!!props.question === false ? (
                        <IconButton
                          onClick={() =>
                            setOptions(
                              options.filter(
                                (op: { id: string; text: string }) =>
                                  op.id !== option.id
                              )
                            )
                          }
                          edge="end"
                          color="primary"
                        >
                          <CloseIcon />
                        </IconButton>
                      ) : null}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          ))}
          {!!props.question === false ? (
            <Button
              type="button"
              variant="text"
              onClick={() =>
                setOptions([...options, { id: uuidv4(), text: "" }])
              }
            >
              Adicionar opção
            </Button>
          ) : null}
        </Box>
      )}
      {!!props.question ? (
        <Button
          style={{ width: "100%", margin: "1rem 0" }}
          type="button"
          variant="outlined"
          onClick={() => handleDeleteQuestion(props?.question?.id as string)}
        >
          Remover
        </Button>
      ) : (
        <Button
          style={{ width: "100%", margin: "1rem 0" }}
          type="button"
          variant="contained"
          onClick={handleAddQuestion}
        >
          Adicionar
        </Button>
      )}
    </div>
  );
};
