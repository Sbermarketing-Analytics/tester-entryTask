<script>
	import Icon from '@iconify/svelte';
	let { allow, title = $bindable('task'), done = $bindable(false), id, onupdate, ondelete } = $props();

	$effect(() => {
		onupdate({ title, done: +done, id });
	});
</script>

<div class="flex w-full items-center justify-center gap-2">
	<button class="btn btn-outline btn-error btn-square btn-xs" 
		disabled={!allow.tasks?.del}
		onclick={() => ondelete({ title, done, id })}
		><Icon icon="basil:trash-outline" /></button
	>
	<input disabled={!allow.tasks?.edit}	class="input input-sm input-bordered w-4/5" bind:value={title} />
	<input disabled={!allow.tasks?.check} type="checkbox" class="checkbox-primary checkbox" bind:checked={done} />
</div>
