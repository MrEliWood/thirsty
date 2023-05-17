const getDrink = async (url: string) => {
	const res: Response = await fetch(url);
	const data: any = await res.json();

	// map data to typed object
	const drinkObject: drink = {
		id: data.drinks[0].idDrink,
		name: data.drinks[0].strDrink,
		image: data.drinks[0].strDrinkThumb,
		ingredients: [],
		instructions: data.drinks[0].strInstructions
	};

	// build ingredient list inside drink object
	for (let i: number = 1; i <= 15; i++) {
		if (data.drinks[0]['strIngredient' + i]) {
			const ingredient: ingredient = {
				name: data.drinks[0]['strIngredient' + i],
				measure: data.drinks[0]['strMeasure' + i] ? data.drinks[0]['strMeasure' + i].trim() : null
			};

			drinkObject.ingredients.push(ingredient);
		}
	}

	console.log(drinkObject);

	return drinkObject;
};

export default getDrink;
