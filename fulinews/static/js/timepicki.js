(function ( $ ) {

    $.fn.timepicki = function(options) {
        
        var defaults = {
            
        };
        
        var settings = $.extend( {}, defaults, options );
        
        return this.each( function() {
            
            var ele = $(this);
            var ele_hei = ele.outerHeight();
            var ele_lef = 220;
            ele_hei +=10;
            $(ele).wrap("<div class='time_pick'>");
            var ele_par = $(this).parents(".time_pick");
            ele_par.append("<div class='timepicker_wrap'><div class='arrow_top'></div><div class='time'><div class='prevst'></div><div class='ti_tx'></div><div class='nextst'></div></div><div class='mins'><div class='prevst'></div><div class='mi_tx'></div><div class='nextst'></div></div><div class='meridian'><div class='prevst'></div><div class='mer_tx'></div><div class='nextst'></div></div></div>");
            var ele_next = $(this).next(".timepicker_wrap");
            var ele_next_all_child = ele_next.find("div");
            ele_next.css({ "top": ele_hei+"px", "left": ele_lef+"px"});
            $(document).on( "click",function(event) {
                if(!$(event.target).is(ele_next))
                    {
                        if(!$(event.target).is(ele))
                            {
                                var tim = ele_next.find(".ti_tx").html();
                                var mini = ele_next.find(".mi_tx").text();
                                var meri = ele_next.find(".mer_tx").text();
                                if(tim.length !=0 && mini.length !=0 && meri.length !=0 )
                                {
                                    ele.val(tim+":"+mini+":"+meri);
                                }
                                if(!$(event.target).is(ele_next)&&!$(event.target).is(ele_next_all_child))
                                {
                                   ele_next.fadeOut(); 
                                }
                            }
                            else{
                                set_date();
                                ele_next.fadeIn();  
                            }
                    }
            });
            function set_date()
            {
                var d = new Date();
                var ti = d.getHours();
                var mi = "00";
                var mer = "00";
                if(ti<10)
                    {
                        ele_next.find(".ti_tx").text("0"+ti);
                    }
                    else{
                        ele_next.find(".ti_tx").text(ti);
                    }
                    ele_next.find(".mi_tx").text(mi);
                    ele_next.find(".mer_tx").text(mer);
            }
                
                
                var cur_next = ele_next.find(".nextst");
                var cur_prev = ele_next.find(".prevst");
                
                
            $(cur_prev).add(cur_next).on("click", function () {
                //console.log("click");
                var cur_ele = $(this);
                var cur_cli = null;
                var ele_st = 0;
                var ele_en = 0;
                if (cur_ele.parent().attr("class") == "time") {
                    //alert("time");
                    cur_cli = "time";
                    ele_en = 24;
                    var cur_time = null;
                    cur_time = ele_next.find("." + cur_cli + " .ti_tx").text();
                    cur_time = parseInt(cur_time);
                    //console.log(ele_next.find("." + cur_cli + " .ti_tx"));
                    if (cur_ele.attr("class") == "nextst") {
                        //alert("nex");
                        if (cur_time == 23) {
                            ele_next.find("." + cur_cli + " .ti_tx").text("00");
                        } 
                        else {
                            cur_time++;

                            if(cur_time<10)
                            {
                            ele_next.find("." + cur_cli + " .ti_tx").text("0"+cur_time);
                            }
                            else{
                            ele_next.find("." + cur_cli + " .ti_tx").text(cur_time);
                            }
                        }

                    } 
                    else {
                        if (cur_time == 0) {
                            ele_next.find("." + cur_cli + " .ti_tx").text(23);
                        } 
                        else {
                            cur_time--;
                            if(cur_time<10)
                            {
                            ele_next.find("." + cur_cli + " .ti_tx").text("0"+cur_time);
                            }
                            else{
                            ele_next.find("." + cur_cli + " .ti_tx").text(cur_time);
                            }
                        }
                    }

                } 
               else if (cur_ele.parent().attr("class") == "mins") {
                    //alert("mins");
                    cur_cli = "mins";
                    ele_en = 59;
                    var cur_mins = null;
                    cur_mins = ele_next.find("." + cur_cli + " .mi_tx").text();
                    cur_mins = parseInt(cur_mins);
                    if (cur_ele.attr("class") == "nextst") {
                        //alert("nex");
                        if (cur_mins == 59) {
                            ele_next.find("." + cur_cli + " .mi_tx").text("00");
                        } else {
                            cur_mins++;
                            if(cur_mins<10)
                            {
                            ele_next.find("." + cur_cli + " .mi_tx").text("0"+cur_mins);
                            }
                            else{
                            ele_next.find("." + cur_cli + " .mi_tx").text(cur_mins);
                            }
                        }
                    } 
                    else {
           
                        if (cur_mins == 0) {
                           ele_next.find("." + cur_cli + " .mi_tx").text(59);
                        }
                       else {
                           cur_mins--;

                           if(cur_mins<10)
                           {
                           ele_next.find("." + cur_cli + " .mi_tx").text("0"+cur_mins);
                           }
                           else{
                           ele_next.find("." + cur_cli + " .mi_tx").text(cur_mins);
                           }

                       }

                   }
                } 
                else {
                    //alert("merdian");
                    ele_en = 1;
                    cur_cli = "meridian";
                    var cur_mer = null;
                    cur_mer = ele_next.find("."+cur_cli+" .mer_tx").text();
                    if (cur_ele.attr("class") == "nextst") {
                          ele_next.find("."+cur_cli+" .mer_tx").text("00");
                    } else {
                          ele_next.find("."+cur_cli+" .mer_tx").text("00");
                    }
                }


            });
            
        });
    };
 
}( jQuery ));

