let mainContentElement = document.querySelector("#main-content");

//render menus on initial page load
renderFoodMenu();

function renderFoodMenu() {
	mainContentElement.innerHTML = ``;
	let foodMenuMarkup = ``;

	//create the markup for the menu depending on the amount of menus in the DB
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


function renderFoodList(foodListIndex) {
  mainContentElement.innerHTML = ``;
  let foodListMarkup = ``;

  //create the markup for the food depeding on the amount of items in that menu
  for (let i = 0; i < AllFoodList[foodListIndex].length; i++) {
    foodListMarkup += `
		<div class="col-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title text-center">${AllFoodList[foodListIndex][i].FoodName}</h5>
				<img src=${AllFoodList[foodListIndex][i].FoodPicture} class="rounded img-fluid mx-auto d-block">
				<p class="text-center my-3">$ ${AllFoodList[foodListIndex][i].FoodPrice.toFixed(2)}</p>
				<div class="hstack gap-2 my-3">
					<button class="btn btn-primary"><i class="fas fa-minus"></i></button>
					<input class="form-control" type="text" disabled placeholder="0">
					<button class="btn btn-primary"><i class="fas fa-plus"></i></button>
				</div>
			</div>
		</div>
	</div>`;
  }

  //render the full markup inside main
  mainContentElement.innerHTML += `
	<div class="row mx-0 g-3 my-0">
		${foodListMarkup}
	</div>

	<!--Line Seperator (end)-->
	<hr class="mx-2" style="margin-bottom: 5rem;">

	<!--Bottom navbar-->
	<nav class="navbar fixed-bottom navbar-light sky-blue mt-5">
		<div class="container-fluid">
			<button type="button" class="btn btn-lg btn-success d-block mx-auto">Confirm Order</button>
		</div>
	</nav>`;
}