<script>
	import { userGrid } from '@sudoku/stores/grid';
	import { cursor } from '@sudoku/stores/cursor';
	import { notes } from '@sudoku/stores/notes';
	import { settings } from '@sudoku/stores/settings';
	import { keyboardDisabled } from '@sudoku/stores/keyboard';
	import { gamePaused } from '@sudoku/stores/game';
	// 邱梓钿：增加import
	import { history, branchCount, canUndo, canRedo } from '@sudoku/stores/history';
	import { hints, numHintCandidate } from '@sudoku/stores/hints';
	import { candidates, candidatesClicked } from '@sudoku/stores/candidates';
    import { writable } from 'svelte/store';

	// 邱梓钿：修改提示的判断
	$: hintsAvailable = $settings.maxHintCandidate > 0;
	$: showNumHintCandidate = $numHintCandidate;

	// 邱梓钿：增加undo和redo的判断
    $: undoUnavailable = $gamePaused || !($canUndo);
    $: redoUnavailable = $gamePaused || !($canRedo);
	$: backtrackUnavailable = $gamePaused || !($branchCount > 0);
	$: showBranchCount = $branchCount;

	// 邱梓钿：修改提示函数
	function handleHint() {
		if (hintsAvailable) {
			userGrid.applyHint();
		}
	}

	//常鹏：获取获取点击的候选值
	$: if($candidatesClicked['isValid']) {
		if ($candidates.hasOwnProperty($cursor.x + ',' + $cursor.y)) {
			candidates.clear($cursor);
		}

		history.markBranch();//保存当前网格
		userGrid.set($cursor, $candidatesClicked['value']);
		candidatesClicked.set({'isValid':false, 'value':-1});
		undoUnavailable = $gamePaused || !($canUndo);
		redoUnavailable = $gamePaused || !($canRedo);
		backtrackUnavailable = $gamePaused || !($branchCount > 0);
		showBranchCount = $branchCount;
		if (hintsAvailable) {
			userGrid.applyHint(false);
		}
	}


	//常鹏：点击回溯
	function handleBacktrack(){
		userGrid.backtrack();
		if (hintsAvailable) {
			candidates.reset();
			userGrid.applyHint(false);
		}
	}
	
	// 邱梓钿：点击撤销
	function handleUndo(){
		userGrid.undo();
		if (hintsAvailable) {
			candidates.reset();
			userGrid.applyHint(false);
		}
	}

	// 邱梓钿：点击回退
	function handleRedo(){
		userGrid.redo();
		if (hintsAvailable) {
			candidates.reset();
			userGrid.applyHint(false);
		}
	}
</script>



<div class="action-buttons space-x-3">
	<!-- 常鹏：Backtrack回溯按钮 -->
	<button class="btn btn-round" disabled={backtrackUnavailable} title="Backtrack" on:click={handleBacktrack}>
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" 
				  d="M12 4a8 8 0 1 1-8 8h3l-4-4-4 4h3a10 10 0 1 0 10-10V4z" />
		</svg>

		{#if showBranchCount >= 0}
        <span class="branch-count">{showBranchCount}</span>
		{/if}
		<!-- 打印多个变量 -->
		<!-- <span>组合变量: {showBranchCount} 和 {$branchCount}</span> -->
	</button>
	
	
	<!-- 邱梓钿：增加on:click={undo} -->
	<button class="btn btn-round" disabled={undoUnavailable} title="Undo" on:click={handleUndo}>
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
		</svg>
	</button>

	<!-- 邱梓钿：增加on:click={redo} -->
	<button class="btn btn-round" disabled={redoUnavailable} title="Redo" on:click={handleRedo}>
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 90 00-8 8v2M21 10l-6 6m6-6l-6-6" />
		</svg>
	</button>

	<!-- 邱梓钿：修改判定条件 -->
	<button class="btn btn-round btn-badge" disabled={!hintsAvailable} on:click={handleHint} title="Hints ({$hints})">
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
		</svg>

		{#if hintsAvailable}
			<span class="badge" class:badge-primary={hintsAvailable}>{showNumHintCandidate}</span>
		{/if}
	</button>

	<!-- 常鹏：笔记 -->
	<!-- <button class="btn btn-round btn-badge" on:click={notes.toggle} title="Notes ({$notes ? 'ON' : 'OFF'})">
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
		</svg>

		<span class="badge tracking-tighter" class:badge-primary={$notes}>{$notes ? 'ON' : 'OFF'}</span>
	</button> -->
</div>


<style>
	.action-buttons {
		@apply flex flex-wrap justify-end items-end self-end;
	}

	.btn-badge {
		@apply relative;
	}

	.badge {
		min-height: 20px;
		min-width:  20px;
		@apply p-1 rounded-full leading-none text-center text-xs text-white bg-gray-600 inline-block absolute top-0 left-0;
	}

	.badge-primary {
		@apply bg-primary;
	}

	.btn {
        position: relative;
        /* 按钮样式 */
    }
	/* 常鹏：分支计数样式 */
    .branch-count {
        position: absolute;
        top: 0;
        right: 0;
        background-color: red;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
    }
</style>
