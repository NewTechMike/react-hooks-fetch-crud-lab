import React from "react";

function QuestionItem({ question, onUpdateQuestion, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteQuestion(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "DELETE",
    })
    .then((resp)=>resp.json())
    .then(()=> onDeleteQuestion(question));
  }//DELETE /questions/:id


  function handleUpdateQuestion(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        "correctIndex": correctIndex
      },
    })
    .then((resp)=>resp.json())
    .then((updatedQuestion)=> onUpdateQuestion(updatedQuestion));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}
        onChange={handleUpdateQuestion}>{options}</select>
      </label>
      <button
      onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
