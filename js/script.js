import Argus from './Argus.js'
import Sipal from './Sipal.js'

doIfExist(Argus.commentButtonsList, Argus.removeComments);

document.addEventListener('keydown', hotKey);
function hotKey(e) {
  if ((e.altKey && e.key === 'g') || (e.altKey && e.key === 'п')) {
    let deviceTab = document.querySelector("#inst_tab_view > ul").children[1].firstElementChild;
    deviceTab.click();
    doIfExist(Argus.deviceLocation, Argus.getDataGroupDamage, 100, 30);
  } else if ((e.altKey && e.key === 'n') || (e.altKey && e.key === 'т')) {
    Argus.addComment('Необходимо дозвониться до клиента, при ответе – перевести на 2 ЛТП');
  } else if ((e.altKey && e.key === 'x') || (e.altKey && e.key === 'ч')) {
    Sipal.getInfo();
  } else if ((e.altKey && e.key === 'k') || (e.altKey && e.key === 'л')) {
    Argus.makeDecision('Передать в КДГ (диагностика)');
  } else if ((e.altKey && e.key === 'z') || (e.altKey && e.key === 'я')) {
    Argus.makeDecision('Закрыть');
  } else if ((e.altKey && e.key === 'v') || (e.altKey && e.key === 'м')) {
    Argus.visit('Какой-то коммент');
  } else if ((e.altKey && e.key === 'w') || (e.altKey && e.key === 'ц')) {
    Argus.waitGP();
  }
}

async function doIfExist(domElement, func, timer = 100, count = 20) {
  while (count > 0) {
    count--;
    let result = await new Promise(resolve => {
      setTimeout(() => {
        resolve(!!document.querySelector(domElement));
      }, timer);
    });
    if (result) {
      func();
      break;
    }
  }
}

const myDecoder = {
  symbolKeeper: new Map([
    ['~', '%7E'],
    ['`', '60%'],
    ['\'', '27%'],
    ['"', '22%'],
    ['@', '40%'],
    ['?', '%3F'],
    ['!', '21%'],
    ['#', '23%'],
    ['№', '%B9'],
    ['$', '24%'],
    ['%', '25%'],
    ['^', '%5E'],
    ['&', '26%'],
    ['+', '%2B'],
    ['*', '%2A'],
    [':', '%3A'],
    [',', '%2C'],
    ['(', '%28'],
    [')', '%29'],
    ['{', '%7B'],
    ['}', '%7D'],
    ['[', '%5B'],
    [']', '%5D'],
    ['<', '%3C'],
    ['>', '%3E'],
    ['/', '%2F'],
    [' ', '%20'],
    ['А', '%C0'],
    ['а', '%E0'],
    ['Б', '%C1'],
    ['б', '%E1'],
    ['В', '%C2'],
    ['в', '%E2'],
    ['Г', '%C3'],
    ['г', '%E3'],
    ['Д', '%C4'],
    ['д', '%E4'],
    ['Е', '%C5'],
    ['е', '%E5'],
    ['Ё', '%A8'],
    ['ё', '%B8'],
    ['Ж', '%C6'],
    ['ж', '%E6'],
    ['З', '%C7'],
    ['з', '%E7'],
    ['И', '%C8'],
    ['и', '%E8'],
    ['Й', '%C9'],
    ['й', '%E9'],
    ['К', '%CA'],
    ['к', '%EA'],
    ['Л', '%CB'],
    ['л', '%EB'],
    ['М', '%CC'],
    ['м', '%EC'],
    ['Н', '%CD'],
    ['н', '%ED'],
    ['О', '%CE'],
    ['о', '%EE'],
    ['П', '%CF'],
    ['п', '%EF'],
    ['Р', '%D0'],
    ['р', '%F0'],
    ['С', '%D1'],
    ['с', '%F1'],
    ['Т', '%D2'],
    ['т', '%F2'],
    ['У', '%D3'],
    ['у', '%F3'],
    ['Ф', '%D4'],
    ['ф', '%F4'],
    ['Х', '%D5'],
    ['х', '%F5'],
    ['Ц', '%D6'],
    ['ц', '%F6'],
    ['Ч', '%D7'],
    ['ч', '%F7'],
    ['Ш', '%D8'],
    ['ш', '%F8'],
    ['Щ', '%D9'],
    ['щ', '%F9'],
    ['Ъ', '%DA'],
    ['ъ', '%FA'],
    ['Ы', '%DB'],
    ['ы', '%FB'],
    ['Ь', '%DC'],
    ['ь', '%FC'],
    ['Э', '%DD'],
    ['э', '%FD'],
    ['Ю', '%DE'],
    ['ю', '%FE'],
    ['Я', '%DF'],
    ['я', '%FF'],
  ]),
  decode: function(str) {
    let result = '';
    for (const ch of str) {
      if (this.symbolKeeper.get(ch)) {
        result += this.symbolKeeper.get(ch);
      } else {
        result += ch;
      }
    }
    return result;
  },
}
