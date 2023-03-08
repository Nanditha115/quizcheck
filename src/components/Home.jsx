import React from 'react'

const Home = ({onLevel1, onLevel2}) => {
  return (
    <>
    <div className='card'>
        <div className='card-content'>
            <div className='content'>
                <h1> LEVEL 1 </h1>
                <p> Take the quiz with next button </p>
                <button className='button is-info is-medium' onClick={onLevel1}>Gooo!</button>
            </div>
        </div>
    </div>
    <p>.</p>
    <div className='card'>
    <div className='card-content'>
        <div className='content'>
            <h1> LEVEL 2 </h1>
            <p> Take the quiz without the next button </p>
            <button className='button is-info is-medium' onClick={onLevel2}>Gooo!</button>
        </div>
    </div>
</div>
</>
  )
}

export default Home