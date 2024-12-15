<script>
	// 常鹏：修改了原始的接收外部数独url的处理逻辑
	export let data = {};
	export let hideModal;
  
	let value = '';
	let isValid = false;
  
	// 处理输入框内容变化并实时验证
	function handleInput(event) {
	  value = event.target.value;
	  isValid = data.validate ? data.validate(value) : false; // 实时验证
	}
  
	// 点击按钮时的处理函数
	function handleButton() {
		console.log("常鹏",data.callback);
	  if (data.callback) data.callback(value); // 调用外部回调函数
	  hideModal(); // 隐藏模态框
	}
  </script>
  
  <h1 class="text-3xl font-semibold mb-5 leading-none">{data.title || 'Please enter something'}</h1>
  
  {#if data.text}
	<label for="prompt-input" class="text-lg mb-4">{data.text}</label>
  {/if}
  
  <!-- 输入框并监听input事件 -->
  <input
	class="input mb-5"
	id="prompt-input"
	name="prompt-input"
	class:font-mono={data.fontMono}
	bind:value
	type="text"
	on:input={handleInput} />
  
  <!-- 确认和取消按钮 -->
  <div class="flex justify-end">
	<button class="btn btn-small mr-3" on:click={hideModal}>Cancel</button>
	<button
	  class="btn btn-small btn-primary"
	 disabled={!isValid} 
	  on:click={handleButton}>
	  {data.button || 'Okay'}
	</button>
  </div>
  