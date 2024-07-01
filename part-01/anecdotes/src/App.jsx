import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [maxIdx, setMaxIdx] = useState(0);
  const [changed, setChanged] = useState(false);


  const randomQuote = () => {
    let i = Math.floor(Math.random() * (anecdotes.length));
    while (i == selected) {
      console.log('`same`', `same`)
      i = Math.floor(Math.random() * (anecdotes.length));
    }
    console.log('i', i)
    setSelected(i);
  }

  const vote = () => {
    const tempVotes = [...votes];
    tempVotes[selected]++;
    setMaxIdx(tempVotes[selected] > votes[maxIdx] ? selected : maxIdx)
    setVotes(tempVotes);
    setChanged(true);
  }


  return (
    <>
      <div>
        {anecdotes[selected]} <br />
        has {votes[selected]} votes
        <br />
        <button onClick={vote}>vote</button>
        <button onClick={randomQuote}>next anecdote</button>
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        {changed ? (
          <>
            <p>{anecdotes[maxIdx]}</p>
            <p>has {votes[maxIdx]} votes</p>
          </>
        ) : (<>NO VOTES</>)}
      </div>

    </>
  )
}

export default App
