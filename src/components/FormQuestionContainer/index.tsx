import { updateQuestionList } from "../../contexts/reducers/formSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FormQuestion } from "../FormQuestion";
import "./styles.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
interface IFormQuestionContainer {}

export const FormQuestionContainer = (props: IFormQuestionContainer) => {
  const questions = useAppSelector((state) => state.form.form.questions);
  const dispatch = useAppDispatch();

  // Function to update list on drop
  const handleDrop = (questionCard: any) => {
    if (!questionCard.destination) return;
    let updatedList = [...questions];
    const [reorderedItem] = updatedList.splice(questionCard.source.index, 1);
    updatedList.splice(questionCard.destination.index, 0, reorderedItem);

    dispatch(updateQuestionList(updatedList));
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId="list-container">
        {(provided) => (
          <div
            className="list-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {questions?.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={question.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className="item-container"
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <FormQuestion question={question} key={question.id} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
