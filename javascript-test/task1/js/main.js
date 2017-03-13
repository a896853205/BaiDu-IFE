/**
 * @file 基础javascript练习(一)
 * @author Qc<896853205@qq.com>
 */

(function (){
	let App = {
		_data:[],
		/**
		 * 左侧入函数
		 * @param {number} numData 左侧入的数值
		 * @return {undefined} 无返回值
		 */
		leftIn: function (numData){
            App._data.unshift(numData);
            App.render();
		},
		/**
		 * 左侧出函数
		 * @return {number} outNum 左侧出的数值
		 */
		leftOut: function (){
            let outNum = App._data.shift();
            App.render();
            return outNum;
		},
		/**
		 * 右侧入函数
		 * @param {number} numData 右侧入的数值
		 * @return {undefined} 无返回值
		 */
		rightIn: function (numData){
            App._data.push(numData);
            App.render();
		},
		/**
		 * 右侧出函数
		 * @return {number} outNum 右侧出函数 
		 */
		rightOut: function (){
            let outNum = App._data.pop();
            App.render();
            return outNum;
		},
		/**
		 * 绑定所有时间函数
		 * @return {undefined} 无返回值
		 */
		bindHandler: function (){
            let leftOutBtn = document.getElementById('leftOut-button');
            let leftInBtn = document.getElementById('leftIn-button');
            let input = document.getElementById('num-input');
            let rightInBtn = document.getElementById('rightIn-button');
            let rightOutBtn = document.getElementById('rightOut-button');
            let showDiv = document.getElementById('show-div');
            leftInBtn.onclick = function (){
                let value = input.value;
                if (App._inputJudge(value)) {
                    App.leftIn(value);
                }
                else {
                    alert('请输入正确的数值');
                }
            }
            leftOutBtn.onclick = function (){
            	if (App._data.length === 0) {
                    alert('没有数啦');
            	}
            	else {
                    let outValue = App.leftOut();
                    App.outHandler(outValue);	
            	}
            }
            rightInBtn.onclick = function (){
                let value = input.value;
                if (App._inputJudge(value)) {
                    App.rightIn(value);
                }
                else {
                    alert('请输入正确的数值');
                }
            }
            rightOutBtn.onclick = function (){
                if (App._data.length === 0) {
                    alert('没有啦');
                }
                else {
                    let outValue = App.rightOut();
                    App.outHandler(outValue);
                }
            }
            // 绑定展示框点击事件
            showDiv.addEventListener('click',event => {
                let item = event.target;
                if (item.nodeName === 'SPAN' && item.nodeType === 1) {
                    let arr = Array.prototype.slice.call(item.parentNode.childNodes);
                    let outIndex = arr.indexOf(item);
                    App._data.splice(outIndex, 1);
                    App.render();
                }
            });
		},
		/**
		 * 判断输入框的内容
		 * @param {string} value 输入的字符串
		 * @return {boolean} 判断的布尔值
		 */
		_inputJudge: function (value){
            let inputRepexp = /^[1-9]{1}\d{0,3}$/;
            return inputRepexp.test(value);
		},
		/**
		 * 返回时调用函数
		 * @param {number} outValue 输出的值
		 * @return {undefined} 无返回值
		 */
		outHandler: function (outValue){
            alert(outValue);
		},
		render: function (){
            let showDiv = document.getElementById('show-div');
            showDiv.innerHTML = '';
            App._data.forEach(item => {
            	showDiv.innerHTML += `<span>${item}</span>`
            });
		},
		init: function (){
            this.bindHandler();
		}
	}
	window.App = App;
})();