// Convert authoring quizzes into the separate fields used by POUR assessments.
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = new URL('.', import.meta.url)
const output = new URL('assessments/', root)
await mkdir(output, { recursive: true })
const names = (await readdir(root)).filter((name) => /^1\.\d+\.\d+ .+(?:\.quiz|\.assessment| mini-assessment)\.json$/.test(name))
const seen = new Set()
for (const name of names) {
  const criterion = name.match(/^1\.\d+\.\d+/)[0]
  if (seen.has(criterion)) throw new Error(`Duplicate assessment for ${criterion}`)
  seen.add(criterion)
  const quiz = JSON.parse(await readFile(new URL(name, root), 'utf8'))
  const answer_key = {}, explanations = {}
  const pages = quiz.pages.map((page) => ({
    name: page.name, title: page.title || '',
    elements: page.elements.map((q) => {
      if (q.type !== 'radiogroup' || !q.name || !q.title || !Array.isArray(q.choices) || !q.choices.includes(q.correctAnswer) || !(q.feedback || q.explanation)) throw new Error(`Invalid question in ${name}`)
      if (q.name in answer_key) throw new Error(`Duplicate question name in ${name}`)
      answer_key[q.name] = q.correctAnswer
      explanations[q.name] = q.feedback || q.explanation
      return { type: q.type, name: q.name, title: q.title, choices: q.choices, isRequired: true }
    }),
  }))
  const result = { questions: { title: quiz.title, pages }, answer_key, explanations, passing_percent: 70, max_attempts: 3 }
  await writeFile(join(fileURLToPath(output), `${criterion}.json`), JSON.stringify(result, null, 2) + '\n')
}
console.log(`Converted ${names.length} separate assessment documents.`)
