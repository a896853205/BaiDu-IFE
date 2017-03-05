var zjl = {
	name:"zhoujielun",
	leg:2,
	eyes:2,
	city:"xianggang"
}
var qc = {
	name:"qiancheng",
	leg:2,
	eyes:2,
	city:"shenyang",
	friend:zjl
};

Object.defineProperty(qc,"name",{
	configurable:false,
	writable:false
});

function Observer(obj){
	if(typeof obj == "object"){
		this.data = obj;
		this.walk(obj);
	}else
		throw "Parameter's type must object";
}

Observer.prototype.walk = function(obj){
	for(var attr in obj){
		if(obj.hasOwnProperty(attr)){
			var val = obj[attr];		//这里不能把 obj[attr]放到get中呦,会循环调用的.
			if(typeof val === 'object'){
				new Observer(val);
			}
			//这里需要使用立即调用函数,因为闭包的关系呦,也可以拿出去作为函数.
			this.convert(attr,val);
		}
	}
}
/*
* 绑定函数(每个属性的方法,防止闭包)
* @param String
* 		 String
*/
Observer.prototype.convert = function(attr,value){
	if(this.propertyDesCon(this.data,attr))
		Object.defineProperty(this.data,attr,{
			enumerable:true,
			configurable:true,
			get:function(){
				console.log("你访问了" + attr);
				return value;
			},
			set:function(newValue){
				console.log("你设置了" + attr);
				if(value === newValue) return;
				if(typeof newValue === 'object')
					value = (new Observer(newValue)).data;
				else{
					console.log("新的" + attr + "为" + newValue);
					value = newValue;
				}
			}
		});
	else{
		console.log(attr + "这个属性不可以配置.不能加对应的方法.");
	}
}
/*
* 用来判断confgurable是否为true.
* @param Object
* 		 String
* @result boolean
*/
Observer.prototype.propertyDesCon = function(obj,attr){
	return Object.getOwnPropertyDescriptor(obj,attr).configurable;
}