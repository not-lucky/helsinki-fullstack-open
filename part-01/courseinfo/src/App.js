import { useState } from "react"


const Header = (props) => {
	console.log(useState(0));
	return (
		<h1>
			{props.course}
		</h1>
	)
}

const Part = (props) => {
	return (
		<p>
			{props.part.name} {props.part.exercises}
		</p>
	)
}

const Content = (props) => {
	return (
		<div>
			<Part part={props.parts[0]} />
			<Part part={props.parts[1]} />
			<Part part={props.parts[2]} />
		</div>
	)
}

const Total = (props) => {

	const calc_total = () => {
		let total = 0;
		for (let element of props.parts) {
			console.log(element);
			total += element.exercises;
		}
		return total;
	}

	return (
		<p>
			Number of exercises {calc_total()}
		</p>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	}

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}


export default App