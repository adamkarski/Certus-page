<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import type { PageData } from './$types';

    export let data: PageData;
    const { machine, seo } = data;

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
    <title>{seo.title} | Certus Maszyny CNC</title>
    <meta name="description" content={seo.description} />
    <meta name="keywords" content={seo.keywords} />
    <link rel="canonical" href="https://yourwebsite.com{seo.url}" />

    <meta property="og:title" content="{seo.title} | Certus Maszyny CNC" />
    <meta property="og:description" content={seo.description} />
    <meta property="og:image" content="https://yourwebsite.com{seo.image}" />
    <meta property="og:url" content="https://yourwebsite.com{seo.url}" />
    <meta property="og:type" content="product" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{seo.title} | Certus Maszyny CNC" />
    <meta name="twitter:description" content={seo.description} />
    <meta name="twitter:image" content="https://yourwebsite.com{seo.image}" />
</svelte:head>

{#if showPreloader}
    <div class="seo-preloader">
        <div class="spinner"></div>
        <p>Ładowanie zawartości...</p>
    </div>
{:else}
    <div class="seo-content-container">
        <h1>{machine.title}</h1>
        <img src={machine.image} alt={machine.title} class="machine-seo-image" />
        
        {#if machine.seoImages && machine.seoImages.length > 0}
            <div class="seo-gallery-preview">
                <h2>Galeria {machine.title}</h2>
                <div class="seo-gallery-images">
                    {#each machine.seoImages as img}
                        <img src={img.src} alt={img.alt} />
                    {/each}
                </div>
                {#if machine.galleryId}
                    <p class="gallery-link">
                        <a href="/maszyny" on:click|preventDefault={() => window.location.href = `/maszyny#${machine.galleryId}`}>
                            Zobacz pełną galerię "{machine.title}" &rarr;
                        </a>
                    </p>
                {/if}
            </div>
        {/if}

        <!-- Render rich HTML content from longDescriptionHtml -->
        {@html machine.longDescriptionHtml}

        {#if machine.downloadLink}
            <div class="download-section">
                <h3>Pobierz dokumentację</h3>
                <p>
                    Szczegółowa specyfikacja techniczna dostępna w formacie PDF.
                    <a href={machine.downloadLink} download class="download-button">Pobierz PDF</a>
                </p>
            </div>
        {/if}

        {#if machine.internalLinks && machine.internalLinks.length > 0}
            <div class="internal-links">
                <h3>Sprawdź również:</h3>
                <ul>
                    {#each machine.internalLinks as link}
                        <li><a href={link.url}>{link.text}</a></li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
{/if}

<style lang="scss">
    .seo-preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: #333;
    }

    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #96a500;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin-bottom: 15px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .seo-content-container {
        padding: 20px;
        max-width: 800px;
        margin: 20px auto;
        font-family: sans-serif;
        line-height: 1.6;
        color: #333;

        h1, h2, h3 {
            color: #222;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }

        h1 {
            font-size: 2.5em;
            text-align: center;
        }

        h2 {
            font-size: 2em;
        }

        h3 {
            font-size: 1.5em;
        }

        p {
            margin-bottom: 1em;
        }

        ul {
            list-style: disc inside;
            margin-bottom: 1em;
            padding-left: 20px;
        }

        li {
            margin-bottom: 0.5em;
        }

        .machine-seo-image {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 20px auto;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .seo-gallery-preview {
            margin-top: 30px;
            text-align: center;
            h2 {
                margin-bottom: 15px;
            }
            .seo-gallery-images {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
                img {
                    max-width: 200px;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
            }
            .gallery-link {
                margin-top: 20px;
                a {
                    color: #96a500;
                    text-decoration: none;
                    font-weight: bold;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }

        .download-section, .internal-links {
            margin-top: 30px;
            padding: 15px;
            border-top: 1px solid #eee;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        
        .download-button {
            display: inline-block;
            background-color: #96a500;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;

            &:hover {
                background-color: darken(#96a500, 10%);
            }
        }

        .internal-links ul {
            list-style: none;
            padding: 0;
        }

        .internal-links a {
            color: #96a500;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
