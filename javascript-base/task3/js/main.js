/**
 * @file task3基本JS任务
 * @author Qc<896853205@qq.com>
 */

(function (){
    let App = {
        /**
         * getData方法
         * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
         * 返回一个数组，格式见函数中示例
         *
         * @return [Array] data返回数据的数组
         */
        getData: function (){
        	let unsortUl = document.getElementById('source');
        	console.log(unsortUl);
        	let unSortAllLi = Common.changeToArray(unsortUl.children);
        	let data = [];
        	unSortAllLi.forEach(item => {
                // 地点
                let local = item.innerHTML.slice(0, 2),num;
                let children = Common.changeToArray(item.childNodes);
                children.forEach(item => {
                	if (item.nodeType === 1 && item.nodeName === "B") {
                        num = item.innerHTML;
                	}
                });
                data.push([local, num]);
        	});
        	return data;
        },
        /**
         * 数据排序
         * @param {Array} data 未排序的数组
         * @return {Array} 排完序的数组
         */
        sortAqiData: function (data){
            data.forEach(item => {
            	item.valueOf = function (){
            		return item[1];
            	}
            });
            data.sort((a, b) => {
                return a - b;
            });
            return data;
        },
        /**
         * render
         * @param {Array} data 数组参数
         * @return {undefined} 无返回值
         */
        render: function (data){
        	let resortUl = document.getElementById("resort");
        	resortUl.innerHTML = "";
	        data.forEach((item, index) => {
	        	let num = numTransformChinese(index + 1);
                resortUl.innerHTML += `<li>第${num}名: ${item[0]}空气质量: <b>${item[1]}</b></li>`
	        });
        },
        /**
         * 按钮驱动事件
         */
        btnHandle: function (){
            let aqiData = this.getData();
            aqiData = this.sortAqiData(aqiData);
            this.render(aqiData);
        },
        /**
         * 初始化按钮事件
         */
        init: function (){
        	let sortBtn = document.getElementById("sort-btn");
        	let self = this;
        	sortBtn.onclick = function(){
                self.btnHandle();
        	}
        }
    };
    let Common = {
    	/**
    	 * 从类数组转到数组
    	 * @param  {Object} arr 类数组
    	 * @return {Array} 真正的数组
    	 */
    	changeToArray: function (arr){
            return Array.prototype.slice.call(arr, 0);
    	}
    }
    /**
     * 将数字转化为中文的计数方式
     *
     * @param  {number} num 要转化数字
     * @return {string} chineseNum 返回的中文字符串
     */
    function numTransformChinese (num) {
        const baseNum = ['','一','二','三','四','五','六','七','八','九'];
        const basePlace = ['','十','百','千','万','千万','十万','百万','千万','亿'];
        num += '';
        let post = _calculatePost(num);
        let chineseNum = '';
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
         * @param  {string} num 需要计算位数的字符串
         * @return {number} num.length 这个数字的长度
         */
        function _calculatePost (num) {
            return num.length;
        }
    }
    window.App = App;
})();