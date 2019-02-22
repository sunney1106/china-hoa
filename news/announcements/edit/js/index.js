var render = function () {
    var content_template = $('#edit').html();
    Mustache.parse(content_template);
    $('#edit').after(Mustache.render(content_template, data));
    _pre_render();

    // Global post render
    _post_render();

    // Local post render

    // admin
    if (data._current_user && data._current_user.is_admin == true) {
        $('.buttona').css('display', 'none')
    }

    $.getScript(data._metadata.assets_path + '/news/announcements/edit/js/cdn.ckeditor.js', function () {
        //Carousel
        ClassicEditor
            .create(document.querySelector('#editor'))
            .catch(error => {
                console.error(error);
            });
    });

    function CuteEditor_FilterCode(editor, code) {
        return code.replace(/(<\/*)(script)([^\>]*\>)/ig,
            "$1script$3").replace(/(['"][^\n\r']*)([\n\r]+)([^\n\r']*)([\n\r]*)(['"])/ig,
            "$1$3$5");
    }


    
}