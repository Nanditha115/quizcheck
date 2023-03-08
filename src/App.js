import './App.css';
import Questions from './components/Questions';
import Start from './components/Start';
import quizData from './data/quiz.json'
import { useState } from 'react';
import End from './components/End';
import Modal from './components/Modal';
import Home from './components/Home';
import QuestionsMedium from './components/QuestionsMedium';

const App = () => {

  const [step, setStep] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [repeatedQues, setRepeatedQues] = useState([]);
  const [level, setLevel] = useState(1);

  const quizStartHandler = () => {
    let randomQues = Math.floor((Math.random())* (quizData.data.length))
    setActiveQuestion(randomQues);
    setRepeatedQues([...repeatedQues, randomQues]);
    if(level === 1){
      setStep(2);
    } else {
      setStep(2.1)
    }
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setRepeatedQues([]);
    setStep(0);
  }

  const onLevel1 = ()=> {
    setStep(1);
  }
  
  const onLevel2 = ()=> {
    setStep(1);
    setLevel(2);
  }
  

  return (
    <div className="App">

      {step === 0 && <Home onLevel1= {onLevel1}
        onLevel2= {onLevel2}/>}

      {step === 1 && <Start onQuizStart={quizStartHandler}/>}

      {step ===2 && level ===1 && <Questions
        data = {quizData.data[activeQuestion]}
        onAnswerUpdate = {setAnswers}
        numberOfQuestions = {quizData.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep = {setStep}
        repeatedQues={repeatedQues}
        setRepeatedQues={setRepeatedQues}
      />}

      {step ===2.1 && level ===2 && <QuestionsMedium
        data = {quizData.data[activeQuestion]}
        onAnswerUpdate = {setAnswers}
        numberOfQuestions = {quizData.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep = {setStep}
        repeatedQues={repeatedQues}
        setRepeatedQues={setRepeatedQues}
      />}

      {step === 3 && <End
        results={answers}
        data={quizData.data}
        onReset={resetClickHandler}
        onAnswerCheck={()=>setShowModal(true)}
        repeatedQues={repeatedQues}
      />}

      {showModal && <Modal
        onClose={()=> setShowModal(false)}
        results={answers}
        data={quizData.data}
        repeatedQues={repeatedQues}
      />}
    </div>
  );
}

export default App;
