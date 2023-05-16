'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { searchDrinks } from '@/utils';
import styles from './page.module.css';

export default function Home() {
	const [drinks, setDrinks] = useState<drink[]>([]);
	const [userSearch, setUserSearch] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	const endpoint: string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + userSearch;

	// make api call on page load
	useEffect(() => {
		searchDrinks(endpoint).then((drinkData) => setDrinks(drinkData));
	}, []);

	// debounce user search
	useEffect(() => {
		setLoading(true);

		// wait 1/2 second before fetching data, limiting excessive api calls for fast typers
		const timeout: NodeJS.Timeout = setTimeout(() => {
			searchDrinks(endpoint).then((drinkData) => {
				setDrinks(drinkData);
				setLoading(false);
			});
		}, 500);

		return () => clearTimeout(timeout);
	}, [userSearch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserSearch(e.target.value);
	};

	return (
		<main className={styles.main}>
			<div className={styles.search}>
				<input type='search' placeholder='Find a drink' value={userSearch} onChange={handleInputChange} />
			</div>

			{drinks.map((drink: drink, i) => {
				// if loading search, return loading animation
				// loading: opacity = 0 / loaded: opacity = 1
				if (loading) {
					return (
						<div className={styles.drink_preview}>
							<Skeleton circle={true} width={40} height={40} />
							<Skeleton width={'100%'} containerClassName={styles.skeleton} />
						</div>
					);
				}

				// if no search results, return error message
				if (!drink.id) {
					return (
						<p key={i} className={styles.search_error}>
							Sorry, we couldn't find that one.
						</p>
					);
				}

				return (
					<Link key={drink.id} href={'/drink/' + drink.id} className={styles.drink_preview}>
						<Image src={drink.image} alt={drink.name + ' image'} width='40' height='40' className={styles.drink_thumbnail} />
						<p className={styles.drink_name}>{drink.name}</p>

						<svg width='5.73047' height='10.1777'>
							<g>
								<rect height='10.1777' opacity='0' width='5.73047' x='0' y='0' />
								<path d='M5.73047 5.08594C5.73047 4.93945 5.67188 4.80469 5.56055 4.69922L0.919922 0.152344C0.814453 0.0527344 0.685547 0 0.533203 0C0.234375 0 0 0.228516 0 0.533203C0 0.679688 0.0585938 0.814453 0.152344 0.914062L4.41797 5.08594L0.152344 9.25781C0.0585938 9.35742 0 9.48633 0 9.63867C0 9.94336 0.234375 10.1719 0.533203 10.1719C0.685547 10.1719 0.814453 10.1191 0.919922 10.0137L5.56055 5.47266C5.67188 5.36133 5.73047 5.23242 5.73047 5.08594Z' fill='#bababd' />
							</g>
						</svg>
					</Link>
				);
			})}
		</main>
	);
}
