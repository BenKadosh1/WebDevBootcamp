var faker = require('faker');

console.log("=============")
console.log("WELCOME TO MY SHOP!")
console.log("=============")

for(var i = 0; i< 10; i++) {
	item = faker.commerce.productName();
	itemPrice = faker.commerce.price();
	
	output = item + " - $" + itemPrice;
	console.log(output);	
}