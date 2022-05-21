import { enhanceParagraph } from "./enhance.mjs";

console.log('Reader extension on!')

const paragraphs = document.getElementsByTagName("p");
for (var paragraph of paragraphs) {
    paragraph.innerHTML = enhanceParagraph(paragraph.innerHTML);
}