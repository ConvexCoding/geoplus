<script lang="ts">
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';

	import { Lens } from './Lens';
	import { Surface } from './surface';
	import {
		SphereGeometry,
		StandaradAsphereGeomtry,
		CylinderGeometry,
		PlaneGeometry,
		AxiconGeometry
	} from './geometry';
	import { StdAsphericTerms } from './AsphericDefinition';
	import { GEOMETRY_TYPES } from './geometry';

	// Example usage of the classes
	const sphere = new Surface(50, new SphereGeometry(100));
	const cylinder = new Surface(30, new CylinderGeometry(80, 120));
	const somecoef = [0.01, 0.001, 0.0001];
	const asphereterms = new StdAsphericTerms(somecoef);
	const sphere2 = new Surface(20, new StandaradAsphereGeomtry(2005, 0.1, asphereterms));
	const optic1 = new Lens(25, 7, 'ZnSe', sphere, cylinder);
	const optic2 = new Lens(24, 3, 'CdTe', sphere2, sphere);
	let geovalue = 'sphere';

	function changeGeo(event: Event) {
		const selectElement = event.target as HTMLSelectElement;
		geovalue = selectElement.value;
	}
</script>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcomeFallback} alt="Welcome" />
			</picture>
		</span>
	</h1>

	<!-- <button aria-label="getclass" on:click={getclass}>Print Classes</button> -->
</section>

<!-- Parent must be row flex -->
<div class="mt-4 flex flex-row gap-6">
	<!-- First optic container -->
	<div class="max-h-[60vh] min-w-0 flex-1 overflow-auto">
		<pre class="whitespace-pre"> Optic 1:
      {JSON.stringify(optic1, null, 2)}
    </pre>
	</div>

	<!-- Second optic container -->
	<div class="max-h-[60vh] min-w-0 flex-1 overflow-auto">
		<pre class="whitespace-pre"> Optic 2:
      {JSON.stringify(optic2, null, 2)}
    </pre>
	</div>

	<div class="max-h-[60vh] min-w-0 flex-1 overflow-auto">
		Pick a Geometry
		<select on:change={changeGeo} class="mb-2">
			{#each GEOMETRY_TYPES as geometry}
				<option value={geometry.value}>{geometry.label}</option>
			{/each}
		</select>
		<pre class="whitespace-pre"> Selected Geometry:
			{#if geovalue === 'sphere'}
				{JSON.stringify(new SphereGeometry(22, 0.22), null, 2)}
			{:else if geovalue === 'plane'}
				{JSON.stringify(new PlaneGeometry(0, 0), null, 2)}
			{:else if geovalue === 'CylinderGeometry'}
				{JSON.stringify(new CylinderGeometry(0, 111), null, 2)}
			{:else if geovalue === 'StandaradAsphereGeomtry'}
				{JSON.stringify(new StandaradAsphereGeomtry(0, 0, asphereterms), null, 2)}
			{:else}
				{JSON.stringify(new AxiconGeometry(0.123), null, 2)}
			{/if}
		</pre>
	</div>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
