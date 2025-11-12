import React from 'react';
import styles from '../styles/News.module.css';
import SectionHeader from './SectionHeader.jsx';
import { newsArticles } from '../../lib/newsData.js';

const dummy = [
	{ date: '2025.08.31', title: 'TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT' },
	{ date: '2025.08.31', title: 'TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT' },
	{ date: '2025.08.31', title: 'TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT' },
	{ date: '2025.08.31', title: 'TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT' }
];


export default function News() {
	return (
		<section id="news" className={styles.section}>
			<div className={styles.container}>
				<SectionHeader title="NEWS" />
			</div>
			<div className={styles.news}>
				<ul className={styles.list}>
					{newsArticles.slice(0, 4).map((n, i) => (
						<li key={i} className={[styles.item, i === 0 ? styles.itemTop : ''].join(' ')}>
							<a href="\news">
								<p className={styles.date}>{n.date}</p>
								<p className={styles.title}>{n.title}</p>
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

