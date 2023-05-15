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

	const getDrinks = (url: string) => {
		fetch(url)
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
	};

	// on page load, fetch 25 drinks starting with 'a'
	const allDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

	useEffect(() => {
		getDrinks(allDrinks);
	}, []);

	return (
		<main>
			<input type='search' placeholder='Find a drink' className={styles.search} />

			{drinks.map((drink: drink) => (
				<div key={drink.id} className={styles.drink_preview}>
					<Image src={drink.image} alt={drink.name + ' image'} width='40' height='40' className={styles.drink_thumbnail} />
					<p className={styles.drink_name}>{drink.name}</p>

					<svg width='5.73047' height='10.1777' className={styles.chevron}>
						<g>
							<rect height='10.1777' opacity='0' width='5.73047' x='0' y='0' />
							<path d='M5.73047 5.08594C5.73047 4.93945 5.67188 4.80469 5.56055 4.69922L0.919922 0.152344C0.814453 0.0527344 0.685547 0 0.533203 0C0.234375 0 0 0.228516 0 0.533203C0 0.679688 0.0585938 0.814453 0.152344 0.914062L4.41797 5.08594L0.152344 9.25781C0.0585938 9.35742 0 9.48633 0 9.63867C0 9.94336 0.234375 10.1719 0.533203 10.1719C0.685547 10.1719 0.814453 10.1191 0.919922 10.0137L5.56055 5.47266C5.67188 5.36133 5.73047 5.23242 5.73047 5.08594Z' fill='#98989d' />
						</g>
					</svg>
				</div>
			))}
		</main>
	);
}
