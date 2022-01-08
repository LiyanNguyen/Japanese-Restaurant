let mainContentElement = document.querySelector("#main-content");
let CartAmount = 0;
let currentOrders = [];

//render menus on initial page load
renderTopNavBar();
renderFoodMenu();

function renderTopNavBar() {
	let topNavBarElement = document.querySelector("#top-navbar");

	topNavBarElement.innerHTML = `
	<nav class="navbar fixed-top navbar-dark navy-blue">
		<div class="container-fluid">
			<a type="button" class="btn text-white" onclick="renderFoodMenu()"><i class="fas fa-utensils"></i> Menu</a>
			<a type="button" class="btn text-white" onclick="renderOrders()"><i class="fas fa-shopping-cart"></i> Orders <span id="cart-button" class="badge bg-success">${CartAmount}</span></a>
		</div>
	</nav>`;
}

function renderFoodMenu() {
	mainContentElement.innerHTML = ``;
	let foodMenuMarkup = ``;

	//create the markup for the menu depending on the amount of menus in the database
	for (let i = 0; i < foodMenu.length; i++) {
		foodMenuMarkup += `
		<li class="list-group-item d-flex justify-content-between align-items-start">
				<img class="rounded img-fluid me-3" src=${foodMenu[i].MenuPicture} width="100" height="100" onclick="renderFoodList(${i})">
				<div class="me-auto my-auto ms-3">
					<div id="foodMenuOption${i}" class="fw-bold text-black" onclick="renderFoodList(${i})">${foodMenu[i].MenuName}</div>
				</div>
				<h6 class="my-auto"><span class="badge else-blue">${foodMenu[i].AmountOfFood}</span></h6>
			</li>`;
	}

	//render the full markup inside main
	mainContentElement.innerHTML += `
	<!--Food menu content-->
	<div class="row me-0 ms-2 g-3 my-0">
		<ul class="list-group">
			${foodMenuMarkup}
		</ul>
	</div>`;
}


function renderFoodList(foodListIndex1) {
	window.scrollTo(0, 0);
	mainContentElement.innerHTML = ``;
	let foodListMarkup = ``;
	
	//create the markup for the food depeding on the amount of items in that menu
	for (let i = 0; i < AllFoodList[foodListIndex1].length; i++) {
		foodListMarkup += `
		<div class="col-6">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title text-center">${AllFoodList[foodListIndex1][i].FoodName}</h5>
					<img src="${AllFoodList[foodListIndex1][i].FoodPicture}" class="rounded img-fluid mx-auto d-block" width="200" height="200">
					<p class="text-center my-3">$ ${AllFoodList[foodListIndex1][i].FoodPrice.toFixed(2)}</p>
					<div class="hstack gap-2 my-3">
						<button class="btn sky-blue" onclick="if(OrderAmount${i}.value > 0){OrderAmount${i}.value--;}"><i class="fas fa-minus"></i></button>
						<input id="OrderAmount${i}" class="form-control text-center" type="number" disabled placeholder="0">
						<button class="btn sky-blue" onclick="OrderAmount${i}.value++;"><i class="fas fa-plus"></i></button>
					</div>
					<button id="AddToOrderButton${i}" class="btn btn-primary col-12" onclick="addToOrder(${foodListIndex1},${i}, OrderAmount${i}.value); OrderAmount${i}.value = 0;">Add to Order</button>
				</div>
			</div>
		</div>`;
	}

	//render the full markup inside main
	mainContentElement.innerHTML += `
	<div class="row mx-0 g-3 my-0">
		${foodListMarkup}
	</div>`;
}

function addToOrder(foodListIndex1, foodListIndex2, quantity) {
	if (quantity > 0) {
		//update UI
		CartAmount++;
		renderTopNavBar();
		document
			.querySelector("#cart-button")
			.classList.add("animate__animated", "animate__heartBeat");
		
		//add the selected food object into current order
		currentOrders.push({
			ItemName: AllFoodList[foodListIndex1][foodListIndex2].FoodName,
			ItemQuantity: quantity,
			ItemPrice:
				AllFoodList[foodListIndex1][foodListIndex2].FoodPrice * quantity,
		});
	}
}

function removeFromOrder(foodListIndex1, foodListIndex2) {
	//update UI
	CartAmount--;
	renderTopNavBar();
	document
		.querySelector("#cart-button")
		.classList.add("animate__animated", "animate__heartBeat");
	//find the index of the selected food object
	let objectToRemove = currentOrders.indexOf(AllFoodList[foodListIndex1][foodListIndex2]);
	//remove the selected food object into current order
	currentOrders.splice(objectToRemove, 1);
}

function renderOrders() {
	mainContentElement.innerHTML = ``;
	let foodOrderMarkup = ``;

	if (currentOrders.length > 0) {
		//calculate the order total
		let orderTotal = currentOrders.reduce((currentTotal, currentItem) => {
			return currentItem.ItemPrice + currentTotal;
		}, 0);

		//create the markup for order table
		for (let i = 0; i < currentOrders.length; i++) {
			foodOrderMarkup += `
			<tr>
				<td>#${i + 1}</td>
				<td>${currentOrders[i].ItemName}</td>
				<td>x${currentOrders[i].ItemQuantity}</td>
				<td>$${currentOrders[i].ItemPrice.toFixed(2)}</td>
				<td><button type="button" class="btn-close" onclick="removeFromOrderTable(${i})"></button></td>
			</tr>`;
		}
		
		//render the full markup inside main
		mainContentElement.innerHTML = `
		<div class="row me-2 ms-2 g-3 my-0">
			<div class="card">
				<div class="card-body">
					<div class="table-responsive">
						<table class="table">
							<thead>
								<tr>
									<th scope="col">Order</th>
									<th scope="col">Item</th>
									<th scope="col">Quantity</th>
									<th scope="col">Price</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								${foodOrderMarkup}
							</tbody>
							<tfoot class="my-4">
								<th colspan="3">Order Total</th>
								<td>$${orderTotal.toFixed(2)}</td>
								<td></td>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
		
		<!--Line Seperator (end)-->
		<hr class="mx-2" style="margin-bottom: 5rem;">

		<!--Bottom navbar-->
		<nav class="navbar fixed-bottom navbar-light snow-white mt-5 else-blue">
			<div class="container-fluid">
				<button type="button" class="animate__animated animate__pulse animate__infinite	infinite btn btn-lg btn-success d-block mx-auto" onclick="ConfirmFoodOrder()">Confirm Order</button>
			</div>
		</nav>`;
	}

	else {
		//render the full markup inside main
		mainContentElement.innerHTML = `
		<div class="row me-2 ms-2 g-3 my-0">
			<div class="card">
				<div class="card-body">
					<div class="card-text text-center lead">You currently have no orders.</div>
					<div class="card-text text-center">Check out the menu to order.</div>
				</div>
			</div>
		</div>`;
	}	
}

function removeFromOrderTable(currentOrderIndex) {
	CartAmount--;
	currentOrders.splice(currentOrderIndex, 1);
	renderTopNavBar();
	document
		.querySelector("#cart-button")
		.classList.add("animate__animated", "animate__heartBeat");
	renderOrders();
}

function ConfirmFoodOrder() {
	CartAmount = 0;
	currentOrders = [];
	renderTopNavBar();
	mainContentElement.innerHTML = `
	<div class="row me-2 ms-2 g-3 my-0">
		<div class="card">
			<div class="card-body">
				<div class="card-text text-center lead text-success fw-bold animate__animated animate__fadeIn">Your order has been received!</div>
				<div class="card-text text-center animate__animated animate__fadeIn animate__delay-1s">Please wait while we are preparing your food. 😊</div>
			</div>
		</div>
	</div>`;
 }