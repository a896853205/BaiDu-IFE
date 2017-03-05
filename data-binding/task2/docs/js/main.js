var zjl = {
	name:"zhoujielun",
	leg:2,
	eyes:2,
	city:"xianggang",
	hp:100
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

function Observer(obj,parent,keyName){
	if(typeof obj == "object"){
		this.data = obj;
		this.shandler = {};
		this.ghandler = {};
		if(typeof parent == 'object'){
			this.parent = parent;
			this.keyName = keyName;
		}
		this.walk(obj);
	}else
		throw "Parameter's type must object";
}
Observer.prototype.walk = function(obj){
	for(var attr in obj){
		if(obj.hasOwnProperty(attr)){
			var val = obj[attr];		//这里不能把 obj[attr]放到get中呦,会循环调用的.
			if(typeof val === 'object'){
				//这里应该封装成函数，给子对象绑定该有的参数.
				var child = new Observer(val,this,attr);
				val.parent = child.parent;
				val.keyName = child.keyName;
				/*for(var property in child){
					if(child.hasOwnProperty(property) && property != "data"){
						val[property] = child[property];
					}
				}*/
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
	if(this.propertyDesCon(this.data,attr)){
		var self = this;
		Object.defineProperty(self.data,attr,{
			enumerable:true,
			configurable:true,
			get:function(){
				self.getCallBack.call(self,attr);
				return value;
			},
			set:function(newValue){
				if(value === newValue) return;
				self.setCallBack.call(self,attr,newValue);
				if(typeof newValue === 'object'){
					var child = new Observer(newValue,self,attr);
					value = child.data;
					for(var property in child){
						if(child.hasOwnProperty(property) && property != "data"){
							value[property] = property;
						}
					}
				}
				else
					value = newValue;
			}
		});
	}
	else
		console.log(attr + "这个属性不可以配置.不能加对应的方法.");
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
/*
* set调用的函数.
* @param String
*		 String/Object
*/
Observer.prototype.setCallBack = function(attr,newValue){
	//这个参数就不用判断了.
	var proHandler = this.shandler[attr];
	if(!proHandler || proHandler.length == 0){	//没绑定函数时,自己自动调用默认
		console.log("你设置了" + attr);
		console.log("新的" + attr + "为" + newValue);
	}else{
		for(var i = 0;i < proHandler.length;i ++){
			//这里需要使用call指定上下文
			proHandler[i].call(this,newValue);
		}
	}
	//如果父级存在调用父级的setCallBack.
	if(this.parent)
		this.parent.setCallBack.call(this.parent,this.keyName);
};
/*
* get调用的函数.
* @param String
*		 String/Object
*/
Observer.prototype.getCallBack = function(attr){
	//这个参数就不用判断了.
	var proHandler = this.ghandler[attr];
	if(!proHandler || proHandler.length == 0)	//没绑定函数时,自己自动调用默认
		console.log("你访问了" + attr);
	else
		for(var i = 0;i < proHandler.length;i ++){
			//这里需要使用call指定上下文
			proHandler[i].call(this);
		}
};
/*
* 绑定自定义的get,set函数
* @param String
* 		 Function
*/
Observer.prototype.$watch = function(attr,scallback,gcallback){
	//做出attr参数判断
	if(typeof attr === 'string'){
		if(!(attr in this.data))
			throw "This property not in this object.";
		if(!this.propertyDesCon(this.data,attr))
			throw "This property's configurable must be ture!";
	}else
		throw "Attr must a string."
	//好想用ES6的语法啊,就不用这样写默认参数了.
	var scallback = scallback || "";
	var gcallback = gcallback || "";
	if(!this.shandler[attr])
		this.shandler[attr] = [];
	if(!this.ghandler[attr])
		this.ghandler[attr] = [];
	//做出scallback参数判断
	if(typeof scallback === 'function')
		this.shandler[attr].push(scallback);
	else if(scallback === ""){}
	else
		throw "Second must a function.";
	//做出gcallback参数判断
	if(typeof gcallback === 'function')
		this.ghandler[attr].push(gcallback);
	else if(gcallback === ""){}
	else
		throw "Second must a function.";
}