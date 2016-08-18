
module.exports = {
    getHtml: function() {
        return [
            '<div>',
                '<button class="js-nav-item" data-page-id="home">首页</button>',
                '<button class="js-nav-item" data-page-id="list">列表</button>',
                '<button class="js-nav-item" data-page-id="detail">详情</button>',
            '</div>'
        ].join('');
    }
};