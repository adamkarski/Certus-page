<script lang="ts">

import { onMount } from 'svelte';
    import { browser } from '$app/environment';
import type { PageData } from './$types';
	import Section_Header from "../../../../components/sections/Section_Header.svelte";
	import Section_Footer from "../../../../components/sections/Section_Footer.svelte";
  
	export let data: PageData;
	const { machine, category } = data;

	let showPreloader = false;


	onMount(() => {
	 if (browser) {
		showPreloader = true;
		setTimeout(() => {
			window.location.href = '/maszyny'; // Redirect to the main machines page
		}, 1500); // 1.5 second delay for preloader
	} 
});




</script>

<svelte:head>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<div class="app">
	<Section_Header />
	<main class="machine-details-page">
		<div class="container">
			<h1>{machine.name}</h1>
			<p class="category-name">Kategoria: {category.title}</p>
			<img src={machine.image} alt={machine.name} class="machine-image" />
			<div class="description">
				<p>{machine.short_description}</p>
			</div>
			<a href="/maszyny#{machine.id}" class="back-link">&laquo; Wróć do pełnej listy maszyn</a>
		</div>
	</main>
	<Section_Footer />
</div>

<style>
	.machine-details-page {
		padding: 4rem 1rem;
		background: #f4f4f4;
		padding-top: 200px;

	}
	.container {
		max-width: 900px;
		margin: 0 auto;
		background: #fff;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
	}
	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		color: #333;
	}
	.category-name {
		font-size: 1.1rem;
		color: #777;
		margin-bottom: 2rem;
	}
	.machine-image {
		width: 100%;
		max-width: 500px;
		height: auto;
		margin: 0 auto 2rem auto;
		display: block;
		border-radius: 4px;
	}
	.description {
		font-size: 1.1rem;
		line-height: 1.7;
		color: #555;
		margin-bottom: 2rem;
	}
	.back-link {
		display: inline-block;
		font-size: 1rem;
		color: var(--color-primary);
		text-decoration: none;
		transition: color 0.3s;
	}
	.back-link:hover {
		color: var(--color-primary-dark);
		text-decoration: underline;
	}
</style>
