
/**
 * html태그의 id와 string을 받아서 해당 태그에 타이핑효과로 text를 추가하는 함수
 * @param {string} id
 * @param {string} str
 */
export function typing(id,str){
    let index = 0;
    const content = str;
    const text = document.getElementById(id);
    while(index < content.length){
        text.textContent += content[index];
        index++;
    }
}
function sleep(delay){ 
    const start = new Date().getTime(); 
    while (new Date().getTime() < start + delay); 
}
function randomGenerator(min,max){
    const rand = Math.floor(Math.random() * max-min+1) + min;
    return rand
}
