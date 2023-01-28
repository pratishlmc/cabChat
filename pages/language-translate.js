import React, { useState, useEffect } from 'react'
import { requestGpt } from '../utils/requestGpt';
import { Roboto } from "@next/font/google"
import Head from 'next/head';
import { Waveform } from '@uiball/loaders'

const roboto = Roboto({ weight: "400" })

function languageTranslate() {
  const [language, setLanguage] = useState("Nepali")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [translation, setTranslation] = useState("")

  const onSend = async () => {
    const open_ai = await requestGpt();

    setLoading(true);
    const response = await open_ai.createCompletion({
      model: "text-davinci-003",
      prompt: `Translate the following text or word into ${language}: ${input}`,
      max_tokens: 500,
      temperature: 0.5
    });
    setLoading(false);
    setTranslation(response.data.choices[0].text)
  };
  return (
    <>
      <Head>
        <title>Translate</title>
      </Head>
      <main style={{ display: "flex", flexDirection: 'column', gap: 10 }}>
        <span style={{ marginTop: 100, fontSize: 24 }} className={roboto.className}>Enter phrase,</span>
        <form className='language-form' style={{ display: "flex", flexDirection: 'column', gap: 10 }}
          onSubmit={(e) => { e.preventDefault(), input !== "" ? onSend() : alert("🩴 Don't be a pussy") }}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            style={roboto.style} placeholder="Enter text in any language...."
            className='language-input' rows={5}>
          </textarea>
          <div>
            <label style={roboto.style} for="language-select">Choose a language:  🔤 </label>
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
          </div>
          <button type='submit' style={roboto.style}>Translate</button>
        </form>
        <div className='language-dispay'>
          {
            loading ?
              <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
                <Waveform
                  size={40}
                  lineWeight={3.5}
                  speed={1}
                  color="white"
                />
              </div>
              :
              <p className={roboto.className} style={{ fontSize: 24 }}>
                {translation}
              </p>
          }
        </div>
      </main>
    </>
  )
}

export default languageTranslate