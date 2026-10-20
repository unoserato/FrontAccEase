// Convert criterion-titled Markdown lessons to editor-compatible Tiptap JSON.
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { getSchema } from '@tiptap/core'
import { StarterKit } from '@tiptap/starter-kit'

const root = new URL('.', import.meta.url)
const output = new URL('tiptap/', root)
await mkdir(output, { recursive: true })
const schema = getSchema([StarterKit])

function inline(nodes, marks = []) {
  return nodes.flatMap((node) => {
    if (node.type === 'text' || node.type === 'inlineCode') {
      if (!node.value) return []
      const nodeMarks = node.type === 'inlineCode' ? [...marks, { type: 'code' }] : marks
      return [{ type: 'text', text: node.value, ...(nodeMarks.length ? { marks: nodeMarks } : {}) }]
    }
    if (node.type === 'break') return [{ type: 'hardBreak' }]
    const mark = { strong: 'bold', emphasis: 'italic', delete: 'strike', link: 'link' }[node.type]
    if (!mark) throw new Error(`Unsupported inline node: ${node.type}`)
    return inline(node.children, [...marks, { type: mark, ...(mark === 'link' ? { attrs: { href: node.url } } : {}) }])
  })
}

function block(node) {
  if (node.type === 'heading') return { type: 'heading', attrs: { level: node.depth }, content: inline(node.children) }
  if (node.type === 'paragraph') return { type: 'paragraph', content: inline(node.children) }
  if (node.type === 'code') return { type: 'codeBlock', attrs: { language: node.lang || null }, ...(node.value ? { content: [{ type: 'text', text: node.value }] } : {}) }
  if (node.type === 'thematicBreak') return { type: 'horizontalRule' }
  if (node.type === 'blockquote') return { type: 'blockquote', content: node.children.map(block) }
  if (node.type === 'list') return { type: node.ordered ? 'orderedList' : 'bulletList', ...(node.ordered ? { attrs: { start: node.start ?? 1 } } : {}), content: node.children.map(block) }
  if (node.type === 'listItem') return { type: 'listItem', content: node.children.map(block) }
  throw new Error(`Unsupported block node: ${node.type}`)
}

const names = (await readdir(root)).filter((name) => /^1\.\d+\.\d+ .+\.md$/.test(name))
for (const name of names) {
  const markdown = (await readFile(new URL(name, root), 'utf8')).replace(/^\uFEFF/, '')
  const tree = unified().use(remarkParse).parse(markdown)
  // The scored mini-assessment and its answers live in a separate record.
  let inAssessment = false
  const lessonNodes = tree.children.filter((node) => {
    if (node.type === 'heading' && node.depth <= 2) {
      const title = node.children.map((child) => child.value || '').join('')
      inAssessment = /^mini-assessment$/i.test(title.trim())
    }
    return !inAssessment
  })
  const doc = { type: 'doc', content: lessonNodes.map(block) }
  schema.nodeFromJSON(doc).check()
  await writeFile(join(fileURLToPath(output), name.replace(/\.md$/, '.json')), JSON.stringify(doc, null, 2) + '\n')
}
console.log(`Validated ${names.length} lesson documents against StarterKit.`)
