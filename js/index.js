$(function(){
   
    $("#filebox").mouseover(function(){
       
        
        $("#filelist").css({
            height:96, 
            opacity:1,
            visibility:"visible"

        })
       
    });
    $("#filebox").mouseout(function(){
        
        // $("#filelist").toggle("slow");
        $("#filelist").css({
            height:0,
            opacity:0,
            visibility:"hidden"
        })
    });
    $('#filelist li').mouseover(function(ev){
        //ev.stopPropagation();//阻止冒泡
        $("#filelist li").css("background","");
        $(this).css("background","#f3f8ff");

    });
    $('#menuRank').mouseover(function(){
        /*$(this).css({
            borderBottom:"none",
            paddingBottom:1,
            //zIndex:3
        })*/
        $("#rankList").css({
            opacity:1,
            height:93,
            visibility:"visible"
        });
    })
    $('#menuRank').mouseout(function(){
        //console.log(1);
        // $('#tileA').css({
        //     borderBottom:"1px solid #aeb3bc",
        //     paddingBottom:0,
        // });
        $("#rankList").css({
            opacity:0,
            height:0,
            visibility:"hidden"
        });
    })
    $("#labelbtn").click(function(){
       $(this).toggleClass("labelChecked");
    })
    //点击下载客户端;
    $("#header .download").click(function(){
        $('#mask').css("display","block");//遮罩层显示
        $("#downClient").fadeIn("slow");
    })
    //点击客户端的关闭按钮;
    $("#downClient .close").click(function(){
        $('#mask').css("display","none");//遮罩层显示
        $("#downClient").fadeOut("slow");
    })
    //点击input文本框;
    $(".search .searchText").focus(function(){
        $(".search").css({
            border:"1px solid #3091f2",
            boxShadow:"0px 0px 3px #3091f2"
        })
    })
    //文本框失去焦点时
    $(".search .searchText").blur(function(){
        $(".search").css({
            border:"1px solid #c2c3ca",
            boxShadow:"none"
        })
    })
//获取cookie

$(".headPortrait").find("img").attr("src",getCookie("headerImg"));
 var str="";
    var onoff=false;
    //新建文件夹;
    function newFile(){
        $("#cataContent .fileTotal").prepend("<div class='fileItem'><div class='filecon'><span></span></div><div class='filename'><input type='text'value='新建文件夹'/><em class='success'></em><em class='fail'></em></div><div class='filename1'><input class='name'type='text' value=''/></div></div>");
        
    }
   
$("#mainContent .newA").click(function(){
        //$(this).attr("new",true);
    //console.log($("#fileT .fileItem").eq(0).attr("finished"))
       //console.log(onoff);
        $("#fileT .fileItem").each(function(index,item){
            //console.log($(item).length);
            console.log($("#fileT .fileItem").length);
            console.log($(item).attr("finished")=='false');
             if($(item).attr("finished")=='false'){
                    onoff=true;//只要有一个为false;
                    return false;//后面的就不用在判断了;
                }else{
                    onoff=false;
                }
        });
        console.log(onoff);
       if(!onoff){
            newFile();
         $("#fileT .fileItem").eq(0).attr("finished","false");
         onoff=true;

         
        }else{
                    $("#warnTip").css({
                        height:40,
                        opacity:1,
                        top:0,
                        display:"block"
                    });
                    setTimeout(function(){
                        $("#warnTip").css({
                            height:0,
                            opacity:0,
                            top:-41,
                            display:"none"
                        })
                         
                    },2000);
        }
    })
    //运用事件代理
   //点击ok按钮执行操作；
   //新建文件夹时，名字不重复，但需要点两次;
   var arr=[];
$(".fileTotal").delegate(".success","click",function(ev){
        console.log(ev.target);
        //console.log(123);//如果文件名重复了,点击第二次不执行;
        ev.stopPropagation();
        var parentFather=$(this).parent().parent();
        var index=$(".fileTotal .fileItem").index(parentFather);
        console.log(index);
        //parentFather.find("span").removeClass('checkedBtn');
        var _this=this;
        var text=$(this).parent().find("input").val();
        var oldname1=parentFather.find("input:last").val();
        console.log(text);
        //当前这个文件夹的input的value值;
        //如果全选了,但又新建了文件夹;
        if($("#labelbtn").hasClass("labelbtn")){
            $("#labelbtn").removeClass("labelChecked");
            n=0;
            $(".path .checked").find("span").html(n);
            $('#fileT span').each(function(index,item){
                $(item).css("visibility","hidden");
                $(item).removeClass("checkedBtn");
                $(item).parent().parent().css({
                    border:"1px solid #fff",
                    background:"#fff"
                })

            });


        }
        
        if(text==""){
                    $("#emptyTip").css({
                        height:40,
                        opacity:1,
                        top:0,
                        display:"block"
                    });
                    setTimeout(function(){
                        $("#emptyTip").css({
                            height:0,
                            opacity:0,
                            top:-41,
                            display:"none"
                        })
                         
                    },2000);
            return false;
        }else{
            console.log(arr);
            for(var i=0;i<arr.length;i++){
                //如果文件名重名了
                console.log(text==arr[i]);
                if(text==arr[i]){
                    $("#repeatTip").css({
                        height:40,
                        opacity:1,
                        top:0,
                        display:"block"
                    });
                    setTimeout(function(){
                        $("#repeatTip").css({
                            height:0,
                            opacity:0,
                            top:-41,
                            display:"none"
                        })
                         
                    },2000);
                    return false;
                }

            }
            arr.unshift(text);
            //向数组的最前面添加一个或多个
            
           
            console.log(arr);
            //console.log($(this));
            
             /*n--;
             //重命名成功后，n--;
             if(n<0){
                n=0;
             }*/
             console.log(onoff);
           $(".path .checked").find("span").html(n);
           //新建文件成功;
          
        parentFather.attr("finished","true");

        parentFather.css({
                    border:"1px solid #fff",
                    background:"#fff"
        })
        $(this).parent().next().find("input").val(text);
        $(this).parent().next().find("input").prop("disabled",true);
        $(this).parent().css("display","none");
       $(this).parent().next().css("display","block");
       $(this).parent().prev().find("span").removeClass("checkedBtn");
      
                
                                $("#successTip").css({
                                        height:40,
                                        opacity:1,
                                        top:0,
                                        display:"block"
                                    });
                                    $("#successTip span").css({
                                       opacity:1,
                                        display:"block"
                                    }); 
                                    setTimeout(function(){
                                        $("#successTip").css({
                                            height:0,
                                            opacity:0,
                                            top:-41,
                                            display:"none"
                                        })
                                         $("#successTip span").css({
                                            opacity:0,
                                            display:"none"
                                         })  
                                    },2000);
                       
           
                    
        }
     
});
var n=0;
//点击取消按钮;
$(".fileTotal").delegate(".fail","click",function(ev){
        var parent=$(this).parent().parent();
        var oldname=parent.find("input:last").val();
        console.log(oldname);
        if(parent.find("span").hasClass("checkedBtn")){
            //如果选中了
            parent.css({
                border:"1px solid #fff",
                background:"#fff"
            })
            n--;
            if(n<0){
                n=0;
            }
            if(n!=$(".fileTotal .fileItem").length){
                $("#labelbtn").removeClass("labelChecked");
            }
            $(".path .checked").find("span").html(n);
            $(this).parent().find("input").val(oldname);
            arr.unshift(oldname);
           // console.log(arr);
            parent.find("span").removeClass("checkedBtn");
            //如果点击了重命名,但又点击了fail,则还原初始状态;
            parent.find(".filename").css("display","none");
            parent.find(".filename1").css("display","block");
        }else{
             //如果没有选中,把这个文件夹删除；
            $(this).parent().parent().remove();
            onoff=false;
        }
     
});

$(".fileTotal ").delegate("span","click",function(ev){
       
        //记录选中文件的个数;
        var len=$(".fileTotal span").length;
        ev.stopPropagation();//阻止冒泡;
        if($(this).parent().parent().attr("finished")==="true"){
           
             $(this).toggleClass("checkedBtn");
            if($(this).hasClass("checkedBtn")){
                
                n++;
                if(n==len){
                    $('#labelbtn').addClass('labelChecked');
                }
            }else{
                n--;
                $("#labelbtn").removeClass("labelChecked");
                if(n<=0){
                    n=0;
                    
                }
            }
            
        }else{
                    $("#warnTip").css({
                        height:40,
                        opacity:1,
                        top:0,
                        display:"block"
                    });
                    setTimeout(function(){
                        $("#warnTip").css({
                            height:0,
                            opacity:0,
                            top:-41,
                            display:"none"
                        })
                         
                    },2000);
        }
      //console.log($(this).hasClass("checkedBtn"));
      //console.log(n);
      $(".path .checked").find("span").html(n);
   
})

 
//鼠标移入事件;
$(".fileTotal").delegate(".fileItem","mouseenter",function(){
        
       $(this).css({
            background:"#f3f9fe",
            border:"1px solid #c3d8f0"
        })
        $(this).find("span").css("visibility","visible");
})
//鼠标移开事件;
$(".fileTotal").delegate(".fileItem","mouseleave",function(ev){
       ev.stopPropagation();//阻止冒泡：
        var _this=$(this);
        if($(this).find("span").hasClass("checkedBtn")){

            $(this).css({
                background:"#f3f9fe",
                border:"1px solid #c3d8f0"
            })
            $(this).find("span").css("visibility","visible");
       }else{
             $(this).css({
                background:"#fff",
                border:"1px solid #fff"
            })
             $(this).find("span").css("visibility","hidden");
        }

        
})
   
$("#mainContent .delA").click(function(ev){
        //删除;
        var a=false;
        ev.stopPropagation();
        $(".fileTotal span").each(function(index,item){
           if($(item).hasClass("checkedBtn")){
                a=true;//只要有一个为true,a就是true;
                $('#mask').show();
                $('#delWarn').show();
                var oDelwarn=$("#delWarn")[0];
                shake(oDelwarn,"top",15);
               }

        })
        console.log(a);
         if(!a){
             //警告框显示：
                console.log(22344);
                 $("#warnDialog").css({
                    height:40,
                    opacity:1,
                    top:0,
                    display:"block"
                });
                $("#warnDialog span").css({
                   opacity:1,
                    display:"block"
                 })  
               setTimeout(function(){
                  $("#warnDialog").css({
                    height:0,
                    opacity:0,
                    top:-41,
                    display:"none"
                 })
                 $("#warnDialog span").css({
                    opacity:0,
                    display:"none"
                 })  
               },2000);



        }
       
});
//点击确定删除文件;
$("#delWarn .ok").click(function(ev){
        //console.log(4567);
          ev.stopPropagation();//阻止冒泡;
          $(".fileTotal span").each(function(index,item){
            console.log($(item));
            console.log($(item).hasClass("checkedBtn"));
                if($(item).hasClass("checkedBtn")){
                     console.log($(".fileTotal .checkedBtn").length);
                
                 var len=$(".fileTotal .checkedBtn").length;
                 $(item).parent().parent().remove();
                                    $("#DelsuccessTip").css({
                                        height:40,
                                        opacity:1,
                                        top:0,
                                        display:"block"
                                    });
                                    
                                    setTimeout(function(){
                                        $("#DelsuccessTip").css({
                                            height:0,
                                            opacity:0,
                                            top:-41,
                                            display:"none"
                                        })
                                        
                                    },2000);
                 n--;
                 console.log(n);
                 $("#labelbtn").removeClass("labelChecked");
                    if(n<=0){
                         n=0;
                        
                    }
                    console.log(index);
                    arr.splice(index,len);
                  console.log(arr);

                }
                


          })
          if($("#fileT  .fileItem").length==0){
            //如果文件全部被删除了,onoff变成false;
                        onoff=false;
                        arr=[];
                        
            }
            console.log(arr);
          
         
        
        $(".path .checked").find("span").html(n);
             $('#mask').hide();
            $('#delWarn').hide();
            
})
//点击取消删除按钮;
$("#delWarn .cancel").click(function(ev){
             ev.stopPropagation();//阻止冒泡;
             //$(item).parent().parent().remove();
               $('#mask').hide();
             $('#delWarn').hide();
})

//重命名;  
$("#mainContent .resetA").click(function(ev){
        //重命名
        ev.stopPropagation();
         var b=false;
         $(".filename1 input").prop({
            disabled:true,
        })

        $(".fileTotal span").each(function(index,item){
          if($(item).hasClass("checkedBtn")){
                b=true;
            
            var divP=$(item).parent();
            var input=$(item).parent().parent().find("input").eq(0);//第0个input;
            var input1=$(item).parent().parent().find("input").eq(1);//第一个inupt;
            var oldname=input1.val();
               input.prop({
                  disabled:false
               })
            divP.next().css("display",'block');
            divP.next().next().css("display",'none');
            //重命名成功了,就把原来的值删除;
            arr.splice(index,1);
            console.log(arr);
                n--;
                if(n<=0){
                    n=0;
                    $("#labelbtn").removeClass("labelChecked");
                }
           
            }

        })
       // console.log(b);
        //没有选中文件，警告提示：
        if(!b){
                $("#warnDialog").css({
                    height:40,
                    opacity:1,
                    top:0,
                    display:"block"
                });
                $("#warnDialog span").css({
                   opacity:1,
                    display:"block"
                 })  
               setTimeout(function(){
                  $("#warnDialog").css({
                    height:0,
                    opacity:0,
                    top:-41,
                    display:"none"
                 })
                 $("#warnDialog span").css({
                    opacity:0,
                    display:"none"
                 })  
               },2000);
        }
        

})
//拖动警告提示框;
 $("#delWarn .title").bind("mousedown",function(ev){
            // console.log(this);
            console.log(ev.pageX,$("#delWarn").offset().left);
            var disX=ev.pageX-$("#delWarn").offset().left;
            var disY=ev.pageY-$("#delWarn").offset().top;
            $(document).bind("mousemove",function(ev){
                var leftX=ev.pageX-disX;
                var topY=ev.pageY-disY;
                var maxX=$(window).width()-$("#delWarn").outerWidth(true);//包括margin;
                var maxY=$(window).height()-$("#delWarn").outerHeight();
                //限制范围;
                if(leftX<=200){
                    leftX=200;
                }
                if(leftX>maxX){
                    leftX=maxX;
                }
                if(topY<=0){
                    topY=0;
                }
                if(topY>maxY){
                    topY=maxY;
                }

                $("#delWarn").css({
                    left:leftX,
                    top:topY
                });
            })
            $(document).bind("mouseup",function(){
                $(document).unbind("mouseup mousemove");
            })
            return false;//阻止冒泡;
                    

})

//点击全选;
$("#labelbtn").click(function(){
        //获取所有fileItem;
       var _this=this;
        $("#fileT .fileItem").each(function(index,item){
            //如果点击了(身上有class)
            if($(_this).hasClass("labelChecked")){
                //n=$("#fileT .fileItem").length;
                if($(item).attr('finished')=="true"){
                    n++;
                    $(item).css({
                        background:"#f3f9fe",
                        border:"1px solid #c3d8f0"
                    })
                    $(item).find("span").addClass("checkedBtn");
                    $(item).find("span").css("visibility","visible");
                }/*else{
                    alert("您还没有完成操作");
                    $(_this).removeClass("labelChecked");
                   

                }*/
            }else{
                $(item).css({
                        background:"#fff",
                        border:"1px solid #fff"
                })
                $(item).find("span").removeClass("checkedBtn");
                $(item).find("span").css("visibility","hidden");
                 n=0;
                 //$("#labelbtn").removeClass("labelChecked");
            }
         })
        $(".path .checked").find("span").html(n);
})

//画方块碰撞检测：
$(document).mousedown(function(ev){
           //画方块;
    ev.stopPropagation();//阻止冒泡：
    console.log(12343556);
    console.log(ev.target);
    console.log(ev.target.className=="cataTree");
if(ev.target.className=="cataTree"){
            var x=ev.clientX;//获取按下时鼠标位置
            var y=ev.clientY;
            var oDiv=document.createElement('div');
            $(".cataTree").append($(oDiv));
            $(oDiv).addClass('drawDiv');
            var oFileT=document.getElementById("fileT");
            var aFileItem=oFileT.getElementsByClassName("fileItem");
            var lenTotal=aFileItem.length;
            var checkedlen=$(".fileTotal .checkedBtn").length;
            //给每个元素添加属性touched为false
            $(".fileTotal .fileItem").attr("touched","false");

            $(document).mousemove(function(ev){
                var e=ev||event;
                var left=e.clientX-x>0?x-172:e.clientX-172;
                var top=e.clientY-y>0?y-145:e.clientY-145;
                //console.log(ev.clientX,ev.clientY);
                $(oDiv).css({
                    width:Math.abs(e.clientX-x),
                    height:Math.abs(e.clientY-y),
                    left:left,
                    top:top,
                    zIndex:11
                   
                });
            //在鼠标移动过程中进行检测碰撞;
             var arrTouch=[];
           
                for(var i=0;i<aFileItem.length;i++){
                    if(testPengzhuang(oDiv,aFileItem[i])){
                        // console.log(i);
                        // console.log(aFileItem[i].index);
                        arrTouch.push(aFileItem[i]);
                        //console.log(arrTouch);
                        aFileItem[i].style.background="#f3f9fe";
                        aFileItem[i].style.border='1px solid #c3d8f0';
                     var span=aFileItem[i].getElementsByTagName("span")[0];
                        
                     $(span).addClass("checkedBtn");
                     span.style.visibility="visible";
                     $(aFileItem[i]).attr("touched","true");
                      $(".path .checked").find("span").html(arrTouch.length);
                       
                        }else{
                          if($(aFileItem[i]).attr("touched") !=="false"){
                             aFileItem[i].style.background="#fff";
                             aFileItem[i].style.border='1px solid #fff';
                            var span=aFileItem[i].getElementsByTagName("span")[0];
                            span.style.visibility="hidden";  
                             $(span).removeClass("checkedBtn");
                                n--;
                                if(n<0) n=0;
                                
                                $(".path .checked").find("span").html(n);
                                console.log(lenTotal);
                                console.log(n);
                               
                                
                           }
                           // console.log(checkedlen==lenTotal);
                           
                           
                          
                           


                    }
                    //$(".path .checked").find("span").html(arrTouch.length);
                   // console.log(arrTouch);
                    if(arrTouch.length==lenTotal){
                        $("#labelbtn").addClass("labelChecked");
                    }else{
                        $("#labelbtn").removeClass("labelChecked");
                    }
                    if(checkedlen==lenTotal){
                                $("#labelbtn").addClass("labelChecked"); 
                    }

                }
    






               
            }) 
            $(document).mouseup(function(){
                $(document).off('mousemove');
                $(document).off('mouseup');
                $(oDiv).remove();
                 for(var i=0;i<aFileItem.length;i++){
                    $(aFileItem[i]).attr("touched","false");
                 }
                

           })

}
           
            
            
           
})













});
