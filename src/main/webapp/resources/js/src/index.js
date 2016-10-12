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

    renderCategoryListCmp();
    renderTodoListCmp();

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
}

function renderTodoListCmp() {
    var source = $("#todolist-template").html();
    var template = Handlebars.compile(source);

    //var data = sort(Store.data.my_todo, Store.currentCategory, Store.currentCategorySeq);
    //console.log(data);
    //var html = template({data: data});
    var html = template();
    $('.total-todolist').html(html);
}

function renderCategoryListCmp() {
    var source = $("#category-template").html();
    var template = Handlebars.compile(source);
    //var html = template({data: Store.data.my_category, currentCategory: Store.currentCategory});
    var html = template();
    $('.sidebar-nav').html(html);
}