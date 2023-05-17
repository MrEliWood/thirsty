'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import styles from './header.module.css';

const Header = () => {
	const title = useSearchParams().get('name');

	return (
		<header className={styles.header}>
			<div className={styles.header_content}>
				{title && (
					<Link href='/' className={styles.back_button}>
						<svg width='9.55078' height='16.9629' className={styles.back_chevron}>
							<g>
								<rect height='16.9629' opacity='0' width='9.55078' x='0' y='0' />
								<path d='M0 8.47656C0 8.7207 0.0878906 8.93555 0.273438 9.12109L8.01758 16.6895C8.18359 16.8652 8.39844 16.9531 8.65234 16.9531C9.16016 16.9531 9.55078 16.5723 9.55078 16.0645C9.55078 15.8105 9.44336 15.5957 9.28711 15.4297L2.17773 8.47656L9.28711 1.52344C9.44336 1.35742 9.55078 1.13281 9.55078 0.888672C9.55078 0.380859 9.16016 0 8.65234 0C8.39844 0 8.18359 0.0878906 8.01758 0.253906L0.273438 7.83203C0.0878906 8.00781 0 8.23242 0 8.47656Z' fill='#2562f4' />
							</g>
						</svg>

						<p>Thirsty</p>
					</Link>
				)}

				<Link href='/' className={styles.site_title}>
					<h4>{title ? title : 'Thirsty'}</h4>
				</Link>
			</div>
		</header>
	);
};

export default Header;
