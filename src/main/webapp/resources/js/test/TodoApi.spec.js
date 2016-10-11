describe('TodoApi', function() {
    describe('#create()', function() {

        it('undefined 입력시, 에러 반환', function(done){
            TodoApi.create(undefined, function(){
            }, function(errMsg){
                expect(errMsg).to.equal('내용을 입력해야 합니다');
                done();
            });
        });

        it('text args에 undefined 입력시, 에러 반환', function(done){
            TodoApi.create({text : undefined}, function(){
            }, function(errMsg){
                expect(errMsg).to.equal('내용을 입력해야 합니다');
                done();
            });
        });

        it('categorySeq args에 undefined 입력시, 에러 반환', function(done){
            TodoApi.create({text : "나 잘적음", categorySeq : undefined}, function(){
            }, function(errMsg){
                expect(errMsg).to.equal('카테고리가 없어');
                done();
            });
        });

        it('text에 빈칸 입력시, 에러 반환', function(done){
            TodoApi.create({text : ""}, function(){
            }, function(errMsg){
                expect(errMsg).to.equal('내용을 입력해야 합니다');
                done();
            });
        });


        it('올바른 값 입력시, 성공 함수 호출', function(done){
            TodoApi.create({text:"오늘은 잘 만들꺼야!!"}, function(){
                console.log('aa');
                done();
            }, function(errMsg){
                done(new Error('do not invoke'));
            });
        });
    });
});