/**
 * @file 基础javascript练习(二)
 * @author Qc<896853205@qq.com>
 */

(function (){
	let App = {
		_data:[61,45,35,12,48,62,48,99,54,64],
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
		 * @param {string} id 要绑定事件的DOM的ID
         * @param {Function} bindFunction 绑定的函数
         * @param {string} type 绑定的方式
		 */
		bindHandler: function (id, bindFunction, type = "click"){
            let dom = document.getElementById(id);
            dom.addEventListener(type, bindFunction);
		},
		/**
		 * 判断输入框的内容
		 * @param {string} value 输入的字符串
		 * @return {boolean} 判断的布尔值
		 */
		_inputJudge: function (value){
            // 10-100
            let inputRepexp = /^[1-9]{1}\d{1,2}$/;
            if (inputRepexp.test(value) && value >= 10 && value <= 100) {
                // 上限60个    
                if (App._data.length >= 60) {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
		},
		/**
		 * 返回时调用函数
		 * @param {number} outValue 输出的值
		 * @return {undefined} 无返回值
		 */
		outHandler: function (outValue){
            alert(outValue);
		},
        /**
         * 渲染函数
         * @return {undefined} 无返回值
         */
		render: function (){
            let showDiv = document.getElementById('show-div');
            showDiv.innerHTML = '';
            App._data.forEach((item, index) => {
                // 宽度30px, 间距5px
                let left = index * 35;
            	showDiv.innerHTML += `<span style='position:absolute;bottom:0;left:${left}px;height:${item}px'>${item}</span>`
            });
		},
        bubbleSort: function (){
            /**
             * 改变两个颜色
             * @param {number} j index值
             * @param {string} two className值
             * @return {undefined} 无返回值
             */
            function changeTwoColor (j, two){
                App.changeColor(j, two);
                App.changeColor(j + 1, two);
            }
            /**
             * 交换两个index值
             *
             * @param  {number} j 要改变的低的值
             * @return {undefined} 无返回值
             */
            function exchangeIndex(j){
                if(App._data[j] > App._data[j + 1]) {
                    // 互相调换
                    [App._data[j], App._data[j + 1]] = [App._data[j + 1], App._data[j]];
                    App.render();
                    App.changeColor(j);
                    App.changeColor(j + 1);
                }
            }
            /**
             * 主体的迭代器
             *
             * @yield {Function} changeTwoColor 改变颜色
             * @yield {Function} 交换两者
             * @yield {Function} 改变回颜色
             */
            function *mainRun () {
                for (let i = App._data.length;i > 0;i--) {
                    for (let j = 0;j < i - 1;j++) {
                        yield changeTwoColor(j);
                        yield exchangeIndex(j);
                        yield changeTwoColor(j, "");
                    }
                }
            }
            // 主循环
            let main = mainRun();
            let bubbleInterval = setInterval(() => {
                let flag = main.next();
                if (flag.done) {
                    clearInterval(bubbleInterval);
                    setTimeout(() => {
                        App._data.forEach((item, index) => {
                            App.changeColor(index, 'btn-success');
                        });
                    }, 500);
                }
            }, 500);
        },
        /**
         * 指定index改变颜色
         * @param {number} index 要改变颜色的位置
         * @param {string} className 改变的颜色的类名
         * @return {undefined} 无返回值
         */
        changeColor: function (index, className = "btn-danger"){
            let showDiv = document.getElementById('show-div');
            let arr = Array.prototype.slice.call(showDiv.childNodes);
            arr[index].setAttribute('class',className);
        },
        init: function (){
            let input = document.getElementById('num-input');
            // 左出绑定事件
            this.bindHandler('leftIn-button', () => {
                let value = input.value;
                if (App._inputJudge(value)) {
                    App.leftIn(value);
                }
                else {
                    alert('请输入正确的数值');
                }
            });
            // 左进绑定事件
            this.bindHandler('leftOut-button', () => {
                if (App._data.length === 0) {
                    alert('没有数啦');
                }
                else {
                    let outValue = App.leftOut();
                    App.outHandler(outValue);   
                }
            });
            // 右进绑定事件
            this.bindHandler('rightIn-button', () => {
                let value = input.value;
                if (App._inputJudge(value)) {
                    App.rightIn(value);
                }
                else {
                    alert('请输入正确的数值');
                }
            });
            // 右出绑定事件
            this.bindHandler('rightOut-button', () => {
                if (App._data.length === 0) {
                    alert('没有啦');
                }
                else {
                    let outValue = App.rightOut();
                    App.outHandler(outValue);
                }
            });
            // 展示框点击绑定事件
            this.bindHandler('show-div', event => {
                let item = event.target;
                if (item.nodeName === 'SPAN' && item.nodeType === 1) {
                    let arr = Array.prototype.slice.call(item.parentNode.childNodes);
                    let outIndex = arr.indexOf(item);
                    App._data.splice(outIndex, 1);
                    App.render();
                }
            });
            // 冒泡排序点击事件
            this.bindHandler('bublleSort-button', App.bubbleSort);
            this.render();
		}
	}
	window.App = App;
})();