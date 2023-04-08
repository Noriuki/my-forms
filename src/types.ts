export interface IOption {
  id: string;
  text: string;
}

export interface IQuestionField {
  id: string;
  type: "open" | "multiple-choice";
  text: string;
  options?: IOption[];
}

export interface IForm {
  id?: string;
  title: string;
  questions: IQuestionField[];
}
