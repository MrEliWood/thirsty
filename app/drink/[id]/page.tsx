'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { getDrink, parseMeasure } from '@/utils';
import styles from './page.module.css';

ChartJS.register(ArcElement);

export default function Drink({ params }: { params: { id: string } }) {
	const [drink, setDrink] = useState<drink>({ id: '', name: '', image: '', ingredients: [], instructions: '' });

	// on page load, fetch drink details by id
	const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + params.id;

	useEffect(() => {
		getDrink(endpoint).then((drinkData) => setDrink(drinkData));
	}, []);

	const chartColors = ['#FF8A80', '#82B1FF', '#CCFF90', '#80D8FF', '#FF80AB', '#F4FF81', '#EA80FC', '#84FFFF', '#FFFF8D', '#B388FF', '#A7FFEB', '#FFE57F', '#8C9EFF', '#B9F6CA', '#FFD180'];

	const chartData = {
		datasets: [
			{
				// data accepts an array of numbers
				data: drink.ingredients.map((ingredient) => parseMeasure(ingredient)),

				// backgroundColor accepts an array of color codes
				backgroundColor: chartColors,
				borderWidth: 0
			}
		]
	};

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
