const fs = require('fs');
const path = 'C:/Users/jeeva/.gemini/antigravity-ide/brain/4d0ff56f-fb86-498f-98ce-74d8efa8f011/.system_generated/logs/transcript.jsonl';
const content = fs.readFileSync(path, 'utf8');

const regex = /\"ReplacementContent\":\"(.*?)\"/g;
let match;
let best = '';
while ((match = regex.exec(content)) !== null) {
    let unescaped = match[1].replace(/\\\\n/g, '\n').replace(/\\\\\"/g, '\"').replace(/\\\\t/g, '\t').replace(/\\\\\\\\/g, '\\\\');
    if (unescaped.length > best.length && unescaped.includes('InteractiveQuiz')) {
        best = unescaped;
    }
}
if (best) {
    fs.writeFileSync('d:/DSA ROAD MAP/mern-dsa-app/frontend/src/pages/Learn.jsx.regex', best);
    console.log('Regex extracted best length:', best.split('\n').length);
}
