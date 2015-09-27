var AftonbladetFeed = {

    init: function () {
        'use strict';
        AftonbladetFeed.getFeed({
            url: 'http://www.aftonbladet.se/rss.xml',
            id: 'bxslider'
        });
    },
    getFeed: function (params) {
        'use strict';
        return $.ajax({
            type: "GET",
            url: params.url,
            dataType: "xml",
            success: function (xml) {
                $(xml).find('item').each(function () {
                    var title = '<h2 class="feed-heading">' + $(this).find('title').text() + '</h2>',
                        dateArr = $(this).find('pubDate').text().split(" "),
                        dateFormatted = dateArr[1] + ' ' + dateArr[2] + ' ' + dateArr[4],
                        pubDate = '<span class="feed-pubDate">' + dateFormatted + '</span>',
                        description = $(this).find("description").text(),
                        image = $(description)[0],
                        text = $(description)[1],
                        sliderItem = '<a href="' + $(this).find('link').text() + '" class="feed-content"></a>';
                    sliderItem = $(sliderItem).append($(image));
                    sliderItem = $(sliderItem).append($(title));
                    sliderItem = $(sliderItem).append($(pubDate));
                    sliderItem = $(sliderItem).append($(text));
                    sliderItem = $('<li></li>').append($(sliderItem));
                    sliderItem.appendTo('#' + params.id);
                });
            }
        });
    },
    startSlider: function () {
        'use strict';
        var slider = $('#bxslider').bxSlider({
            mode: 'vertical',
            minSlides: 3,
            slideWidth: 500,
            slideMargin: 10
        });

        $('#feed-select-news').on('change', function () {
            var numberOfNews = $('#feed-select-news').val();

            slider.reloadSlider({
                mode: 'vertical',
                minSlides: numberOfNews,
                slideWidth: 500,
                slideMargin: 10
            });
        });
    }
};

(function () {
    'use strict';
    AftonbladetFeed.init();
    $(document).ajaxComplete(AftonbladetFeed.startSlider);
}());