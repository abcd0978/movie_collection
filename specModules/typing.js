/**
 * html태그의 id와 string을 받아서 해당 태그에 타이핑효과로 text를 추가하는 함수
 * @param {string} id
 * @param {string} str
 */
export function typing(id,str,timeMin,timeMax,index){
    const rand = Math.floor(Math.random() * (timeMax-timeMin+1)) + timeMin;
    const content = str
    const text = document.getElementById(id);
    console.log(index);
    if(index < content.length){
        text.textContent += content[index];
        setTimeout(typing,rand,id,str,timeMin,timeMax,++index);
    }
}
