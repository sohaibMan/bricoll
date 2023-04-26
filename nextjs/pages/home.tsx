import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket: any;

const Home = () => {
  const [input, setInput] = useState('')

  useEffect(() => { socketInitializer() }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', (msg: any) => {
      setInput(msg)
    })
  }

  const onChangeHandler = (e: any) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }

  return (
    <input
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
  )
};

export default Home;
