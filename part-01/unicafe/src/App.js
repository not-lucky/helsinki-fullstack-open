

import { useState } from 'react'

const Button = ({ func, text }) => {
	return (
		<button onClick={func}>{text}</button>
	)
}

const StatisticLine = ({ text, data }) => {
	return (
		<tbody>
			<tr>
				<td>{text}</td>
				<td>{data} {text === 'positive' ? ' %' : ''}</td>
			</tr>
		</tbody >
	)
}


const Statistics = ({ good, neutral, bad }) => {
	if (!(good || neutral || bad)) return (<p>No feedback given</p>);

	const all = good + neutral + bad;
	const average = all ? ((good - bad) / all) : 0;
	const positive = all ? (good / all) * 100 : 0;

	return (
		<table>
			<StatisticLine text={'good'} data={good} />
			<StatisticLine text={'neutral'} data={neutral} />
			<StatisticLine text={'bad'} data={bad} />
			<StatisticLine text={'all'} data={all} />
			<StatisticLine text={'average'} data={average} />
			<StatisticLine text={'positive'} data={positive} />
		</table>
	)
}

const App = () => {
	// save clicks of each button to its own state

	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const increaseGood = () => setGood(good + 1);
	const increaseNeutral = () => setNeutral(neutral + 1);
	const increaseBad = () => setBad(bad + 1);

	return (
		<div>
			<h1> give feedback </h1>
			<Button func={increaseGood} text="good"></Button>
			<Button func={increaseNeutral} text="neutral"></Button>
			<Button func={increaseBad} text="bad"></Button>
			<h1> statistics </h1>
			<Statistics good={good} neutral={neutral} bad={bad} />

			{/* <Text text={'all'} data={all} />
			<Text text={'average'} data={average} />
			<Text text={'positive'} data={positive} /> */}
		</div>
	)
}

export default App