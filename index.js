import fs from 'fs'
import dotenv from 'dotenv'
import { URL } from './const.js'

dotenv.config()

const text = process.argv[2] ?? 'Introduce un texto por consola'

const response = await fetch(`${URL}&token=${process.env.TOKEN}`, {
  method: 'POST',
  body: JSON.stringify({
    audioConfig: {
      audioEncoding: "LINEAR16",
      pitch: 0,
      speakingRate: 1
    },
    input: {
      text
    },
    voice: {
      languageCode: "es-US",
      name: "es-US-Neural2-B"
    }
  })
})

const { audioContent } = await response.json()
const buffer = Buffer.from(audioContent, 'base64')

if (!fs.existsSync('./output')) fs.mkdirSync('./output')

fs.writeFileSync(`./output/${text}.mp3`, buffer)


