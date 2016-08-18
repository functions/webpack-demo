import 'Styles/index.css';
import NavComp from './modules/NavComp.js';


let bindNavEvent = () => {
    $('.head').on('click', '.js-nav-item', function() {
        let pageId = this.getAttribute('data-page-id'),
            $container = $('body > .main');

        // 首页
        if(pageId === 'home') {
            require.ensure([], () => {
                let home = require('./home.js');
                $container.html( home.getHtml() );
            });
        }
        // 列表页
        else if (pageId === 'list') {
            require.ensure([], () => {
                let list = require('./list.js');
                $container.html( list.getHtml() );
            });
        }
        // 详情页
        else if (pageId === 'detail') {
            require.ensure([], () => {
                let detail = require('./detail.js');
                $container.html( detail.getHtml() );
            });
        }
        
    });
}

let init = () => {
    $('body > .head').html(NavComp.getHtml());
    bindNavEvent();
}

init();