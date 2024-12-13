<script lang="ts">
	import { enhance } from '$app/forms';
import '../app.css';
	let { children, data } = $props();


</script>

<div class="w-full h-dvh grid place-items-center">
	<div class=" bg-base-200 artboard phone-2 rounded-md p-6">
		<div class="w-full flex justify-between">
			<form method="POST" use:enhance action="/">
				{#if data?.role !== 'anonym'}
					<button class="btn btn-xs btn-outline" formaction="/?/signout">Выход</button>
				{/if}
			</form>
		</div>
		{@render children()}
	</div>
</div>