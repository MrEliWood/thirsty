'use client';

import Link from 'next/link';

import styles from './footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Link href='https://www.flaticon.com/free-icons/cocktail' title='cocktail icon'>
				Cocktail icon created by Freepik - Flaticon
			</Link>
			<Link href='https://www.thecocktaildb.com' title='cocktail data'>
				Cocktail data provided by TheCocktailDB
			</Link>
		</footer>
	);
}
