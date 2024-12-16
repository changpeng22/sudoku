<script>
	import { candidates } from '@sudoku/stores/candidates';
	import { userGrid } from '@sudoku/stores/grid';//userGrid是当前的网格
	import { cursor } from '@sudoku/stores/cursor';
	import { hints } from '@sudoku/stores/hints';
	import { notes } from '@sudoku/stores/notes';
	import { settings } from '@sudoku/stores/settings';
	import { keyboardDisabled } from '@sudoku/stores/keyboard';
	import { gamePaused } from '@sudoku/stores/game';
	$: hintsAvailable = $hints > 0;

	function handleHint() {
		if (hintsAvailable) {
			if ($candidates.hasOwnProperty($cursor.x + ',' + $cursor.y)) {
				candidates.clear($cursor);
			}

			userGrid.applyHint($cursor);
		}
	}

	
	//常鹏：点击分支事件
	let branchCount = 0; // 追踪分支计数
	function handleNewBranch() {
		//TODO: 接收一个点击分支的信号，然后保存当前的网格，当 Restart 按钮被点击时，将当前的网格恢复到保存的网格
		let stepIdx = branchCount++;//需要保存的分支索引
		userGrid.saveGrid(stepIdx);//保存当前网格
	}

	//常鹏：点击回溯
	function handleRestart(){
		//TODO: 接收一个点击分支的信号，然后恢复到上一步的网格,返回对应的undo idx
		branchCount--;
		let stepIdx = userGrid.recallGrid(); // 恢复网格到用户网格
		console.log("stepIdx",stepIdx);
	}
	
</script>



<div class="action-buttons space-x-3">

	<button class="btn btn-round" disabled={$gamePaused} title="分支" on:click={handleNewBranch}>
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" 
				  d="M12 4a8 8 0 1 1-8 8h3l-4-4-4 4h3a10 10 0 1 0 10-10V4z" />
		</svg>
	</button>

	<!-- 常鹏：Restart回溯按钮 -->
	<button class="btn btn-round" disabled={$gamePaused || branchCount <= 0} title="Restart" on:click={handleRestart}>
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" 
				  d="M12 4a8 8 0 1 1-8 8h3l-4-4-4 4h3a10 10 0 1 0 10-10V4z" />
		</svg>

		{#if branchCount >= 0}
        <span class="branch-count">{branchCount}</span>
    	{/if}
	</button>
	
	
	<!-- 常鹏：上一步 -->
	<button class="btn btn-round" disabled={$gamePaused} title="Undo">
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
		</svg>
	</button>

	<!-- 常鹏：下一步 -->
	<button class="btn btn-round" disabled={$gamePaused} title="Redo">
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 90 00-8 8v2M21 10l-6 6m6-6l-6-6" />
		</svg>
	</button>

	<!-- 常鹏：提示 -->
	<button class="btn btn-round btn-badge" disabled={$keyboardDisabled || !hintsAvailable || $userGrid[$cursor.y][$cursor.x] !== 0} on:click={handleHint} title="Hints ({$hints})">
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
		</svg>

		{#if $settings.hintsLimited}
			<span class="badge" class:badge-primary={hintsAvailable}>{$hints}</span>
		{/if}
	</button>
	<!-- 常鹏：笔记 -->
	<button class="btn btn-round btn-badge" on:click={notes.toggle} title="Notes ({$notes ? 'ON' : 'OFF'})">
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
		</svg>

		<span class="badge tracking-tighter" class:badge-primary={$notes}>{$notes ? 'ON' : 'OFF'}</span>
	</button>
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
