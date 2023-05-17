'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { getDrink, parseMeasure } from '@/utils';
import styles from './page.module.css';

ChartJS.register(ArcElement);

const Drink = ({ params }: { params: { id: string } }) => {
	const [drink, setDrink] = useState<drink>({ id: '', name: '', image: '', ingredients: [], instructions: '' });
	const [loading, setLoading] = useState<boolean>(true);

	// on page load, fetch drink details by id
	const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + params.id;

	useEffect(() => {
		getDrink(endpoint).then((drinkData) => {
			setDrink(drinkData);
			setLoading(false);
		});
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
			{!loading ? <Image src={drink.image} alt={drink.name + ' image'} width='150' height='150' className={styles.drink_image} /> : <Skeleton circle={true} width={150} height={150} />}

			<h2 className={styles.drink_name}>{!loading ? drink.name : <Skeleton containerClassName={styles.skeleton} />}</h2>

			<section className={styles.ingredients}>
				<h4 className={styles.ingredients_label}>{!loading ? 'ingredients:' : <Skeleton containerClassName={styles.skeleton} />}</h4>

				<div className={styles.ingredients_detail}>
					<div className={styles.ingredient_list}>
						{!loading ? (
							drink.ingredients.map((ingredient: ingredient, i: number) => (
								<div key={i} className={styles.ingredient}>
									<svg width='20' height='20' className={styles.legend_color}>
										<rect height='20' width='20' rx='3' fill={chartColors[i]} />
									</svg>

									<p>{ingredient.name + (ingredient.measure ? ` (${ingredient.measure})` : '')}</p>
								</div>
							))
						) : (
							<Skeleton count={4} containerClassName={styles.skeleton} />
						)}
					</div>

					<div className={styles.chart}>{!loading ? <Pie data={chartData} width={100} height={100} /> : <Skeleton circle={true} width={120} height={120} containerClassName={styles.skeleton} />}</div>
				</div>
			</section>

			<section className={styles.instructions}>
				<p>{!loading ? drink.instructions : <Skeleton count={3} containerClassName={styles.skeleton} />}</p>
			</section>
		</main>
	);
};

export default Drink;
