window.onload=function(){
    var arr=["img/banner_1.png","img/banner_2.png","img/banner_3.png"];
    //图片路径是相对于html文件的
    var oLoginlist=document.getElementById("loginList");
    var aLi=oLoginlist.getElementsByTagName("li");
    var aImg=oLoginlist.getElementsByTagName('img');
    var width=parseInt(getStyle(aLi[0],"width"));
     var n=0;
     
     //图片轮播;
     play();
     function play(){
             setInterval(function(){
            n++;
            if(n>arr.length-1){
                n=0;
            }
            aImg[1].src=arr[n];
            //console.log(aImg[1].src);
            doMove(oLoginlist,"left",-width,30,function(){
                oLoginlist.style.left='0px';
               aImg[0].src=aImg[1].src;
            })
        },3000);

     }
     //鼠标滚动事件：
     var photo=document.getElementById("photo");
     var aPsection=photo.getElementsByTagName("section");
     var contact=document.getElementById("contact");
     var aCsection=contact.getElementsByTagName("section");
     var fileManage=document.getElementById("fileManage");
     var aFsection=fileManage.getElementsByTagName("section");
    var note=document.getElementById("note");
    var aNsection=note.getElementsByTagName("section");
    var Memory=document.getElementById("Memory");
    var aMsection=Memory.getElementsByTagName("section");

     //console.log(aPsection);
     
     //滚动条滚动的距离：
     function scrollTop(){
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    window.onscroll=function(){

        if(isArea($("#photo .rightImg")[0])){
             //$("#photo .rightImg")[0].style.transform="scale(1) ";
            $("#photo .rightImg")[0].style.transform=" translateX(100px)rotateZ(360deg)";

        }
        if(isArea($("#contact .img")[0])){
             //$("#photo .rightImg")[0].style.transform="scale(1) ";
            $("#contact .img")[0].style.transform=" translateX(-100px)rotateZ(-360deg)";

        }
        if(isArea($("#fileManage .fileImg")[0])){
             //$("#photo .rightImg")[0].style.transform="scale(1) ";
            $("#fileManage .fileImg")[0].style.transform=" translateX(100px)rotateZ(360deg)";

        }
        if(isArea($("#note .img")[0])){
             //$("#photo .rightImg")[0].style.transform="scale(1) ";
            $("#note .img")[0].style.transform=" translateX(-100px)rotateZ(-360deg)";

        }
        if(isArea($("#Memory .MemoryImg")[0])){
             //$("#photo .rightImg")[0].style.transform="scale(1) ";
            $("#Memory .MemoryImg")[0].style.transform=" translateX(100px)rotateZ(360deg)";

        }


    }
    //渲染数据;
    var str="";
    var oWorkList=$("#workList")[0];
    //console.log(data);
    for(var i=0;i<data.length;i++ ){
      
        str+='<li class="work"><div class="workImg"><a href='+data[i].url+'><img src='+data[i].src+'></a></div><div class="workTxt"><a href='+data[i].url+'>'+data[i].title+'</a><p>'+data[i].intro+'</p></div></li>';
                       
                    
    }
    oWorkList.innerHTML=str;
    var  oHeadNav=$("#headNav");
    var  aHeadLi=oHeadNav.find("li");
    console.log(aHeadLi);
    console.log($("#myContent").children());
    $("#headNav .home").click(function(){
        var top=$("#myContent .listWrap")[0].offsetTop;
        console.log(top);//710
        $('#myContent').css({
            top:-top,
            
        });
    });

   for(var i=1;i<aHeadLi.length-1;i++){
        aHeadLi[i].index=i;
        aHeadLi[i].onclick=function(){
            var index=this.index;
            var top=$("#myContent").children().eq(index)[0].offsetTop;
            //offsetTop;
            console.log(top);//710
            $('#myContent').css({
                top:-(top-80),
                
            });

        }
   }
    

     
    
   
    





}
$(function(){
    //点击+展开;
    $("#newBtn .open").click(function(){
        
        $("#userInfo").css({
            height:367,
            opacity:1,
            visibility:"visible"
        })
        $(this).hide();
        $(this).next().show();



    })
    //点击“-”关闭
    $("#newBtn .close").click(function(){
       
        $("#userInfo").css({
            height:0,
            opacity:0,
            visibility:"hidden"
        })
        $(this).hide();
        $(this).prev().show();



    })
    //拖拽登录框;
    $(".loginNav").mousedown(function(ev){
        var disX=ev.pageX-$(this).offset().left;
        var disY=ev.pageY-$(this).offset().top;
        var _this=this;
        var maxX=$(window).width()-$(this).outerWidth();
        var maxY=$(window).height()-$(this).parent().outerHeight();
        $(document).mousemove(function(ev){
            var left=ev.pageX-disX;
            var top=ev.pageY-disY;

            if(left<0){
                left=0;
            }
            if(left>maxX){
                left=maxX;
            }
            if(top<0){
                top=0;
            }
             if(top>maxY){
                top=maxY;
            }

            $(_this).parent().css({
                left:left,
                top:top,
            });
            //return false;
            ev.preventDefault();

        })
        $(document).mouseup(function(ev){
           $(document).off("mouseup");
           $(document).off("mousemove");

        })





    })
    //验证qq:
    
    var testUser;
    var testPw=false;
    $(".username").focus(function(){
        
        $(this).parent().css({
            border:"1px solid rgb(48 ,145, 242)",
            boxShadow:"0 0 3px rgb(48, 145, 242)"
        })
    })
    $(".username").blur(function(){
        //当文本框失去焦点时判断：
        var value=$(this).val();
        $(this).parent().css({
            border:"1px solid #d7d7d7",
            boxShadow:"none"
        })
       // function fn(str){
       //          var re = /^[\w-]+@[\da-zA-Z]{2,5}(\.[a-z]{2,3}){1,3}$/g;

       //          return re.test(str);
       //  }
       function fn(str){
            var re = /^[1-9]\d{4,11}$/g;
             return re.test(str);
       }
       
         testUser=fn(value);
         //console.log(fn(value));
        if(!fn(value)){
            $(".errorTip").css({
                visibility:"visible",
                opacity:1
            });
            setTimeout(function(){
                $(".errorTip").css({
                    visibility:"hidden",
                    opacity:0
                });
            },3000);
        }


    })
    //判断密码;
    $(".Password").focus(function(){
        
        $(this).parent().css({
            border:"1px solid rgb(48 ,145, 242)",
            boxShadow:"0 0 3px rgb(48, 145, 242)"
        })
    })
    $(".Password").blur(function(){
        var pw=$(this).val();
        function fn2(str1){
           var re=/.[^ ]{6,16}/g;
           return re.test(str1);
       }
         $(this).parent().css({
            border:"1px solid #d7d7d7",
            boxShadow:"none"
        })
        if(fn2(pw)){
            testPw=true;
        }else{
            $(".pwErrorTip").css({
                opacity:1,
                visibility:"visible"
            })
            setTimeout(function(){
                $(".pwErrorTip").css({
                    visibility:"hidden",
                    opacity:0
                });
            },3000);
        }
    });
   
setCookie("headerImg","img/headerPortrait.jpg",1);
$("#submitBtn").click(function(ev){
    ev.stopPropagation();//阻止冒泡;
    console.log(getCookie("headerImg"));
    console.log(testUser&&testPw); 
   if((testUser&&testPw)){
        //$(".loginBtn").prop("disabled",false);
        
        $(this).attr("href","index.html");
        console.log($(this).attr("href"));
    }else{
       $(this).attr("href","javascript:;");
       console.log($(this).attr("href"));
    }
})



//头部鼠标移入;
 $("#headNav").delegate("li","mouseover",function(){
    console.log($(this).index());
    console.log($(this).width());
    var index=$(this).index();
    var width=$(this).width();
    $("#navmove").stop().animate({
        left:index*width,
    },300);




 })
 //头部点击,点击哪个就给它加上背景：
 //鼠标移开时，还回到原来位置：
 var Pos;//定义全局变量记录上次点击的位置；
 $("#headNav").delegate("li","click",function(){
    console.log($(this).index());
    console.log($(this).width());
    var index=$(this).index();
    Pos=index;
    var width=$(this).width();
    $("#navmove").stop().animate({
        left:index*width,
    },300);




 })
 $("#headNav").delegate("li","mouseout",function(){
    console.log($(this).index());
    console.log($(this).width());
    
    var width=$(this).width();
    $("#navmove").stop().animate({
        left:Pos*width,
    },300);




 })
 /*$("#headNav .home").click(function(){
    var top=$("#myContent .listWrap")[0].offsetTop;
    console.log(top);//710
    $('#myContent').css({
        top:-top,
        
    });



 });
 $("#headNav .downNav").click(function(){
    var top=$("#myContent .downloadWrap")[0].offsetTop;
    console.log(top);//710
    $('#myContent').css({
        top:-(top-80),
        
    });



 })
 $("#headNav .functionNav").click(function(){
    var top=$("#myContent .functionWrap")[0].offsetTop;
    console.log(top);
    $('#myContent').css({
        top:-(top-80),
        
    });



 })
 $("#headNav .vipNav").click(function(){
    var top=$("#myContent .vipWrap")[0].offsetTop;
    console.log(top);
    $('#myContent').css({
        top:-(top-80),
        
    });



 })
*/

    





})


