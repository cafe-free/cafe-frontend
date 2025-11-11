'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../styles/Pickup.module.css';
import SectionHeader from './SectionHeader.jsx';
import { pickUpImages } from '../../lib/pickUpImages.js';
const menuImage = '/MenuDrinkBG.png';

// const images = ['5', '6', '1', '2', '3', '4', '5', '6', '1', '2']; 
const images = pickUpImages.map((img) => (
	<img key={img.id} src={menuImage} alt={img.alt} className={styles.slideImage} />
));

export default function Pickup() {
	const [currentIndex, setCurrentIndex] = useState(2);
	const [autoPlayId, setAutoPlayId] = useState(null);
	const slidesRef = useRef(null);
	const navButtonsRef = useRef([]);
	const items = useMemo(() => images, []);

	useEffect(() => {
		// initialize position
		moveSlide(0);
		startAuto();
		return () => stopAuto();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function slideWidth() {
		const ul = slidesRef.current;
		if (!ul || ul.children.length === 0) return 0;
		return ul.children[0].getBoundingClientRect().width;
	}

	function moveSlide(durationMs = 400) {
		const ul = slidesRef.current;
		if (!ul) return;
		ul.style.transitionDuration = `${durationMs}ms`;
		ul.style.transform = `translateX(${-1 * slideWidth() * currentIndex}px)`;
	}

	function handleNext() {
		stopAuto();
		const nextIndex = currentIndex + 1;
		setCurrentIndex(nextIndex);
		requestAnimationFrame(() => {
			normalizeIndex(nextIndex, 'next');
		});
	}

	function handlePrev() {
		stopAuto();
		const nextIndex = currentIndex - 1;
		setCurrentIndex(nextIndex);
		requestAnimationFrame(() => {
			normalizeIndex(nextIndex, 'prev');
		});
	}

	function normalizeIndex(index, direction) {
		const ul = slidesRef.current;
		if (!ul) return;
		ul.addEventListener(
			'transitionend',
			() => {
				let newIndex = index;
				if (index > items.length - 2) {
					newIndex = 2;
				} else if (index === 1) {
					newIndex = items.length - 3;
				}
				setCurrentIndex(newIndex);
				ul.style.transitionDuration = '0ms';
				ul.style.transform = `translateX(${-1 * slideWidth() * newIndex}px)`;
				updateNav(newIndex);
				startAuto();
			},
			{ once: true }
		);
		moveSlide(800);
		updateNav(index);
	}

	function updateNav(index) {
		navButtonsRef.current.forEach((btn) => btn?.classList.remove('current'));
		const btnsLen = navButtonsRef.current.length;
		if (index === 1) {
			navButtonsRef.current[btnsLen - 1]?.classList.add('current');
		} else if (index < items.length - 2) {
			navButtonsRef.current[index - 2]?.classList.add('current');
		}
	}

	function goTo(i) {
		stopAuto();
		const index = i + 2;
		setCurrentIndex(index);
		moveSlide(400);
		updateNav(index);
		startAuto();
	}

	function startAuto() {
		stopAuto();
		const id = setInterval(() => {
			setCurrentIndex((idx) => {
				const next = idx + 1;
				const ul = slidesRef.current;
				if (!ul) return idx;
				ul.style.transitionDuration = '400ms';
				if (next > items.length - 2) {
					const w = slideWidth();
					ul.style.transitionDuration = '0ms';
					ul.style.transform = `translateX(${-1 * w * 2}px)`;
					updateNav(2);
					return 2;
				} else {
					ul.style.transform = `translateX(${-1 * slideWidth() * next}px)`;
					updateNav(next);
					return next;
				}
			});
		}, 4000);
		setAutoPlayId(id);
	}

	function stopAuto() {
		if (autoPlayId) {
			clearInterval(autoPlayId);
		}
	}

	return (
		<section id="pickup" className={styles.section}>
			<div className={styles.container}>
				<SectionHeader title="PICK UP" />
			</div>
			<div className={styles.wrap}>
				<div className={styles.carousel}>
					<ul ref={slidesRef} className={styles.slides}>
						{items.map((label, i) => (
							<li key={i} className={styles.card}>{label}</li>
						))}
					</ul>
				</div>
				<div className={styles.nav}>
					{Array.from({ length: items.length - 4 }).map((_, i) => (
						<button
							key={i}
							ref={(el) => (navButtonsRef.current[i] = el)}
							className={i === currentIndex - 2 ? 'current' : undefined}
							onClick={() => goTo(i)}
							aria-label={`Go to slide ${i + 1}`}
						/>
					))}
				</div>
				<div className={styles.buttons}>
					<div className={styles.buttonsInner}>
						<button className={styles.arrow} onClick={handlePrev} aria-label="Previous slide">
							<div className={styles.arrowIconLeft}></div>
						</button>
						<button className={styles.arrow} onClick={handleNext} aria-label="Next slide">
							<div className={styles.arrowIconRight}></div>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

