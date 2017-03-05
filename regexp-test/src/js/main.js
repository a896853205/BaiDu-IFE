(function(){
	/*
	* @param input 输入框
	* 		 regExp 正则规则
	*		 button 开始按钮
	*		 showTestDiv 展示test的结果
	*/
	function main(input,regExp,button,showTestDiv){
		button.onclick = function(){
			showTestDiv.innerHTML = regExp.test(input.value);
		};
	}
	/*
	* @param id
	* @result HTMLnode
	*/
	function byId(id){
		return document.getElementById(id);
	}
	main(
		byId("phoneInput"),
		/^(139|138|137|136|135|134|159|158|157|150|151|152|188|130|131|132|156|155|133|153|189)[0-9]{8}$/,
		byId("phoneButton"),
		byId("phoneTestShow")
		);
	main(
		byId("wordInput"),
		/(^|\s)(\b\w+\b)\s+\2/,
		byId("wordButton"),
		byId("wordTestShow")
		);
	main(
		byId("myInput"),
		eval(byId("myRegExp").value),		//这么做很危险,图个方便,以后肯定不会这么写.
		byId("myButton"),
		byId("myTestShow")
		);
})();