$(function() {
  $.scrollify({
		section:".panel",
    scrollbars:false,
    before: function(i,panels) {
      var ref = panels[i].attr("data-section-name");

      $(".pagination a.active").removeClass("active");

      $(".pagination a[href=#" + ref + "]").addClass("active");

      /*
      if(ref==="features") {
        $(".features .gallery0,.features .gallery1,.features .gallery2").addClass("moved");

      }*/

      panels[i].find(".gallery0,.gallery1,.gallery2").addClass("moved");


      if(ref==="design") {
        $(".features").find(".gallery0,.gallery1,.gallery2").removeClass("moved");
        $(".ios7 .gallery0").css("top",0);
      }
      if(ref==="features") {
        $(".ios7 .content").removeClass("moved");
        initialPosition();
      }
      if(ref==="ios7") {
        $(".ios7 .content").addClass("moved");

        $(".ios7 .gallery0").css("top",0);
      }
    },
    after:function(i,panels) {
      var ref = panels[i].attr("data-section-name");

      if(ref==="home") {
        $(".design").find(".gallery0,.gallery1,.gallery2").removeClass("moved");
      }
      for(var j = 0;j < panels.length;j++) {
        if(j>i) {

          //panels[j].find(".moved").removeClass("moved");
        }
      }
    },
    afterResize:initialPosition,
    afterRender:initialPosition
	});

  $(".pagination a").on("click",function() {
    $.scrollify.move($(this).attr("href"));
  });

  function initialPosition() {

    var current = $.scrollify.current();

    if(current.hasClass("ios7")===false) {
      var height = parseInt($(".ios7").height());
      var f = parseInt($(".features .gallery1").height()) - 50;

      var top = 0 - (height*0.4) - (height-f);
      $(".ios7 .gallery0").css("top",top);
    } else {
      $(".features").find(".gallery0,.gallery1,.gallery2").addClass("moved");
    }

  }
});
