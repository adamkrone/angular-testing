describe("deviceTestCtrl",function(){
	beforeEach(module("deviceTest"));

	var $controller, $rootScope;
	beforeEach(inject(function(_$controller_ , _$rootScope_){
		$controller = _$controller_;
		$rootScope = _$rootScope_;
	}))

	describe("device.getAll",function(){
		var scope = {},
		    controller,
		    res={},
        promiseBuilder;

		beforeEach(function(){
			scope = $rootScope.$new();
			device = $controller('deviceTestCtrl', {$scope: scope});

      promiseBuilder = function (response) {
        return { then: function (callback) { return callback(response); } };
      };
		});

    describe('with a 200 response', function () {
      beforeEach(function () {
        var response = { body: ['asus', 'msi', 'corsair'], status: 200 };
        var then = promiseBuilder(response);
        spyOn(device.service.resources.devices, 'get').and.returnValue(then);
      });

      it("gets an array of all devices",function(){
        device.getAll();
        scope.$digest();
        expect(device.result).toEqual(['asus','msi','corsair']);
      });
    });

    describe('with a 401 response', function () {
      beforeEach(function () {
        var response = { status: 401 };
        var then = promiseBuilder(response);
        spyOn(device.service.resources.devices, 'get').and.returnValue(then);
      });

      it("responds to an invalid token",function(){
        device.getAll();
        scope.$digest();
        expect(device.error).toEqual("Invalid token.");
      });
    });

    describe('with a 406 response', function () {
      beforeEach(function () {
        var response = { status: 406 };
        var then = promiseBuilder(response);
        spyOn(device.service.resources.devices, 'get').and.returnValue(then);
      });

      it("responds to an invalid accept header",function(){
        device.getAll();
        scope.$digest();
        expect(device.error).toEqual("There was an error.");
      });
    });

	});

});
