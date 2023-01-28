import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useRef, useState } from 'react'
import { ChatFeed, Message } from 'react-chat-ui'
import { requestGpt } from '../utils/requestGpt';
import { Waveform } from '@uiball/loaders'

const inter = Inter({ subsets: ['latin'] })

export default function Chat() {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    new Message({ id: 1, message: "Hey there👋, I am developed by @pratishlmc using GPT-3 engine from Openai." }),
    new Message({ id: 1, message: "How can I help you?" }),
  ])
  const [loading, setLoading] = useState(false)

  const onSend = async () => {
    const open_ai = await requestGpt();

    messages.push(new Message({
      id: 0,
      message: input,
    }));
    scrollToBottom()
    setLoading(true);
    const response = await open_ai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 500,
      temperature: 0.5
    });

    let res = response.data.choices[0].text
    console.log(res);

    messages.push(new Message({
      id: 1,
      message: JSON.parse(JSON.stringify(res)),
    }));
    setInput("");
    setLoading(false);
    scrollToBottom()
  };

  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <main className={styles.main}>
        {/* <section> */}
        <div style={inter.style} className={styles.chats}>
          <ChatFeed
            messages={messages}
            isTyping={loading}
            hasInputField={false}
            showSenderName
            bubblesCentered={false}
            bubbleStyles={
              {
                text: {
                  fontSize: 18,
                  color: "#fff",
                  fontFamily: "Inter"
                },
                userBubble: {
                  backgroundColor: "#0084FF"
                },
                chatbubble: {
                  borderRadius: 20,
                  padding: 20,
                  backgroundColor: "#000"
                },
              }
            }
          />
        </div>
      </main>
      <div ref={messagesEndRef} />
      <div style={inter.style} className='footer'>
        <form className='input-box'
          onSubmit={(e) => { e.preventDefault(), input !== "" ? onSend() : alert("🩴 Don't be a pussy") }}>
          <input placeholder=':) Ask Anything' value={input} onChange={(e) => setInput(e.target.value)} />
          <button type='submit' className='send-button'>Send</button>
        </form>
      </div>
    </>
  )
}