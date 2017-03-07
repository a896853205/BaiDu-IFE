/**
 * @file js基础task1的js
 * @author Qc<896853205@qq.com>
 */

(function (){
	let App = {
        init: function (){
            this._bindButtonFunction();
        },
        /**
         * 绑定函数的函数
         *
         * @return {undefined} 无返回值
         */
        _bindButtonFunction: function (){
            let btn = document.getElementById('button');
            let input = document.getElementById('aqi-input');
            let span = document.getElementById('aqi-display');
            let num = 0;

            _bindEvent(btn, 'click', () => {
                let changeTextObj = _changeInnerHTML(span);
                if (num === 0) {
                    changeTextObj.replaceText(input.value);
                }
                else {
                    changeTextObj.pushText(input.value);
                }
                num ++;
            });
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
        }
	};
	window.App = App;
})();