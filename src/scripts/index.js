import 'Styles/index.css';
import ModuleA from './modules/ModuleA.js';

let init = () => {
    document.querySelector('.main').innerHTML = ModuleA.getHtml();
}

init();