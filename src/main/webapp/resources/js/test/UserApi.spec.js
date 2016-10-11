describe('UserApi', function() {

    describe('#login()', function() {
        it('올바른 email, password', function(done){
            UserApi.login('test@test.com', 1234, function(cookie){
                console.log(cookie);
                done();
                //console.log(cookie);
            });
        });
    });
});