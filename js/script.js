$(document).ready(function ($) {

    placeholder_emul();

});

function startScroller() {

    var slideWrap = $('.scroller');

    slideWrap.bxSlider({
            pager: false,
            minSlides: 1,
            maxSlides: 9,
            slideWidth: 230,
            slideMargin: 0,
            speed:1000
        });

    $('.scroller_next').on ('click', function () {
       $('.bx-next').click();
       return false;
   });

    $('.scroller_prev').on ('click', function () {
        $('.bx-prev').click();
        return false;
    });
}

function makeScrolls() {

    $('.antiscroll-wrap').antiscroll({autoHide: false}).data('antiscroll');

}

function initTabs() {

    $('.tab_control_unit').on ('click', function () {
        var firedEl = $(this);

        if (!firedEl.hasClass('current_tab')) {
            $('.current_tab').removeClass('current_tab');
            $('.tab_unit').eq(firedEl.index()).addClass('current_tab');
            firedEl.siblings().removeClass('current_tab').end().addClass('current_tab');

        }

        return false;

    });

    $('.event_info').on ('click', function () {
        $('.tab_unit').removeClass('current_tab').last().addClass('current_tab');
        $('.tab_control_unit').removeClass('current_tab');

        setTimeout(function () { //waiting for slideToggle and refresh scrollbars
            makeScrolls();
        }, 500);
        return false;
    });

    $('#popup_close_btn').on ('click', function () {
        $('.overlay').fadeOut(500);
        return false;
    });

    $(window).resize( function () {
        makeScrolls();
    });

    $('.scroll_unit').on ('click', function () {
        $('.overlay').fadeIn(500);
        makeScrolls();
        return false;
    });

}

function placeholder_emul() {
    if (!Modernizr.input.placeholder) {

        $('[placeholder]').focus(
            function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(
            function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();
        $('[placeholder]').parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });

    }
}

function initDropDown() {

    $('.selectbox').append('<ul class="select_list"></ul>')
        .find('select.place_select option').each(function () {
            var firedEl = $(this);
            firedEl.parent().parent().find('.select_list')
                .append($('<li class="select_item"></li>')
                    .html(this.text));

        })
        .parent().parent().on('click', function () {
            var firedEl = $(this),
                dropDown = firedEl.find('.select_list');

            $('.select_list').not(firedEl).slideUp(200);

            if (dropDown.is(':visible')) {
                closePopups ();
            }
            else {
                dropDown.slideDown(200);
                var firstClick = false;
                $(document).bind('click.myEvent', function (e) {
                    if (!firstClick && $(e.target).closest(firedEl).length == 0) {
                        dropDown.slideUp(200);
                        $(document).unbind('click.myEvent');
                    }
                    firstClick = false;
                });
            }

            return false;

        });

    $('.select_item').on('click', function () {
        var firedEl = $(this),
            slct_box = firedEl.index() + 1;

        if (!firedEl.hasClass('current_option')) {

            firedEl.parent().find('.current_option').removeClass('current_option');

            firedEl.addClass('current_option')
                .parent().parent().find('.place_select option:nth-child(' + slct_box + ')').each(function () {
                    this.selected = true;
                });

            firedEl.parent().slideUp(200).parent().find('.place_selector').html(firedEl.html());
        }

        return false;

    }).first().click();

    $('.select_list:empty').remove();

}

function closePopups () {
    $('.select_list').slideUp(200);
    $(document).unbind('click.myEvent');
}

function initLPscripts () {

    var zoom = zoomFix();

    $(window).resize( function () {
        zoom = zoomFix();
    });

    function navigation_fix() {

        var $document = $('.wrapper'),
            navigation = $('.fixed_menu_container'),
            header = $('.header'),
            scrollBarSize = scrollbarSize();

        $document.on('scroll', function () {

            var $this = $(this);

            if ($this.scrollTop()*zoom > header.height()) {
                navigation.parent().addClass('fixed_title');
                $('.fixed_menu_container').css('right',scrollBarSize*zoom);
            }
            else {
                navigation.parent().removeClass('fixed_title');
                $('.fixed_menu_container').css('right',0);

            }

        });
    }

    navigation_fix();

    setTimeout(function () { //waiting for slideToggle and refresh scrollbars
        makeScrolls();
    }, 1000);

    $(window).resize( function () {
        makeScrolls ();
    });

    $('.mod_event').on ('click', function () {
        $(this).fadeOut(200).parent().find('.tabs_wrapper').slideUp(500).end()
            .parent().find('.tab_control_unit.current_tab').removeClass('current_tab');
    }).click();

    $('.mod_events .tab_control_unit').on ('click', function () {

        var firedEl = $(this),
            tabsContainer = firedEl.parent().next('.tabs_wrapper');

        if (!firedEl.hasClass('current_tab')) {

            if (!tabsContainer.is(':visible')) {
                tabsContainer.slideDown(500)
                    .parent().find('.mod_event').fadeIn(500);
            }

            tabsContainer.find('.tab_unit').removeClass('current_tab')
                .eq(firedEl.index()).addClass('current_tab');
            firedEl.siblings().removeClass('current_tab').end().addClass('current_tab');

            setTimeout(function () { //waiting for slideToggle and refresh scrollbars
                makeScrolls();
            }, 600);

        }

        firedEl.parents('.tab_container').find('.mod_thanks').click();

        return false;

    });

    $('.submit_thanks').on ('click', function () {
        var firedEl = $(this),
            workArea = firedEl.parents('.tab_container');

        workArea.find('.mod_event').click().end()
            .find('.thanks_box').fadeIn(500).end()
            .find('.mod_thanks').fadeIn(1500).end();

        $('.mod_thanks').on ('click', function () {
            $(this).parent().fadeOut(500).end().fadeOut(200);
        });

        return false;

    });

    $('.event_info_btn').on ('click', function () {
        var firedEl = $(this);

        firedEl.parents('.venue_description').find('.mod_thanks').click();

        var tabsContainer = firedEl.parents('.venue_image_w').next().find('.tabs_wrapper');

        if (!tabsContainer.is(':visible')) {
            tabsContainer.slideDown(500)
                .parent().find('.mod_event').fadeIn(500);
        }

        tabsContainer.find('.tab_unit').removeClass('current_tab')
            .eq(3).addClass('current_tab');
        tabsContainer.next().find('.tab_control_unit').removeClass('current_tab').end().addClass('current_tab');

        setTimeout(function () { //waiting for slideToggle and refresh scrollbars
            makeScrolls();
        }, 600);

    });

    $('#fixed_menu_1').on ('click', function () {
        var firedEl = $(this),
            slideTime = 500;

        firedEl.toggleClass('opened').nextAll('.venue_description').slideToggle(slideTime);

        setTimeout(function () { //waiting for slideToggle and refresh scrollbars
            makeScrolls();
        }, slideTime);
    });

    $('.venue_description').first().slideDown(500);

    $('#fixed_menu_2').on ('click', function () {
        var firedEl = $(this),
            slideTime = 500;

        if (firedEl.hasClass('opened')) {
            firedEl.removeClass('opened').find('.fixed_menu_list').slideUp(slideTime);

        } else {
            firedEl.addClass('opened').find('.fixed_menu_list').slideDown(slideTime);

            $('.fixed_menu_item').on ('click', function () {
                var firedEl = $(this),
                    newTitle = firedEl.find('.bar_name').text(),
                    newLogo = firedEl.find('.venue_icon img').attr('src');

                $('.venue_description:visible').fadeOut(1000);
                firedEl.parents('#fixed_menu_2').removeClass('opened')
                    .find('.fixed_menu_list').slideUp(slideTime).end()
                    .find('.fixed_menu_label').text(newTitle).end()
                    .find('>.venue_icon img').attr('src',newLogo);

                setTimeout(function () {
                    $('.venue_description').eq(firedEl.index()).fadeIn(500);

                    setTimeout(function () { //waiting for slideToggle and refresh scrollbars
                        makeScrolls();
                    }, 500);

                }, 500);

                return false;

            });
        }
    });
}

function zoomFix () {
    return $('.base').css('zoom')<1?2:1;
}

function scrollbarSize () {
        var div = $(
            '<div style="width:50px;height:50px;overflow-y:scroll;'
                + 'position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%">'
                + '</div>'
        );

        $('body').append(div);
        var w1 = $(div).innerWidth();
        var w2 = $('div', div).innerWidth();
        $(div).remove();

        var size = w1 - w2;

    return size;
}
