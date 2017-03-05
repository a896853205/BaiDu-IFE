/**
 * @file 模拟VUE
 * @author Qc<896853205@qq.com>
 */

/**
 * Vue构造函数
 *
 * @param {Object} obj 创建Vue类的基本对象
 * @param {undifined | Object} parent 如果有就是这个对象的父级
 */
function Vue(obj, parent) {
    if (typeof obj === 'object') {
        /**
        * @type {object}
        */
        if (obj.data) {
            this.data = obj.data;
            this.handler = {};
            this._walk(this.data);
        }
        else {
            this.data = obj;
            this.parent = parent;
            this._walk(this.data);
        }
        if (obj.el) {
            this.DOM = this._findDOM(obj.el);
            this._rep = /\{{2}(.*)\}{2}/g;
            this._rander();
        }
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

Vue.prototype._findDOM = function (DOMClue) {
    // 对于DOMClue参数的判断
    if (typeof DOMClue === 'string') {
        switch (DOMClue[0]) {
            case '#':
                let DOM = document.getElementById(DOMClue.slice(1));
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
 * 渲染DOM对象显示对象值
 *
 */

Vue.prototype._rander = function () {
    if (this.DOM) {
        let textNodeArr = [];
        findTextNode.call(this, undefined, textNodeArr);
        textNodeArr.forEach(item => {
            randerTextNode.call(this, item);
        });
    }

    /**
     * 查找所有的textNode
     *
     * @param {Object} currentNode 结点
     * @param {Array} textNodeArr 储存text结点的函数
     */
    function findTextNode(currentNode = this.DOM, textNodeArr = []) {
        let childrenNodes = currentNode.childNodes;
        if (childrenNodes.length === 0) {
            return;
        }
        childrenNodes.forEach((item, index) => {
            if (item.nodeType === 3) {
                if (this._rep.test(item.nodeValue)) {
                    textNodeArr.push(item);
                }
            }
            else if (item.nodeType === 1) {
                findTextNode.call(this, item, textNodeArr);
            }
        });
    }
    /**
     * 渲染当前textNode
     *
     * @param {Object}
     */

    function randerTextNode(textNode) {
        this._rep.lastIndex = 0;
        let repObject = this._rep.exec(textNode.nodeValue);
        // 这里应该删掉第一个然后遍历(现在只能查第一个{{}}中的值)
        let keyArr = repObject[1].split('.');
        changeText.call(this, repObject[0], repObject[1]);
        // 绑定这个函数
        this.$watch(keyArr[keyArr.length - 1], function (oldValue, value) {
            textNode.nodeValue = textNode.nodeValue.replace(oldValue, value);
        });

        /**
         * 修改当前文本
         *
         * @param {string} oldText 之前的文本
         * @param {string} newText 要修改的文本(未解析)
         */
        function changeText(oldText, newText) {
            textNode.nodeValue = textNode.nodeValue.replace(oldText, findValueOfObject.call(this, newText));
        }
    }

    /**
     * 寻找对象值
     *
     * @param {string} dataString 没有大括号的内容值
     * @return {string|boolean|number} selfData 返回当前值
     */

    function findValueOfObject(dataString) {
        let valueStack = dataString.split('.');
        let selfData = this.data;
        valueStack.forEach(item => {
            selfData = selfData[item];
        });
        return selfData;
    }
};

/**
 * 遍历所有属性
 *
 * @param {Object} obj 包含data的对象
 */
Vue.prototype._walk = function (obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let value = obj[key];
            if (typeof value === 'object') {
                if (!this.parent) {
                    value = new Vue(value, this).data;
                }
                else {
                    value = new Vue(value, this.parent).data;
                }
            }
            this._convert(key, value);
        }
    }
};

/**
 * 转变所有属性(添加get,set)
 *
 * @param {string} key 属性名
 * @param {string} value 属性值
 */
Vue.prototype._convert = function (key, value) {
    (function (self) {
        Object.defineProperty(self.data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return value;
            },
            set: function (newValue) {
                let oldValue = value;
                value = newValue;
                self.emit.call(self, key, oldValue, newValue);
            }
        });
    })(this);
};

/**
 * '订阅'函数
 *
 * @param {string} hander 订阅字符串
 * @param {Function} func 绑定的函数
 * @return {Object} this 自己本身
 */
Vue.prototype.$watch = function (hander, func) {
    if (!this.handler[hander]) {
        this.handler[hander] = [];
    }
    this.handler[hander].push(func);
    return this;
};

/**
 * '发布'函数(触发)
 *
 * @param {string} eventType 对应订阅的参数
 * @param {string} oldValue 之前的值
 * @param {...string} param 新的值
 * @return {Object} this 自己本身
 */
Vue.prototype.emit = function (eventType, oldValue, ...param) {
    let parent = null;
    if (this.parent) {
        parent = this.parent;
    } else {
        parent = this;
    }
    param.unshift(oldValue);
    parent.handler[eventType].forEach(item => {
        item.apply(parent, param);
    });
    return this;
};

/**
 * 测试用例
 *
 * @type {Vue}
 */
let app = new Vue({
    el: '#app',
    data: {
        user: {
            name: '钱程',
            age: 21
        }
    }
});
