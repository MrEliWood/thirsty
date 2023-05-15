'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import styles from './page.module.css';

type drink = {
	id: string;
	name: string;
	image: string;
};

export default function Drink({ params }: { params: { id: string } }) {
	return <h1>Drink Name</h1>;
}
