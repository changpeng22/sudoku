<script>
	import { CANDIDATE_COORDS } from '@sudoku/constants';
	import { candidatesClicked } from '@sudoku/stores/candidates';
	
	export let candidates = [];

	// 常鹏：候选值点击的回调函数
	function handleCandidateClick(row, col, value) {
		//常鹏：单元格中的行/列和点击的值
	  candidatesClicked.set({'isValid':true,'value':value});
	}
  </script>
  
  <div class="candidate-grid">
	{#each CANDIDATE_COORDS as [row, col], value}
	  <div class="candidate row-start-{row} col-start-{col}"
	  	class:invisible={!candidates.includes(value + 1)}
		class:visible={candidates.includes(value + 1)}  
		   on:click={()=>{handleCandidateClick(row, col,value+1)}}>
		{value + 1} <!-- 常鹏：显示候选值 -->
	  </div>
	{/each}
  </div>
  
  <style>
	.candidate-grid {
	  @apply grid h-full w-full p-1;
	}
  
	.candidate {
	  @apply h-full w-full row-end-auto col-end-auto leading-full;
	  cursor: pointer; /* 添加鼠标指针样式 */
	}
  
	.candidate.invisible {
	  display: none;
	}
  
	.candidate.visible {
	  display: block;
	}
  </style>
  