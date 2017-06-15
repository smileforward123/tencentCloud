/*function $(selector,content){
	if( selector.charAt(0) === "#" ){
		return document.getElementById(selector.slice(1))
	}else{
		content = content || document;
		return 	content.getElementsByTagName(selector);
	};
};*/
function getStyle( obj,attr ){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];		
};
function doMove(obj,attr,target,speed,callBack){
	var cur = parseInt( getStyle(obj,attr) );

	//速度 正负取决于 当前位置和目标点的大小
	// 当前位置  < 目标点 速度是正的
	// 当前位置  > 目标点 速度是负的
	speed = cur < target ? Math.abs(speed) : -Math.abs(speed);
	//var timer = null;
	clearInterval(obj.timer);  //先清除，在开启
	obj.timer = setInterval(function (){
		cur += speed;
		if(  cur >= target && speed > 0 ||  cur <= target && speed < 0){
			clearInterval(obj.timer);
			cur = target;
			obj.style[attr] = cur + "PX";	

			/*if( typeof callBack === "function"){
				callBack();
			}*/

			typeof callBack === "function" &&　callBack();
		}else{
			obj.style[attr] = cur + "PX";	
		}

		
	},30);
}

function shake(obj,attr,speed){
	//如果这个元素身上已经有定时器开着，那么下面代码就不执行了

	if( obj.timer ) return;
	var cur = parseInt(getStyle(obj,attr)); //找到元素的起始位置
	var arr = [];
	for( var i = speed; i > 0 ; i-=3 ){
		arr.push(-i,i);
	}
	arr.push(0);
	var n = 0;
	obj.timer = setInterval(function (){
		obj.style[attr] = arr[n]+cur + "px";
		n++;
		if( n >= arr.length ){
			clearInterval(obj.timer);
			obj.timer = null;
		}
	},30)	
}

function offset(obj) {
	var left = 0;
	var top = 0;

	var bl = parseInt(getStyle(obj,"borderLeftWidth"));
	var bt = parseInt(getStyle(obj,"borderTopWidth"));

	if( isNaN(bl) ){
		bl = 0
	}
	if( isNaN(bt) ){
		bt = 0
	}

	while(obj){
		/*console.log( getStyle(obj,"borderLeftWidth") );*/

		var l = parseInt(getStyle(obj,"borderLeftWidth"));
		var t = parseInt(getStyle(obj,"borderTopWidth"));

		if( isNaN( l ) ){
			l = 0;
		}
		if( isNaN( t ) ){
			t = 0;
		}

		left +=l;
		top +=t;
		left += obj.offsetLeft;
		top += obj.offsetTop;
		obj = obj.offsetParent;
	}

	return{
		left:left-bl,
		top:top-bt
	};
}
//鼠标滚轮事件;
function mousewheel(obj,upFn,downFn){
      
      obj.onmousewheel = fn;
      if(obj.addEventListener){
        obj.addEventListener("DOMMouseScroll",fn,false);
      }
      function fn(ev){
        var e = ev || event;
        var direction = true;
        if( e.wheelDelta ){ //chrome
          direction = e.wheelDelta > 0 ? true : false;
        }else{  //FF
          direction = e.detail < 0 ? true : false;
        }
        if( direction ){  //向上
          typeof upFn === "function" && upFn(e);
        }else{ //向下
          typeof downFn === "function" && downFn(e);
        }

        if(e.preventDefault){
          e.preventDefault();  //ie低版本不兼容(ff下支持的)
        }

        return false;
      } 
}
    //格式化日期
function format(str){
    var re = /(\d+)\D+(\d+)\D+(\d+)/g;
    return str.replace(re,function ($0,$1,$2,$3){
        return $1 + "年" + $2 + "月" + $3 + "日";
    }); 
};
//设置cookie
function setCookie( key,value,t ){
                var now = new Date();
                t = t || 0;
                now.setDate(now.getDate()+t); //设置天数
                if( t ){

                    document.cookie = key + "=" + value+";expires="+now.toUTCString();  
                }else{
                    document.cookie = key + "=" + value;    
                }
}
//获取cookie
function getCookie(key){
                //"username=momo; age=30"

                var arr = document.cookie.split("; ");
                // ["username=momo","age=30"]
                for( var i = 0; i < arr.length; i++ ){
                    var newArr = arr[i].split("=");
                    if( newArr[0] === key ){
                        return newArr[1];
                    }
                }
}
function testPengzhuang( obj1,obj2 ){
                var obj1W = obj1.offsetWidth;
                var obj1H = obj1.offsetHeight;
                var obj1L = obj1.offsetLeft;
                var obj1T = obj1.offsetTop;

                var obj2W = obj2.offsetWidth;
                var obj2H = obj2.offsetHeight;
                var obj2L = obj2.offsetLeft;
                var obj2T = obj2.offsetTop;
                //碰上返回true 否则返回false
                if( obj1W+obj1L>obj2L && obj1T+obj1H > obj2T && obj1L < obj2L+obj2W && obj1T<obj2T+obj2H ){
                    return true
                }else{
                     return false;
                }

}