import { enhanceParagraph } from "./enhance.mjs";

console.log('Reader extension on!')

const style = document.createElement('style');
document.head.appendChild(style);
style.appendChild(document.createTextNode(".steve000-read-extension { font-weight: bold; }"));

const paragraphs = document.getElementsByTagName("p");
for (var paragraph of paragraphs) {
    paragraph.innerHTML = enhanceParagraph(paragraph.innerHTML);
}