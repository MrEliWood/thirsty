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
							measure: data.drinks[0]['strMeasure' + i] ? data.drinks[0]['strMeasure' + i].trim() : null
						};

						drinkObject.ingredients.push(ingredient);
					}
				}

				setDrink(drinkObject);
			});
	};

	const chartColors = ['#FF8A80', '#82B1FF', '#CCFF90', '#80D8FF', '#FF80AB', '#F4FF81', '#EA80FC', '#84FFFF', '#FFFF8D', '#B388FF', '#A7FFEB', '#FFE57F', '#8C9EFF', '#B9F6CA', '#FFD180'];

	const chartData = {
		datasets: [
			{
				// data accepts an array of numbers
				data: drink.ingredients.map((ingredient) => {
					if (ingredient.measure) {
						const str = ingredient.measure.toLowerCase();

						// if there is no numberic value, return half an ounce to populate the chart
						if (!/\d/.test(str)) return 0.5;

						// extract numeric value from ingredient string
						let num = eval(str.split(' ')[0]);

						// if the second value is a fraction, add it to the first value
						if (str.split(' ')[1] && str.split(' ')[1].includes('/')) num += eval(str.split(' ')[1]);

						// return numberic value, converting to oz if necessary
						if (str.includes('oz') || str.includes('fresh') || str.includes('part')) return num;
						if (str.includes('tsp')) return num / 6;
						if (str.includes('tblsp')) return num / 2;
						if (str.includes('cl')) return num / 2.957;
						if (str.includes('ml')) return num / 29.574;
						if (str.includes('shot')) return num * 1.5;
						if (str.includes('dash') || str.includes('twist')) return num / 10;

						// if there is no unit of measure, return half an ounce to populate the chart
						if (!str.split(' ')[1] || str.split(' ')[1].includes('/')) return 0.5;
					} else return 0.1;
				}),
				backgroundColor: chartColors,
				borderWidth: 0
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
			<h2 className={styles.drink_name}>{drink.name}</h2>

			<section className={styles.ingredients}>
				<h4 className={styles.ingredients_label}>Ingredients:</h4>

				<div className={styles.ingredients_detail}>
					<div className={styles.ingredient_list}>
						{drink.ingredients.map((ingredient, i) => (
							<div key={i} className={styles.ingredient}>
								<svg width='20' height='20' className={styles.legend_color}>
									<rect height='20' width='20' rx='3' fill={chartColors[i]} />
								</svg>

								<p>{ingredient.name + (ingredient.measure ? ` (${ingredient.measure})` : '')}</p>
							</div>
						))}
					</div>

					<div className={styles.chart}>
						<Pie data={chartData} width={100} height={100} />
					</div>
				</div>
			</section>

			<section className={styles.instructions}>
				<p>{drink.instructions}</p>
			</section>
		</main>
	);
}
