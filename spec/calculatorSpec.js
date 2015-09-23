describe("Calculator",function(){
	describe("Addition",function(){
		it("adds two numbers",function(){
			expect(calculator.add(1,2)).toEqual(3);
		});
	});
	describe("Subtraction",function(){
		it("subtracts two numbers",function(){
			expect(calculator.subtract(1,2)).toEqual(-1);
		});
	});
	describe("Multiplication",function(){
		it("multiplies two numbers",function(){
			expect(calculator.multiply(2,3)).toEqual(6);
		})
	});
	describe("Division",function(){
		it("divides two numbers",function(){
			expect(calculator.divide(6,2)).toEqual(3);
		})
	});
});

describe("Say",function(){
	describe("Hello",function(){
		it("says hello",function(){
			expect(say.hello('Ricardo','Marques')).toEqual('Hello Ricardo Marques');
		});
	});
	describe("Goodbye",function(){
		it("says bye",function(){
			expect(say.goodbye('Ricardo','Marques')).toEqual('Bye Ricardo Marques');
		});
	});
});