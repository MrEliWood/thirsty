'use client';

import Link from 'next/link';

import styles from './footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Link href='https://www.flaticon.com/free-icons/cocktail' title='cocktail icon' target='_blank'>
				Cocktail icon created by Freepik - Flaticon
			</Link>
			<Link href='https://www.thecocktaildb.com' title='cocktail data' target='_blank'>
				Cocktail data provided by TheCocktailDB
			</Link>
		</footer>
	);
};

export default Footer;
