<script>
	import { CANDIDATE_COORDS } from '@sudoku/constants';

	export let candidates = [];
	let showBgcolor = false;

	// 常鹏：检查是否有至少一个候选值可见
	$: showBgcolor = CANDIDATE_COORDS.some(([row, col], value) =>
		candidates.includes(value + 1)
	);
</script>

<div class:candidate-grid={showBgcolor}>
	{#each CANDIDATE_COORDS as [row, col], value}
		<div
			class="candidate row-start-{row} col-start-{col}"
			class:invisible={!candidates.includes(value + 1)}
			class:visible={candidates.includes(value + 1)}
		>
			{value + 1} <!-- 显示候选值 -->
		</div>
	{/each}
</div>

<style>
	.candidate-grid {
		@apply grid h-full w-full p-1;
	}

	/* 常鹏：候选值背景色 */
	.candidate-grid {
		background-color: lightgreen; 
	}

	.candidate {
		@apply h-full w-full row-end-auto col-end-auto leading-full;
		cursor: pointer; /* 鼠标指针样式 */
	}

	.candidate.invisible {
		display: none;
	}

	.candidate.visible {
		display: block;
	}
</style>
