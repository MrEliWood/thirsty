'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import styles from './page.module.css';

ChartJS.register(ArcElement);

type ingredient = {
	name: string;
	measure: string;
};

type drink = {
	id: string;
	name: string;
	image: string;
	ingredients: ingredient[];
	instructions: string;
};

export default function Drink({ params }: { params: { id: string } }) {
	const [drink, setDrink] = useState<drink>({ id: '', name: '', image: '', ingredients: [], instructions: '' });

	const getDrink = (url: string) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				const drinkObject: drink = {
					id: data.drinks[0].idDrink,
					name: data.drinks[0].strDrink,
					image: data.drinks[0].strDrinkThumb,
					ingredients: [],
					instructions: data.drinks[0].strInstructions
				};

				// build ingredient list inside drink object
				for (let i = 1; i <= 15; i++) {
					if (data.drinks[0]['strIngredient' + i]) {
						const ingredient: ingredient = {
							name: data.drinks[0]['strIngredient' + i],
							measure: data.drinks[0]['strMeasure' + i].trim()
						};

						drinkObject.ingredients.push(ingredient);
					}
				}

				setDrink(drinkObject);

				console.log(drink.ingredients[0].measure.split(' ')[0]);
			});
	};

	const chartData = {
		datasets: [
			{
				data: drink.ingredients.map((ingredient) => {
					ingredient.measure.split(' ')[0];
				}),
				backgroundColor: ['#FF8A80', '#82B1FF', '#CCFF90', '#FF80AB', '#80D8FF', '#F4FF81', '#EA80FC', '#84FFFF', '#FFFF8D', '#B388FF', '#A7FFEB', '#FFE57F', '#8C9EFF', '#B9F6CA', '#FFD180']
			}
		]
	};

	// on page load, fetch drink details by id
	const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + params.id;

	useEffect(() => {
		getDrink(endpoint);
	}, []);

	return (
		<main className={styles.main}>
			<Image src={drink.image} alt={drink.name + ' image'} width='150' height='150' className={styles.drink_image} />
			<h1 className={styles.drink_name}>{drink.name}</h1>

			<section className={styles.ingredients}>
				<h4 className={styles.ingredients_label}>Ingredients:</h4>

				<div className={styles.ingredients_detail}>
					<div className={styles.ingredient_list}>
						{drink.ingredients.map((ingredient, i) => (
							<p key={i} className={styles.ingredient}>{`${ingredient.name} (${ingredient.measure})`}</p>
						))}
					</div>

					<div className={styles.chart}>{/* <Pie data={chartData} width={100} height={100} /> */}</div>
				</div>
			</section>

			<section className={styles.instructions}>
				<p>{drink.instructions}</p>
			</section>
		</main>
	);
}
