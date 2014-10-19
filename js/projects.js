function loadProjects() {
	$.getJSON( 'data/projects.json', function( data ) {

        var source = $( '#projects-template' ).html();

        // Let Handlebar compile the template
        var template = Handlebars.compile(source);
        var html  = template(data);

        // Add the compiled HTML to the page
        $('#projects .container').append(html);
    });
}
