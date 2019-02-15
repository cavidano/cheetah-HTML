jQuery(document).ready(function ($) {

    ////////////////////////////////////////
    // Primary Navigation Dropdowns
    ////////////////////////////////////////

    var header_drop_downs = $('#primary-navigation-desktop ul > li');

    function sub_nav_hover_on() {
        if ($(this).find('ul.sub').length) {
            $(this).addClass('active');
            $(this).find('ul.sub').addClass('active');
        } else {
            return;
        }
    }

    function sub_nav_hover_off() {
        if ($(this).find('ul.sub').length) {
            $(this).removeClass('active');
            $(this).find('ul.sub').removeClass('active');
        } else {
            return;
        }
    }

    header_drop_downs.hoverIntent({
        over: sub_nav_hover_on,
        out: sub_nav_hover_off,
        timeout: 300
    });

    ////////////////////////////////////////
    // Lightbox
    ////////////////////////////////////////
    
    $('[data-toggle="lightbox"]').on('click', function(event) {
        
        event.preventDefault();
        
        var data_title = $(this).data('title');

        function update_modal() {

            var target =  $('.ekko-lightbox');
            var close_button = target.find('button[data-dismiss="modal"]');
            var modal_header = target.find('.modal-header h4');

            target.removeClass('fade in');
            close_button.removeClass('close').addClass('ml-auto no-btn-style');
            close_button.html('<span class="fas fa-times fa-lg"></span>');

            if (data_title) {
                return;
            } else {
                modal_header.remove();
            }
        }
        
        $(this).ekkoLightbox({
            alwaysShowClose: true,
            onShow: function() {
                update_modal(data_title);
            } 
        });
    });

    ////////////////////////////////////////
    // Mutation observer - watch for RTL
    ////////////////////////////////////////

    var target = document.querySelector('html');

    var observer = new MutationObserver( function(mutations) {
        mutations.forEach( function() {
            var classes = target.getAttribute('class');
            var single_class = 'translated-rtl';
            if (classes.includes(single_class)) {
                target.setAttribute('dir', 'rtl');
            } else {
                target.setAttribute('dir', 'ltr');
            }
        });
    });

    var config = {
        attributes: true,
        attributeFilter: ['class']
    };

    observer.observe(target, config);


    ////////////////////////////////////////
    // Sharer
    ////////////////////////////////////////
    
    window.fbAsyncInit = function() {
        FB.init({
          appId      : 'YOUR-APP-ID',
          xfbml      : true,
          version    : 'v2.8'
        });
        FB.AppEvents.logPageView();
      };
  
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
  
    var sharect = new Sharect();

    sharect.config({
        facebook: true,
        twitter: true,
        twitterUsername: '@estevanmaito',
        backgroundColor: '#212528',
        iconColor: '#fff'
    }).init();

    ////////////////////////////////////////
    // News filter selects
    ////////////////////////////////////////

    $('.filter').change(function() {

        var categoryID = $('#topics').find(':selected').data('category-id'),
            year = $('#years').find(':selected').data('year'),
            yearCategoryID = $('#years').data('category-id'),
            authorID = $('#authors').find(':selected').data('author-id'),
            allCategoryIDs = [];

        $('#topics option').each(function(){
            id = $(this).data('category-id');
            if (id) {
                allCategoryIDs.push(id);
            }
        });

        if (yearCategoryID) {
            allCategoryIDs.push(yearCategoryID);            
        }

        allCategoryIDs.join(',');

        url = '/wp-json/wp/v2/posts/?_embed&categories=' + allCategoryIDs;

        if (categoryID) {
            url = '/wp-json/wp/v2/posts/?_embed&categories=' + categoryID;
        }
        if (year) {
            url = '/wp-json/wp/v2/posts/?_embed&after=' + year +'-01-01T00:00:00Z&before=' + year + '-12-31T23:59:59Z&categories=' + yearCategoryID;
        }
        if (authorID) {
            url = url + '&author=' + authorID;
        }

        $.ajax({
            type: 'GET',
            url: url,
            success: function(data){
                $('.posts').fadeOut('fast',function(){

                    $('.posts').html('');

                    if (!$.isEmptyObject(data)) {
                        $(data).each(function(){
                            title = this.title.rendered;
                            link = this.link;
                            excerpt = this.excerpt.rendered;
                            image = '';
                            alt = '';
                            // if (excerpt.length > 96) {
                            //     excerpt = $.trim(excerpt).substring(0, 96) + "...";
                            // }
                            if (this._embedded['wp:featuredmedia']) {
                                image = this._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;                                
                                alt = this._embedded['wp:featuredmedia'][0].alt_text;
                            }
                            category = this._embedded['wp:term'][0][0].name;
                            string = '<div class="row align-items-center mb-3"><div class="col-lg-6 mb-3 mb-lg-0"><a href="' + link + '" title="' + title + '"><img class="w-100" src="'+ image +'" alt="'+ alt +'"></a></div><!-- .col --><div class="col-lg-6"><p class="f-sans-serif fs-md fs-muted mb-0"><span><em>'+ category +'</em></span></p><h2 class="h4">' + title + '</h2><p class="mb-0">' + excerpt + '</p><a class="link fs-md text-body" href="' + link + '" title="' + title + '">Full Article</a></div><!-- .col --></div>';
                            $('.posts').append(string);
                        });
                    }
                    
                    else {
                        string = '<div class="row align-items-center mb-3"><div class="col-lg-12 mb-3 mb-lg-0">Sorry, there are no news items that match your criteria.<!-- .col --></div></div>';
                        $('.posts').append(string);
                    }
                });

                $('.posts').fadeIn('fast');
            }
        });
    });

}); // end document ready