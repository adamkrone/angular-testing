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
			//initialize the headers as vaild
			device.headers={Authorization:"valid",Accept:"valid"};
			//mock the API
			device.service.resources.devices.get=function(query,headers){
				if(headers.headers.Authorization==="valid" && headers.headers.Accept==="valid"){
					res.body=['asus','msi','corsair'];
					res.status=200;
				}
				else if(headers.authorization==="invalid"){
					res.status=401;
				}
				else if(headers.accept==="invalid"){
					res.status=406
				}
				return {
					then: function(callback) { return callback(res) }
				}
			};
		});

		it("gets an array of all devices",function(){
			// console.log(device.service.resources.devices.get(null,{headers:device.headers}));
			device.getAll();
			scope.$digest();
			expect(device.result).toEqual(['asus','msi','corsair']);
		});

	});

});