var $ = jQuery;

$(document).ready(function(){

  $("body").on('click' , ".topmenu a , .footer_nav a" ,function(){
    var linkTo = $(this).attr('href');
    $('body').scrollTo(linkTo,800,{offset:-135});
    return false
  });

  // style Select, Radio, Checkbox
    if ($("select").hasClass("select_styled")) {
        var deviceAgent = navigator.userAgent.toLowerCase();
        var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
        if (agentID) {
            cuSel({changedEl: ".select_styled", visRows: 10, scrollArrows: true});   // Add arrows Up/Down for iPad/iPhone
        } else {
            cuSel({changedEl: ".select_styled", visRows: 10});
        }
    }
    if ($("div,p").hasClass("input_styled")) {
        $(".input_styled input").customInput();
    }

/*work carouse*/
    function animateSlide() {
        $("#myWork").find(".item").find('*[data-animate]').each(function () {
            var $this = $(this);
            var animateClass = $this.data('animate');
            $this.removeClass("animate " + animateClass);
            setTimeout(function () {
                $this.addClass("animate " + animateClass);
            }, 1);
        });
    }

    animateSlide();

    $("#myWork").on('slide.bs.carousel', function () {
        animateSlide();
    });

  // buttons
    $(".button, .post-share a, .btn-submit , .btn").hover(function () {
        $(this).stop().animate({"opacity": 0.80});
    }, function () {
        $(this).stop().animate({"opacity": 1});
    });

    $("section:first").addClass("first");

    // READ MORE
    $('.post-category').carousel({
      interval: 0
    });

    $(".post-item").each(function () {
        var $this = $(this);
        $this.find(".post-inner").css({
            'height': 260,
            'overflow': 'hidden'
        });

        $this.on('click', '.read-more', function () {
            $this.find(".post-inner").css({
                    'height':'auto'
                });
            $this.find(".meta-bot").hide();
        });

    });
        
        $("#title-post").text($(".post-category.active").find(".post-item.active .post-title").text());

        $(document).on('slid.bs.carousel', function () {
            $("#title-post").fadeOut(10, function () {
                $(this).text($(".post-category.active").find(".post-item.active .post-title").text()).fadeIn(500);
            })
        });


    // Category select

    $(".post-category").each(function(index){
        var $this = $(this);
        $this.attr("id","post-category-"+(index+1));
        $this.append( '<a class="left carousel-control" href="#post-category-'+(index+1)+'" data-slide="prev"><span class="icon-prev"></span></a><a class="right carousel-control" href="#post-category-'+(index+1)+'" data-slide="next"><span class="icon-next"></span></a>' );        
    });

    var active_category = $(".post-category.active").data("index");
    $(".widget-category li[data-index="+active_category+"]").addClass("active");

    var activeReady = true;
    $('.widget-category').on('click', '.category-item:not(.active)', function() {



        if (!activeReady) {
            return;
        }
        activeReady = false;
        var $this = $(this);

        $('.category-item.active').removeClass('active');
        $this.addClass('active');
        $('.post-category.active').fadeOut(300, function() {
            $(this).removeClass('active');
            
            $('.post-category[data-index="' + $this.data('index') + '"]')
                    .addClass('active')
                    .fadeIn(500, function() {
                        
                        activeReady = true;
                    });
        });

        $("#title-post").fadeOut(10, function () {
                $(this).text($(".post-category.active").find(".post-item.active .post-title").text()).fadeIn(500);
            })
    });
});