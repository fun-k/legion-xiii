import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = process.env.NETLIFY_AI_GATEWAY_BASE_URL?.replace(/\/$/, '')
const apiKey = process.env.NETLIFY_AI_GATEWAY_KEY

if (!baseUrl || !apiKey) {
  console.error('Missing NETLIFY_AI_GATEWAY_BASE_URL or NETLIFY_AI_GATEWAY_KEY')
  process.exit(1)
}

const model = 'gemini-3.1-flash-image'

const jobs = [
  {
    file: 'legion-crest.png',
    prompt:
      'A single heraldic emblem, digital illustration, centered on a plain flat solid black background: an ornate Imperial eagle crest for a Roman-inspired fantasy legion, wings spread, clutching a bundle of ceremonial rods, with the roman numeral "XIII" engraved on a shield at its chest. Rendered in aged brass, dark bronze and deep crimson enamel with visible wear and patina, in the style of a heavy engraved wax seal or embossed metal insignia. Symmetrical, sharp linework, dramatic single-light-source shading, no text besides the numeral, no photograph elements, no border frame, no background scenery.',
    aspect: '1:1',
  },
  {
    file: 'archive-hero.png',
    prompt:
      'Wide cinematic interior of a vast stone castle archive and library hall at night, tall dark oak shelves packed with leather-bound tomes and rolled scrolls, a long reading table with scattered ledgers and a burning candelabra, deep crimson banners with an eagle sigil hanging between stone columns, warm candlelight and torchlight against cold blue shadows, dust motes in the air, moody painterly fantasy game concept art, dark color palette of black, charcoal stone, aged leather brown and crimson red, no visible people, no text.',
    aspect: '16:9',
  },
]

for (const job of jobs) {
  console.log(`Generating ${job.file}...`)
  const res = await fetch(`${baseUrl}/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: job.prompt }] }],
      generationConfig: {
        imageConfig: { aspectRatio: job.aspect },
      },
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error(`Failed for ${job.file}: ${res.status} ${errText}`)
    continue
  }

  const data = await res.json()
  const parts = data?.candidates?.[0]?.content?.parts ?? []
  const imagePart = parts.find((p) => p.inlineData)

  if (!imagePart) {
    console.error(`No image data returned for ${job.file}`, JSON.stringify(data).slice(0, 500))
    continue
  }

  const buffer = Buffer.from(imagePart.inlineData.data, 'base64')
  const outPath = path.join('public', 'img', job.file)
  await writeFile(outPath, buffer)
  console.log(`Saved ${outPath} (${buffer.length} bytes)`)
}
