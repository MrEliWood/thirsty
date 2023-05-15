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
					<h4>Thirsty</h4>
				</header>

				{children}

				<footer>
					<Link href='/'>Flaticon Link</Link>
					<Link href='/'>TheCocktailDB Link</Link>
				</footer>
			</body>
		</html>
	);
}
