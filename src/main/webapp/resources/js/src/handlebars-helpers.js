Handlebars.registerHelper('active', function(a, b, options) {
    if(a==b)
        return "active";
    else
        return "";
});
Handlebars.registerHelper('icon', function(val, block) {
    switch(val){
        case "Bookmark" : return "fa-star";
        case "Done" : return "fa-thumbs-up";
        default : return "fa-list-ul";
    }
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