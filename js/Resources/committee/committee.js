var render = function () {
    var committeeList = $('#committeeList').html();
    Mustache.parse(committeeList);
    $.each(data.ManagementList, function () {
        $('#committeeExternal').append(Mustache.render(committeeList, this));
    });
    var committeeListsecond = $('#committeeListsecond').html();
    Mustache.parse(committeeListsecond);
    $.each(data.ManagementList2, function () {
        $('#committeeListsecondExternal').append(Mustache.render(committeeListsecond, this));
    });
    var committeeListThird = $('#committeeListThird').html();
    Mustache.parse(committeeListThird);
    $.each(data.ManagementList3, function () {
        $('#committeeExternalExternal').append(Mustache.render(committeeListThird, this));
    });

    var TheTitle = $('#TheTitle').html();
    Mustache.parse(TheTitle);
    $.each(data.TheTitle, function () {
        $('#TheTitleExternal').append(Mustache.render(TheTitle, this));
    });

    var Addbutton = $('#Addbutton').html();
    Mustache.parse(Addbutton);
    $.each(data.Addbutton, function () {
        $('#AddbuttonExternal').append(Mustache.render(Addbutton, this));
    });

    $('#tabs a').click(function (e) {
        e.preventDefault();
        $('#tabs li').removeClass("current").removeClass("hoverItem");
        $(this).parent().addClass("current");
        $(".choose-right ul").removeClass("show");
        $('#' + $(this).attr('title')).addClass('show');
    });

    $('#tabs a').hover(function () {
        if (!$(this).parent().hasClass("current")) {
            $(this).parent().addClass("hoverItem");
        }
    }, function () {
        $(this).parent().removeClass("hoverItem");
    });

    // admin
    var storage = window.localStorage;
    if (storage.getItem('username') === 'admin') {
        $('.choose-right').css('margin-top', '50px')
        $('.committee_add').css('display', 'block')
        $('.admin-control').css('display', 'block')
        $('.committee_add').click(function () {
            var data = 'Board/Committee';
            window.location.href = `http://tfire.net/Resources/committee/add.html?${data}`
        })
        $(".del").click(function () {
            deleteLog()
        })
    }

    var username = storage.getItem('username')
    $(".btns-language").text(username);

    $('.logout').click(function () {
        window.localStorage.setItem('username', '')
        window.location.href = "http://tfire.net/index.html"

    })
};