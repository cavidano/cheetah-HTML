jQuery(document).ready(function(l){var t;function e(){l(this).find("ul.sub").length&&(l(this).addClass("active"),l(this).find("ul.sub").addClass("active"))}function s(){l(this).find("ul.sub").length&&(l(this).removeClass("active"),l(this).find("ul.sub").removeClass("active"))}l("#primary-navigation-desktop ul > li").hoverIntent({over:e,out:s,timeout:300}),l('[data-toggle="lightbox"]').on("click",function(t){t.preventDefault();var a=l(this).data("title");function e(){var t=l(".ekko-lightbox"),e=t.find('button[data-dismiss="modal"]'),s=t.find(".modal-header h4");t.removeClass("fade in"),e.removeClass("close").addClass("ml-auto no-btn-style"),e.html('<span class="fas fa-times fa-lg"></span>'),a||s.remove()}l(this).ekkoLightbox({alwaysShowClose:!0,onShow:function(){e(a)}})});var a=document.querySelector("html"),i,r={attributes:!0,attributeFilter:["class"]};new MutationObserver(function(t){t.forEach(function(){var t,e="translated-rtl";a.getAttribute("class").includes(e)?a.setAttribute("dir","rtl"):a.setAttribute("dir","ltr")})}).observe(a,r),l(".filter").change(function(){var t=l("#topics").find(":selected").data("category-id"),e=l("#years").find(":selected").data("year"),s=l("#years").data("category-id"),a=l("#authors").find(":selected").data("author-id"),i=[];l("#topics option").each(function(){id=l(this).data("category-id"),id&&i.push(id)}),s&&i.push(s),i.join(","),url="/wp-json/wp/v2/posts/?_embed&categories="+i,t&&(url="/wp-json/wp/v2/posts/?_embed&categories="+t),e&&(url="/wp-json/wp/v2/posts/?_embed&after="+e+"-01-01T00:00:00Z&before="+e+"-12-31T23:59:59Z&categories="+s),a&&(url=url+"&author="+a),l.ajax({type:"GET",url:url,success:function(t){l(".posts").fadeOut("fast",function(){l(".posts").html(""),l.isEmptyObject(t)?(string='<div class="row align-items-center mb-3"><div class="col-lg-12 mb-3 mb-lg-0">Sorry, there are no news items that match your criteria.\x3c!-- .col --\x3e</div></div>',l(".posts").append(string)):l(t).each(function(){title=this.title.rendered,link=this.link,excerpt=this.excerpt.rendered,image="",alt="",this._embedded["wp:featuredmedia"]&&(image=this._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url,alt=this._embedded["wp:featuredmedia"][0].alt_text),category=this._embedded["wp:term"][0][0].name,string='<div class="row align-items-center mb-3"><div class="col-lg-6 mb-3 mb-lg-0"><a href="'+link+'" title="'+title+'"><img class="w-100" src="'+image+'" alt="'+alt+'"></a></div>\x3c!-- .col --\x3e<div class="col-lg-6"><p class="f-sans-serif fs-md fs-muted mb-0"><span><em>'+category+'</em></span></p><h2 class="h4">'+title+'</h2><p class="mb-0">'+excerpt+'</p><a class="link fs-md text-body" href="'+link+'" title="'+title+'">Full Article</a></div>\x3c!-- .col --\x3e</div>',l(".posts").append(string)})}),l(".posts").fadeIn("fast")}})})});