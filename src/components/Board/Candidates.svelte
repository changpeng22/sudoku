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
	{#if candidates.length === 1}
		<div class="single-candidate">
			{candidates[0]} <!-- 显示唯一候选值 -->
		</div>
	{:else}
		{#each CANDIDATE_COORDS as [row, col], value}
			<div
				class="candidate row-start-{row} col-start-{col}"
				class:invisible={!candidates.includes(value + 1)}
				class:visible={candidates.includes(value + 1)}
			>
				{value + 1} <!-- 显示候选值 -->
			</div>
		{/each}
	{/if}
</div>

<style>
	.candidate-grid {
		@apply grid h-full w-full p-1;
	}

	/* 常鹏：候选值背景色 */
	.candidate-grid {
		background-color: lightgreen; 
		pointer-events: painted;
	}

	.candidate {
		@apply h-full w-full row-end-auto col-end-auto leading-full;
		cursor: pointer; /* 鼠标指针样式 */
	}

	.candidate.invisible {
		display: block;
	}

	.candidate.visible {
		display: block;
		font-size: 1.2rem;
	}

	.single-candidate {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.2rem; /* 调整字体大小 */
		width: 100%;
		height: 100%;
		background-color: lightgreen; /* 示例背景色 */
		color:rgb(240, 243, 246);
}
</style>
