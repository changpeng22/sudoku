<script>
	import ActionBar from './ActionBar/index.svelte';
	import Keyboard from './Keyboard.svelte';
	import HintStrategy from './HintStrategy.svelte';
</script>

<div class="px-4 pb-5 flex justify-center">
	<div class="w-full max-w-xl">
		<HintStrategy/>
		
		<ActionBar />

		<Keyboard />
	</div>
</div>