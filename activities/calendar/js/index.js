var render = function () {
    var event_template = $('#event_template').html();
    Mustache.parse(event_template);
    $.each(data.date, function () {
        $('#calendar_events').append(Mustache.render(event_template, this));
    });

    // Global post render
    _post_render();

    // Local post render

    $('#calendar').calendar({
        ifSwitch: true, // Whether to switch the month
        hoverDate: true, // hover Whether to display the day information
        backToday: true // Whether to return to the day
    });



    var storage = window.localStorage;
    if (storage.getItem('username') === 'admin') {
        $(".Add-top").css("display", "block")
        $(".top-right").css("display", "block")
        $(".right-b").click(function () {
            if ($('#calendar_events .saveChange').length) { 
                return false;
            }
            var index = Number($(this).parents('ul').attr('data'))
            deleteLog(data.date,index,$(this).parents('ul'))
        })        
        edit()   
    } else {
        var str =
            `<li class="tips">
                <ul>
                    <li><a href="#" class="Yes">Yes</a></li>
                    <li><a href="#" class="No">No</a></li>
                    <li><a href="#" class="Maybe">Maybe</a></li>
                    <li><a class="Notes">Notes</a></li>
                </ul>					
            </li>`;
        $('.calendar-right ul').mouseenter(function () {
            $(this).append(str)
            $('.Yes').hover(function () {
                $(this).addClass('tips_hover_yes')
            }, function () {
                $(this).removeClass('tips_hover_yes')
            })
            $('.No').hover(function () {
                $(this).addClass('tips_hover_no')
            }, function () {
                $(this).removeClass('tips_hover_no')
            })
            $('.Maybe').hover(function () {
                $(this).addClass('tips_hover_maybe')
            }, function () {
                $(this).removeClass('tips_hover_maybe')
            })
            $('.Notes').hover(function () {
                $(this).addClass('tips_hover_notes')
            }, function () {
                $(this).removeClass('tips_hover_notes')
            })
            $('.Notes').click(function (e) {
                $('.db1').show();
                return false;
            })
            $('.return').click(function () {
                $('.db1').hide();
            })
            return false;
        })
        $('.calendar-right ul').mouseleave(function () {
            $('.tips').remove()
        })

    }

    var username = storage.getItem('username')
    $(".btns-language").text(username);
    $('.logout').click(function () {
        window.localStorage.setItem('username', '')
        window.location.href = "http://127.0.0.1:8080/home/"
    })
    function edit() {
        $(".right-a").click(function () {
            if ($('.saveChange').length !== 0) {
                return false;
            }
            var val = $(this).parents('ul').find('li');
            var saveButton = `<span class="saveChange">Save</span>`;
            val.each(function (index, item) {
                if ($(item).find('.top-right')) {
                    $(item).find('.top-right').remove();
                }
                var value = $(item).text().trim();
                var inp = `<input type="text" style="width:80%" value="${value}"/>`;
                $(item).empty().append(inp)
            })
            val.parent().append(saveButton);
            $('.saveChange').click(function () {
                $(this).remove()
                var value = []
                val.find('input').each(function (index, item) {
                    value.push($(item).val())
                })
                $(val).empty()
                var editStr = `
                        <div class="top-right" style="display: block;">
                            <span class="right-a">Edit</span>
                            <span class="right-b">Delete</span>
                        </div>`
                $.each(value, function (index, item) {
                    $(val).eq(index).text(item)
                })
                $(val).eq(0).append(editStr)
                $(".right-b").click(function () {
                    if ($('#calendar_events .saveChange').length) {
                        return false;
                    }
                    deleteLog(data,index)
                })         
                edit()
            })
    
        })
    }
};
