const fs = require('fs');
const input = fs.readFileSync('curriculum/p1-source.md', 'utf8').replace(/^\uFEFF/, '');
const content = [];
for (const block of input.split(/(```[\s\S]*?```)/).flatMap((part) => part.startsWith('```') ? [part] : part.split(/\r?\n\s*\r?\n/))) {
  if (!block.trim()) continue;
  if (block.startsWith('```')) {
    const text = block.replace(/^```[^\n]*\r?\n/, '').replace(/\r?\n```\s*$/, '');
    content.push({type:'codeBlock',attrs:{language:null},content:[{type:'text',text}]});
  } else if (block.startsWith('#')) {
    const m = block.match(/^(#+)\s+([\s\S]*)/);
    content.push({type:'heading',attrs:{level:m[1].length},content:[{type:'text',text:m[2].trim()}]});
  } else {
    content.push({type:'paragraph',content:[{type:'text',text:block.replace(/\r?\n/g,' ')}]});
  }
}
const doc = {type:'doc',content};
fs.writeFileSync('curriculum/p1-accessibility-foundations.json', JSON.stringify(doc,null,2)+'\n');
const {getSchema}=require('@tiptap/core');
const {StarterKit}=require('@tiptap/starter-kit');
const schema=getSchema([StarterKit]);
const parsed=schema.nodeFromJSON(doc); parsed.check();
console.log(`Validated ${content.length} blocks against StarterKit; ${input.split(/\s+/).length} words including code.`);
