import './globals.css';

export const metadata = {
	title: 'Thirsty',
	description: 'The drink finder'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
