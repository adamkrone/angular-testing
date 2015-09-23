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
		    res={};
		beforeEach(function(){
			scope = $rootScope.$new();
			device = $controller('deviceTestCtrl', {$scope: scope});
			//mock the API
			device.service.resources.devices.get=function(query,headers){
				if(headers.headers.Authorization==="valid" && headers.headers.Accept==="valid"){
					res.body=['asus','msi','corsair'];
					res.status=200;
				}
				else if(headers.headers.Authorization==="invalid"){
					console.log('test');
					res.status=401;
				}
				else if(headers.headers.Accept==="invalid"){
					res.status=406;

				}
				return {
					then: function(callback) { return callback(res) }
				}
			};
		});

		it("gets an array of all devices",function(){
			device.headers={Authorization:"valid",Accept:"valid"};
			device.getAll();
			scope.$digest();
			expect(device.result).toEqual(['asus','msi','corsair']);
		});
		it("responds to an invalid token",function(){
			device.headers={Authorization:"invalid",Accept:"valid"};
			device.getAll();
			scope.$digest();
			expect(device.error).toEqual("Invalid token.");
		});
		it("responds to an invalid accept header",function(){
			device.headers={Authorization:"valid",Accept:"invalid"};
			device.getAll();
			scope.$digest();
			expect(device.error).toEqual("There was an error.");
		})

	});

});