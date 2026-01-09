import { useState } from 'react'

const Anecdote = ({ title, anecdote, vote }) => {
  return (
    <div>
      <h1>{title}</h1>
      {anecdote}
      <br />
      has {vote} votes
    </div>
  )
}


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
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [maxVoted, setMaxVoted] = useState(0)


  const handleAnecdoteSelection = () => {
    if (anecdotes.length < 2) {
      return selected
    }

    let num = Math.floor(Math.random() * anecdotes.length)
    while (num === selected) {
      num = Math.floor(Math.random() * anecdotes.length)
    }

    setSelected(num)
  }


  const handleVoting = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)

    if (newVotes[selected] > votes[maxVoted]) {
      setMaxVoted(selected)
    }
  }


  return (
    <div>
      <Anecdote title={"Anecdote of the day"} anecdote={anecdotes[selected]} vote={votes[selected]} />


      <button onClick={handleVoting}>vote</button>
      <button onClick={handleAnecdoteSelection}>next anecdote</button>

      <Anecdote title={"Anecdote with most votes"} anecdote={anecdotes[maxVoted]} vote={votes[maxVoted]} />

    </div>
  )
}

export default App
