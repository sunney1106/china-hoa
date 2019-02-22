var render = function () {
    _pre_render();
    var CityResources_content = $('#CityResources_content').html();
    var Helpfuladdresses_title = $('#Helpfuladdresses_title').html();
    var aboutlink_content = $('#aboutlink_content').html();
    var schooladdresses_title = $('#schooladdresses_title').html();
    var Utilities_title = $('#Utilities_title').html();

    Mustache.parse(CityResources_content);
    $.each(data.CupertinoCityResources, function () {
        $('#CityResources').append(Mustache.render(CityResources_content, this));
    });
    Mustache.parse(Helpfuladdresses_title);
    $.each(data.HelpfulAddresses, function () {
        $('#Helpfuladdresses').append(Mustache.render(Helpfuladdresses_title, this));
    });
    Mustache.parse(aboutlink_content);
    $.each(data.UrbanResourceInformation, function () {
        $('#aboutlink').append(Mustache.render(aboutlink_content, this));
    });
    Mustache.parse(schooladdresses_title);
    $.each(data.NearbySchools, function () {
        $('#schooladdresses').append(Mustache.render(schooladdresses_title, this));
    });
    Mustache.parse(Utilities_title);
    $.each(data.Utilities, function () {
        $('#Utilities').append(Mustache.render(Utilities_title, this));
    });

  

    // Global post render
    _post_render();

    // Local post render

    
    

};