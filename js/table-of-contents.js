var sections = $('.table-of-contents-item'),
    nav = $('.table-of-contents'),
    offset = 2;

$(window).on('scroll', function () {

    var cur_pos = $(this).scrollTop();

    sections.each(function () {
        var top = $(this).offset().top - offset,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('.page_item').removeClass('current_page_item');
            nav.find('a[href="#' + $(this).attr('id') + '"]').closest('li').addClass('current_page_item');
        }
    });

});