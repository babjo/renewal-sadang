Handlebars.registerHelper('active', function(a, b, options) {
    if(a.toUpperCase()==b.toUpperCase())
        return "active";
    else
        return "";
});
Handlebars.registerHelper('starred', function(bookmarked, options) {
    if(bookmarked)
        return "starred";
    else
        return "";
});
Handlebars.registerHelper('isCompleted', function(completed, options) {
    if(completed)
        return "completed";
    else
        return "";
});