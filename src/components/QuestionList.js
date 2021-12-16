import React, {useState, useEffect} from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  // when application loads, get questions from 
  // http://localhost:4000/questions
  // and display them using this component

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((resp)=>resp.json())
    .then((q)=> setQuestions(q))
  }, []) //GET /questions

  const ask = questions.map((data) => {
    return <QuestionItem 
      key={data.id} 
      question={data} 
      onUpdateQuestion={handleUpdateQuestion} />
  }); //requires key
  
  function handleUpdateQuestion(updateQuestion){
    const updateQuestions = questions.map((question)=> {
      if(questions.id === updateQuestion.id){
        return updateQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updateQuestions)
  }
  //add handler for adding new questions (setquestions)
  //pass this handler to QuestionForm

  function handleAddQuestions(newQuestions){
    setQuestions([...questions, newQuestions])
  }

  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter((question)=>
    question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {ask}
        <QuestionForm 
        onAddQuestions={handleAddQuestions} 
        onDeleteQuestion={handleDeleteQuestion} />
      </ul>
    </section>
  );
}

export default QuestionList;
