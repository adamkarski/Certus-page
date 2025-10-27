<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { visibilityStore, setSectionVisible } from '../../lib/visibilityStore';
	import { typoFixAction } from '$lib/utils/typography';

	const sectionId = 'video-header';
	let headerEl: HTMLDivElement;
	let sdVideoElement: HTMLVideoElement;
	let hdVideoElement: HTMLVideoElement;

	const sdVideoSrc = '/assets/video/video-sd.m4v';
	const hdVideoSrc = '/assets/video/video-hd.m4v';

	let sdOpacity = 1;
	let hdOpacity = 0;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setSectionVisible(sectionId);
				}
			},
			{ threshold: 0.05 }
		);
		if (headerEl) observer.observe(headerEl);

		fetch(hdVideoSrc)
			.then((response) => {
				if (!response.ok) throw new Error('HD video fetch failed');
				return response.blob();
			})
			.then(() => {
				if (sdVideoElement && hdVideoElement) {
					hdVideoElement.addEventListener(
						'canplay',
						() => {
							hdVideoElement.currentTime = sdVideoElement.currentTime;
							hdVideoElement.play();

							// Trigger the crossfade
							sdOpacity = 0;
							hdOpacity = 1;

							// After the fade, pause the SD video to save resources
							setTimeout(() => {
								sdVideoElement.pause();
							}, 1000);
						},
						{ once: true }
					);
				}
			})
			.catch((error) => {
				console.error('Failed to load HD video for crossfade:', error);
			});

		return () => {
			observer.disconnect();
		};
	});

	$: visible = $visibilityStore[sectionId] === true;
</script>

<section id="video" class="video">
	<div class="video-container masked-video">
		<!-- SD Video -->
		<video
			bind:this={sdVideoElement}
			src={sdVideoSrc}
			style="opacity: {sdOpacity}; transition: opacity 1s ease-in-out;"
			autoplay
			muted
			loop
			playsinline
			preload="auto"
			poster="/assets/images/pattern-video-1.png"
		/>
		<!-- HD Video -->
		<video
			bind:this={hdVideoElement}
			src={hdVideoSrc}
			style="opacity: {hdOpacity}; transition: opacity 1s ease-in-out;"
			muted
			loop
			playsinline
			preload="auto"
		/>

		<div class="pattern-overlay">
			<div class="video-pattern-1"></div>
			<div class="video-pattern-2"></div>
			<div class="video-pattern-3"></div>
		</div>

		<div class="video-header" bind:this={headerEl} class:visible>
			{#if visible}
				<h1 class="no-sel" in:fade={{ duration: 600, delay: 800 }} use:typoFixAction>
					Pomagamy, wdrażamy,<br />optymalizujemy procesy produkcyjne
				</h1>
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	.video-container {
		position: relative; // This is crucial for the absolute positioning of children
		width: 100%;
		margin: 0 auto;
		background: black; // Fallback background
	}

	.video-container video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
	}

	.masked-video {
		clip-path: polygon(
			0% 0%,
			94.18% 0%,
			100% 12.04%,
			100% 95.54%,
			34.93% 95.54%,
			32.23% 100%,
			4.18% 100%,
			0% 91.39%,
			0% 0%
		);
	}

	.pattern-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		pointer-events: none;
		opacity: 0.6;
	}
	.video-pattern-1 {
		background-image: url(/assets/images/pattern-video-1.png);
		position: absolute;
		width: 184px;
		height: 263px;
		z-index: 10;
		right: 0px;
		top: -40px;
		pointer-events: auto;
	}
	.video-pattern-2 {
		background-image: url(/assets/images/pattern-video-2.png);
		position: absolute;
		width: 102px;
		height: 194px;
		z-index: 10;
		left: 0px;
		bottom: 311px;
		transform: scale(1.2);
		pointer-events: auto;
		background-position-x: -115px;
	}
	.video-pattern-3 {
		background-image: url(/assets/images/pattern-video-3.png);
		position: absolute;
		width: 100%;
		height: 64px;
		z-index: 10;
		left: 0px;
		bottom: -20px;
		transform: scale(1.7);
		pointer-events: auto;
		background-position-x: -128px;
	}
	.video-header {
		min-height: 80px;
		width: 100vw;
		margin-left: calc(50% - 50vw);
		text-align: left;
		padding: 2rem 0 1rem 0;
		background: transparent;
		position: absolute;
		z-index: 2;
		margin-left: 11em;
		margin-top: -22em;
		:before {
			content: '';
			position: absolute;
			width: 30px;
			height: 46px;
			margin-left: -40px;
			background-image: url(/assets/images/red-arrow.svg);
			margin-top: 4px;;
		}
	}
	.video-header h1 {
		margin: 0;
		width: 80%;
		color: white;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
		font-weight: 700;
	}

	@media (max-width: 768px) {
		.video-header h1 {
		}
	}
</style>
