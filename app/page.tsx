'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import styles from './page.module.css';

type drink = {
	id: string;
	name: string;
	image: string;
};

export default function Home() {
	const [drinks, setDrinks] = useState([]);

	const allDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

	// on page load, fetch 25 drinks starting with 'a'
	useEffect(() => {
		fetch(allDrinks)
			.then((res) => res.json())
			.then((data) => {
				const mappedData = data.drinks.map((drink: any) => ({
					id: drink.idDrink,
					name: drink.strDrink,
					image: drink.strDrinkThumb
				}));

				setDrinks(mappedData);
				console.log(mappedData);
			});
	}, []);

	return (
		<main>
			{drinks.map((drink: drink) => (
				<div key={drink.id}>
					<Image src={drink.image} alt={drink.name + ' image'} width='40' height='40' />
					<p>{drink.name}</p>
				</div>
			))}
		</main>
	);
}
