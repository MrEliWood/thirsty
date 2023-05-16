'use client';

import Link from 'next/link';

import styles from './header.module.css';

export default function Header() {
	return (
		<header className={styles.header}>
			<Link href='/' className={styles.site_title}>
				<h4>Thirsty</h4>
			</Link>
		</header>
	);
}
