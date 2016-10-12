$( document ).ready(function(){
    renderSignInPage();
});

function renderSignInPage() {
    var source = $("#signin-template").html();
    var template = Handlebars.compile(source);
    var html = template();
    $('#sadang').html(html);

    $('#go-signup-page-js').click(function(){
        renderSignUpPage();
    });

    $('#signin-js').click(function(event){
        event.preventDefault();
        var email = $('#signin-email').val();
        var password = $('#signin-passwd').val();
        UserApi.signIn(email, password, function(data){
            localStorage.setItem("token", data.token);
            renderTodoPage();
        }, function(error){
            alert(error.message);
        });
    });
}

function renderSignUpPage(){
    var source = $("#signup-template").html();
    var template = Handlebars.compile(source);
    var html = template();
    $('#sadang').html(html);

    $('#signup-js').click(function(event){
        event.preventDefault();
        var email = $('#signup-email').val();
        var password = $('#signup-passwd').val();

        UserApi.signUp(email, password, function(){
            renderSignInPage();
        }, function(error){
            alert(error.message);
        });
    });
}

function renderTodoPage(){
    var source = $("#todo-template").html();
    var template = Handlebars.compile(source);
    var html = template();
    $('#sadang').html(html);

    renderSidebarCmp();
    renderTodoListCmp();

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
}

function renderSidebarCmp() {
    var source = $("#category-template").html();
    var template = Handlebars.compile(source);

    var current = localStorage.getItem('current') || 'Total';
    localStorage.setItem('current', current);
    var html = template({categories :[{name:'Total'}, {name:'Bookmark'}, {name:'Done'}], current: current});
    $('.sidebar-nav').html(html);

    $('#signout-js').click(function(){
        localStorage.clear();
        renderSignInPage();
    });
}

function renderTodoListCmp() {
    var source = $("#todolist-template").html();
    var template = Handlebars.compile(source);

    refreshTodoList(template);

    $('.add-todo-btn-js').click(function(e){
        e.preventDefault();
        var content = $('#todo-content-js').val();
        TodoApi.add({content : content, category : localStorage.getItem('current')}, function(data){
            refreshTodoList();
        }, function(error){
        });
    });
}

function refreshTodoList(template) {
    TodoApi.get({category: localStorage.getItem('current')}, function (data) {
        var html = template({data: data});
        $('.total-todolist').html(html);
    }, function (error) {
        alert(error.message);
    });
}