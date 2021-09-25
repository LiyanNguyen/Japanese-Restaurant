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
			<a type="button" class="btn text-white" onclick="renderOrders()"><i class="fas fa-shopping-cart"></i> Orders <span class="badge bg-success">${CartAmount}</span></a>
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
				<img class="rounded img-fluid me-3" src=${foodMenu[i].MenuPicture}>
				<div class="me-auto">
					<div id="foodMenuOption${i}" class="fw-bold text-black" onclick="renderFoodList(${i})">${foodMenu[i].MenuName} <i class="fas fa-angle-right"></i></div>
				</div>
				<span class="badge bg-primary">${foodMenu[i].AmountOfFood}</span>
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
	mainContentElement.innerHTML = ``;
	let foodListMarkup = ``;
	
	//create the markup for the food depeding on the amount of items in that menu
	for (let i = 0; i < AllFoodList[foodListIndex1].length; i++) {
		foodListMarkup += `
		<div class="col-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title text-center">${AllFoodList[foodListIndex1][i].FoodName}</h5>
				<img src=${AllFoodList[foodListIndex1][i].FoodPicture} class="rounded img-fluid mx-auto d-block">
				<p class="text-center my-3">$ ${AllFoodList[foodListIndex1][i].FoodPrice.toFixed(2)}</p>
				<div class="hstack gap-2 my-3">
					<button class="btn btn-primary" onclick="if(OrderAmount${i}.value > 0){OrderAmount${i}.value--; removeFromOrder(${foodListIndex1},${i});}"><i class="fas fa-minus"></i></button>
					<input id="OrderAmount${i}" class="form-control" type="number" disabled placeholder="0">
					<button class="btn btn-primary" onclick="OrderAmount${i}.value++; addToOrder(${foodListIndex1},${i})"><i class="fas fa-plus"></i></button>
				</div>
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

function addToOrder(foodListIndex1, foodListIndex2) {
	//update UI
	CartAmount++;
	renderTopNavBar();
	//add the selected food object into current order
	currentOrders.push(AllFoodList[foodListIndex1][foodListIndex2]);
}

function removeFromOrder(foodListIndex1, foodListIndex2) {
	//update UI
	CartAmount--;
	renderTopNavBar();
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
			return currentItem.FoodPrice + currentTotal;
		}, 0);

		//create the markup for order table
		for (let i = 0; i < currentOrders.length; i++) {
			foodOrderMarkup += `
			<tr>
				<td>${currentOrders[i].FoodName}</td>
				<td>$${currentOrders[i].FoodPrice.toFixed(2)}</td>
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
									<th scope="col">Item</th>
									<th scope="col">Price</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								${foodOrderMarkup}
							</tbody>
							<tfoot class="my-4">
								<th>Order Total</th>
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
				<button type="button" class="btn btn-success d-block mx-auto">Confirm Order</button>
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
	renderOrders();
}