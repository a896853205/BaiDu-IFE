/**
 * @file 模拟VUE
 * @author Qc<896853205@qq.com>
 */

/**
 * 构造函数
 *
 * @class
 * @param {Object} obj 创建Vue类的基本对象
 */

function Vue(obj) {
    // 参数判断
    if (typeof obj === 'object') {
        /**
        * @type {object}
        */
        this.DOM = this.findDOM(obj.el);
        this.data = obj.data;
        this.rander();
    }
    else {
        throw 'Parameter type must object.';
    }
}
/**
 * 寻找根据字符串查找出DOM结点
 *
 * @param {string} DOMClue DOM的全部字符串
 * @return {Object} DOM 获得的DOM对象
 */

Vue.prototype.findDOM = function (DOMClue) {
    // 对于DOMClue参数的判断
    if (typeof DOMClue === 'string') {
        switch (DOMClue[0]) {
            case '#':
                var DOM = document.getElementById(DOMClue.slice(1));
                return DOM;
            case '.':
                break;
        }
    }
    else {
        throw 'El must be string.';
    }
    return;
};
/**
 * 渲染此对象
 *
 */

Vue.prototype.rander = function () {
    if (this.DOM) {
        var unRanderText = this.DOM.innerHTML;
        (function (self) {
            var randeredText = randerText(unRanderText, self);
            if (randeredText) {
                self.DOM.innerHTML = randeredText;
            }

        })(this);
    }

    /**
     * 渲染该DOM字符串
     *
     * @param  {string} unRanderText 未渲染的字符串
     * @param  {Object} self 传送作用域
     * @return {string} unRanderText 渲染完的字符串
     */

    function randerText(unRanderText, self) {
        var rep = /\{{2}(.*)\}{2}/g;
        do {
            var tempRander = rep.exec(unRanderText);
            if (tempRander) {
                unRanderText = unRanderText.replace(tempRander[0], eval('self.data.' + tempRander[1]));
            }

        } while (tempRander);
        return unRanderText;
    }
};
/**
 * 测试用例
 *
 * @type {Vue}
 */
var app = new Vue({
    el: '#app',
    data: {
        user: {
            name: '钱程',
            age: 21
        }
    }
});