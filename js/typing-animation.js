/**
 * Typing Animation Script
 * Animates text typing effect when element becomes visible
 */
(function() {
	'use strict';

	const text = '„Tu ce visezi să construiești?"';
	const heroSpan = document.getElementById('animated-hero-span');
	const heroElement = document.getElementById('animated-hero-text');
	let idx = 0;
	let hasAnimated = false;
	
	function typeText() {
		if (idx < text.length) {
			heroSpan.innerHTML += text.charAt(idx);
			idx++;
			setTimeout(typeText, 38);
		}
	}
	
	// Intersection Observer to detect when element is visible
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting && !hasAnimated) {
				hasAnimated = true;
				idx = 0;
				heroSpan.innerHTML = '';
				typeText();
			}
		});
	}, {
		threshold: 0.3 // Start animation when 30% of element is visible
	});
	
	// Start observing the hero element
	if (heroElement) {
		observer.observe(heroElement);
	}
})();

