const Hello = (props) => {
  return (
    <div>

      <p>Hello {props.name}</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a + b)

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      Hel
    </div>
  )
}

export default App;
