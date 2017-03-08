/**
 * @file js基础task1的js
 * @author Qc<896853205@qq.com>
 */

(function (){
    /**
     * 将数字转化为中文的计数方式
     *
     * @param  {number} num 要转化数字
     * @return {string} chineseNum 返回的中文字符串
     */
    function numTransformChinese (num) {
        const baseNum = ['','一','二','三','四','五','六','七','八','九'];
        const basePlace = ['','十','百','千','万','千万','十万','百万','千万','亿'];
        let post = _calculatePost(num);
        let chineseNum = '';
        num = num + '';
        if (post === 2 && num[0] === '1') {
            let nextNum = num[1];
            return `${basePlace[1]}${baseNum[nextNum]}`;
        }
        for (let i = post;i >= 1;i --) {
            let numValue = num[num.length - i];
            chineseNum += `${baseNum[numValue]}${basePlace[i - 1]}`;
        }
        return chineseNum;
        /**
         * 计算位数
         * @param  {number} num 需要计算位数的数字
         * @return {number} num.length 这个数字的长度
         */
        function _calculatePost (num) {
            num = num + '';
            return num.length;
        }
    }
	let App = {
        /**
         * 页面初始化
         */
        init: function (){
            this._bindButtonFunction();
            return {
                showArrayData: this._showArrayData
            };    
        },
        /**
         * 绑定函数的函数
         *
         * @return {undefined} 无返回值
         */
        _bindButtonFunction: function (){
            const BTN = document.getElementById('button');
            const INPUT = document.getElementById('aqi-input');
            const SPAN = document.getElementById('aqi-display');
            let num = 0;

            if (BTN) {
                _bindEvent(BTN, 'click', () => {
                    let changeTextObj = _changeInnerHTML(SPAN);
                    if (num === 0) {
                        changeTextObj.replaceText(INPUT.value);
                    }
                    else {
                        changeTextObj.pushText(INPUT.value);
                    }
                    num ++;
                });
            }
            /**
             * 兼容IE的更换DOM内容的模块
             *
             * @param {Object} element 改变文本的元素
             * @return {Object} 给出改变DOM内容的方法
             */
            function _changeInnerHTML (element) {
            	/**
            	 * 插入文本到结点后面的功能
            	 *
            	 * @param {string} text 添加到最后的文本
            	 */
            	function _pushText (text) {
                    text += '\n';
            		// HTML5拓展
                    if (element.innerHTML) {
                        element.innerHTML += text;
                    }
                    // DOM0
                    else {
                        let node = document.createTextNode(text);
                        element.append(node);
                    }
            	}
            	/**
            	 * 替换之前的结点内容
            	 *
            	 * @param {string} text 替换之后的文本
            	 */
            	function _replaceText (text) {
                    text += '\n';
                    // HTML5拓展
                    if (element.innerHTML) {
                    	element.innerHTML = text;
                    }
                    // DOM0
                    else {
                    	let node = document.createTextNode(text);
                    	element.childrenNodes = [node];
                    }
            	}
            	// 这个将来想加一些别的方法
            	return {
                    pushText: _pushText,
                    replaceText: _replaceText
            	};
            }
            /**
             * 兼容IE的绑定事件
             *
             * @param  {Object} element 绑定的对象
             * @param  {string} eventType 绑定的类型
             * @param  {Function} handler 绑定的函数
             */
            function _bindEvent (element, eventType, handler) {
                if (element.nodeType === 1) {
                	// DOM2+
                    if (element.addEventListener) {
                        element.addEventListener(eventType, handler);
                    }
                    // IE8
                    else if (element.attachEvent) {
                        element.attachEvent(`on${eventType}`, handler);
                    }
                    // DOM0
                    else {
                        element[`on${eventType}`] = handler;
                    }
                }
                else{
                	throw Error('It not a element.');
                }
            }
        },
        /**
         * 展示数组数据
         *
         * @param {Array} data 数组数据
         */
        _showArrayData: function (data) {
            if (data instanceof Array) {
                if (Array.prototype.forEach) {
                    let noun = 0;
                    _sortInnerArray(data);
                    data.forEach(item => {
                        if (item[1] > 60) {
                            _pushLi(item, noun++); 
                        }
                    });
                }
                else {
                    // for基本
                }
            }
            else {
                throw Error('Param must an Array.');
            }
            /**
             * 插入到ul最后
             * @param {Object} innerArray 每一个数组
             * @param {number} index 位置
             */
            function _pushLi (innerArray, index) {
                const UL = document.getElementById('aqi-list');
                if (UL) {
                    if (UL.innerHTML) {
                        let li =  `<li>第${numTransformChinese(index + 1)}名: ${innerArray[0]},${innerArray[1]}</li>`;
                        UL.innerHTML += li;
                    }
                }
            }
            /**
             * 根据数组内部的数值排序(修改元素组)
             *
             * @param {Array} array 要排序的数组
             */
            function _sortInnerArray (arr) {
                arr.forEach(item => {
                    item.toString = function (){
                        return this[1];
                    };
                });
                arr.sort((a,b) => {
                    return b - a;
                });
            }
        }
        
	};
	window.App = App;
})();