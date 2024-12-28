<!-- 钿哥增加history.js用于记录历史操作 -->
<script>
    import { resumeGame } from '@sudoku/game';
    import { modal } from '@sudoku/stores/modal';
	import { hasSolution } from '@sudoku/stores/grid';
    
    export const data = {};
	export let hideModal;
	
    function handleResumeGame() {
        resumeGame();
		hasSolution.set(true);
		hideModal();
    }
</script>

<div class="flex flex-col text-center items-center">
    <svg class="h-32 w-32 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    </svg>
    <h1 class="text-3xl font-semibold mb-6 leading-none">No solution!</h1>
    <button class="btn btn-small btn-primary mt-4" on:click={handleResumeGame}>Continue</button>
</div>