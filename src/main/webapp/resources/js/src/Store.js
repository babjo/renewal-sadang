window.Store = {};

function initStore(callback){
    TodoApi.getData(function(data){
        Store = { data : data, currentCategory : 'Total'};
        callback();
    }, function(){
        callback();
    });
}

function getTodoCategorySeq(){
    for (var i = 0; i < Store.data.my_category.length; i++) {
        var category = Store.data.my_category[i];
        if(category.category_name == 'ToDo'){
            return category.category_seq;
        }
    }
}

function getTodoCurrentCategoryHash(){
    for (var i = 0; i < Store.data.my_category.length; i++) {
        var category = Store.data.my_category[i];
        if(category.category_name == Store.currentCategory){
            return category.category_hash;
        }
    }
}