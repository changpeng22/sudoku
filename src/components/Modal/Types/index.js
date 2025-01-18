import share from './Share.svelte';
import qrcode from './QRCode.svelte';
import settings from './Settings.svelte';
import confirm from './Confirm.svelte';
import prompt from './Prompt.svelte';
import welcome from './Welcome.svelte';
import gameover from './GameOver.svelte';
// 邱梓钿：增加导入无解情况的组件
import nosolution from './NoSolution.svelte';

export default {
	share,
	qrcode,
	settings,
	confirm,
	prompt,
	welcome,
	gameover,
	nosolution
}