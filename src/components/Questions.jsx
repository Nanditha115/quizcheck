import React, { useState, useEffect, useRef } from 'react';

const Question = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep, repeatedQues, setRepeatedQues }) => {
    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');
    const radiosWrapper = useRef();
    const [totalquesAllowed, setTotalquesAllowed] = useState(1);
    const [qno, setQno] = useState(1);
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        let time = setTimeout(() => {

            if (timer === 1) {
                nextClickHandler()
            }
            else {
                setTimer(timer - 1);
            }

        }, 1000)

        return () => {
            clearTimeout(time);
        }

    }, [timer])

    useEffect(() => {
        const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
        if (findCheckedInput) {
            findCheckedInput.checked = false;
        }
    }, [data]);

    const changeHandler = (e) => {
        setSelected(e.target.value);
        if (error) {
            setError('');
        }
    }

    const nextClickHandler = (e) => {

        setTimer(10);

        if (selected === '' && timer > 1) {
            setTimer(timer);
            return setError('Please select one option!');
        }

        onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
        setSelected('');
        setError('');

        let randomQues;
        let isChecked = true;

        while (isChecked) {
            // console.log('do')
            randomQues = Math.floor((Math.random()) * (numberOfQuestions))
            if (!repeatedQues.includes(randomQues)) {
                // console.log('if')
                isChecked = false;
            }
        }

        if (totalquesAllowed < 3) {
            onSetActiveQuestion(randomQues);
            setRepeatedQues([...repeatedQues, randomQues])
            setTotalquesAllowed(totalquesAllowed + 1);
        } else
            onSetStep(3);

        setQno(qno + 1);
    }

    return (
        <div className="card">
            <div className="card-content">
                <div className='qno'><h1>Question {qno}</h1></div>
                <div>{timer}</div>
                <div className="content">
                    <h2 className="mb-5">{data.question}</h2>
                    <div className="control" ref={radiosWrapper}>
                        {data.choices.map((choice, i) => (
                            <label className="radio has-background-light" key={i}>
                                <input type="radio" name="answer" value={choice} onChange={changeHandler} />
                                {choice}
                            </label>
                        ))}
                    </div>
                    {error && <div className="has-text-danger">{error}</div>}
                    <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextClickHandler}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default Question;