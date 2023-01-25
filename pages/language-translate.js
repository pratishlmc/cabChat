import React, { useState, useEffect } from 'react'
const { Configuration, OpenAIApi } = require('openai');


import { Roboto } from "@next/font/google"

const roboto = Roboto({ weight: "400" })

function languageTranslate() {
  const [language, setLanguage] = useState("Nepali")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [translation, setTranslation] = useState("")
  const [openAi, setOpenAi] = useState([]);


  useEffect(() => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY
    });
    const open_ai = new OpenAIApi(configuration);
    setOpenAi(open_ai)
  }, [])

  const onSend = async () => {
    setLoading(true);
    const response = await openAi.createCompletion({
      model: "text-davinci-003",
      prompt: `Translate the following text or word into ${language}: ${input}`,
      max_tokens: 500,
      temperature: 0.5
    });
    setTranslation(response.data.choices[0].text)
    setLoading(false);
  };
  return (
    <main style={{ display: "flex", flexDirection: 'column', gap: 10 }}>
      <span style={{ marginTop: 100, fontSize: 24 }} className={roboto.className}>Enter phrase,</span>
      <form style={{ display: "flex", flexDirection: 'column', gap: 10 }} onSubmit={(e) => { e.preventDefault(), input !== "" ? onSend() : alert("🩴 Don't be a pussy") }}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} style={roboto.style} placeholder="Enter text in any language...." className='language-input' rows={5}>
        </textarea>
        <label style={roboto.style} for="language-select">Choose a language:</label>
        <select id="language-select" value={language}
          onChange={(e) => setLanguage(e.target.value)}
          name="language">
          <option value="Nepali" selected>Nepali</option>
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Spanish">Spanish</option>
          <option value="Hindi">Hindi</option>
          <option value="Chinese">Chinese</option>
          <option value="Arabic">Arabic</option>
          <option value="Russian">Russian</option>
        </select>
        <button type='submit' style={roboto.style}>Translate</button>
      </form>
      <div className='language-dispay'>
        <p className={roboto.className} style={{ fontSize: 24 }}>
          {translation}
        </p>
      </div>
    </main>
  )
}

export default languageTranslate