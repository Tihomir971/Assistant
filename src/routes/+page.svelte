<script lang="ts">
	import { Button, Column, FormGroup, Grid, Row, Tile } from 'carbon-components-svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ location, weather } = data);

	const action = () => {
		//	toast.push('TOAST!', { classes: ['alert-success'] });
	};
</script>

<Grid>
	<Row padding noGutter>
		<!-- <Tile style="width: 100%; "> -->
		<Column>
			<Tile style="width: 100%;">
				<h5>You are in</h5>
				<FormGroup>
					<h1 style="font-weight: bold;">
						{location.region} ({location.country_name})
					</h1>
				</FormGroup>
				<div class="stat-actions">
					<Button on:click={action}>Yes I DO!</Button>
				</div>
			</Tile>
		</Column>
		<Column>
			<Tile style="width: 100%;">
				<h5>Temperature in {data.location.city}</h5>
				<FormGroup>
					<h1 style="font-weight: bold;">{data.weather.current_weather.temperature} ºC</h1>
				</FormGroup>
				<div class="stat-actions">
					<Button>i feel hot</Button>
					<Button>i feel cold</Button>
				</div>
			</Tile>
		</Column>
		<!-- </Tile> -->
	</Row>
</Grid>
