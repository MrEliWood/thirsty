const searchDrinks = async (url: string) => {
	const res: Response = await fetch(url);
	const data: any = await res.json();

	// map data to typed object
	const drinkObject: drink[] = data.drinks
		? data.drinks.map((drink: any) => ({
				id: drink.idDrink,
				name: drink.strDrink,
				image: drink.strDrinkThumb
		  }))
		: [
				{
					id: '',
					name: '',
					image: ''
				}
		  ];

	return drinkObject;
};

export default searchDrinks;
