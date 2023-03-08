import React, { useEffect,useState } from 'react'

const End = ({results, data, onReset, onAnswerCheck, repeatedQues}) => {

    const[correctAnswers, setCorectAnswers] = useState(0);

    useEffect(() => {
        console.log(results);
        let correct = 0;
        results.forEach((result, index) => {
            if(result.a === data[repeatedQues[index]].answer){
                correct++;
            }
        });
        setCorectAnswers(correct);
    },[])

  return (
    <div className='card'>
        <div className='card-content'>
            <div className='content'>
                <h3>Your results</h3>
                <p>{correctAnswers} of {repeatedQues.length}</p>
                <p><strong>{Math.floor((correctAnswers/repeatedQues.length)*100)}%</strong></p>
                <button className='button is-info mr-2' onClick={onAnswerCheck}>Check your answers</button>
                <button className='button is-success' onClick={onReset}>Try again</button>
            </div>
        </div>
    </div>
  )
}

export default End