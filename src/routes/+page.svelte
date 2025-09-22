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
	import { geometrySchemas } from './geometry';

	// Example usage of the classes
	const sphere = new Surface(50, new SphereGeometry(100));
	const cylinder = new Surface(30, new CylinderGeometry(80, 120));
	const asphereterms = new StdAsphericTerms([0.01, 0.001, 0.0001]);
	const sphere2 = new Surface(20, new StandaradAsphereGeomtry(2005, 0.1, asphereterms));
	const optic1 = new Lens(25, 7, 'ZnSe', sphere, cylinder);
	const optic2 = new Lens(24, 3, 'CdTe', sphere2, sphere);

	// array of classes for Selection in UI
	let classList = [];
	classList.push(new PlaneGeometry(0, 0));
	classList.push(new SphereGeometry(22, 0.22));
	classList.push(new StandaradAsphereGeomtry(1, 2, asphereterms));
	classList.push(new CylinderGeometry(0, 111));
	classList.push(new AxiconGeometry(0.123));

	let schemaList = [];
	schemaList.push(geometrySchemas['plane']);
	schemaList.push(geometrySchemas['sphere']);
	schemaList.push(geometrySchemas['standard asphere']);
	schemaList.push(geometrySchemas['cylinder']);
	schemaList.push(geometrySchemas['axicon']);

	let geovalue = 0;

	// try creating a Dynamic Form for inputing geometry parameters
	// based on selected geometry type
	let geometryType: keyof typeof geometrySchemas = 'plane';
	console.log('Initial geometryType:', geometryType);

	function onUpdate(values: any) {
		console.log('Updated values:', values);
		// Handle the update
	}

	// let schema = geometrySchemas[geometryType];
	let schema = geometrySchemas[geometryType];

	let values = Object.fromEntries(
		Object.entries(schema).map(([key, field]) => [key, field.default])
	);

	$: onUpdate(values);
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

	<!-- third column allows Select option to display class inf0-->
	<div class="max-h-[60vh] min-w-0 flex-1 overflow-auto">
		Pick a Geometry
		<select class="mb-2" bind:value={geovalue}>
			{#each GEOMETRY_TYPES as geometry, index}
				<option value={index}>{geometry.label}</option>
			{/each}
		</select>
		<pre class="whitespace-pre"> Selected Geometry: {JSON.stringify(
				classList[geovalue],
				null,
				2
			)} </pre>
	</div>
</div>

<div class="w-100px mt-20 h-auto flex-row-reverse overflow-auto">
	<select
		class="order-2 mb-2 h-auto flex-1 border-amber-500 bg-amber-500 text-xl font-extrabold"
		bind:value={geovalue}
	>
		{#each GEOMETRY_TYPES as geometry, index}
			<option value={index}>{geometry.label}</option>
		{/each}
	</select>
	{#each Object.entries(schemaList[geovalue]) as [fieldName, fieldConfig]}
		<div class="w-100px mb-2 flex flex-row">
			<label for={fieldName} class="max-w-50px h-auto flex-shrink-0 p-2 text-left font-extrabold">
				{fieldConfig.label}
			</label>
			<input
				id={fieldName}
				class="ml-50px bg-white-500 h-auto max-w-50 flex-1 border border-gray-300 p-2"
				type={fieldConfig.type}
				bind:value={values[fieldName]}
			/>
		</div>
	{/each}
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
		background-color: lightblue;
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
