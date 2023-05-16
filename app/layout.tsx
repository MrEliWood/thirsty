import Link from 'next/link';

import './globals.css';

export const metadata = {
	title: 'Thirsty',
	description: 'The drink finder'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<header>
					<Link href='/'>
						<h4>Thirsty</h4>
					</Link>
				</header>

				{children}

				<footer>
					<Link href='https://www.flaticon.com/free-icons/cocktail' title='cocktail icon'>
						Cocktail icon created by Freepik - Flaticon
					</Link>
					<Link href='https://www.thecocktaildb.com' title='cocktail data'>
						Cocktail data provided by TheCocktailDB
					</Link>
				</footer>
			</body>
		</html>
	);
}
