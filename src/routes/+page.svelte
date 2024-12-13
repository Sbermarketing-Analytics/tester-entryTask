<script>
	import { enhance } from '$app/forms';

  let {form} = $props()

	let mode = $state('signin');
</script>

{#if mode === 'signin'}
	<form method="POST" use:enhance class="flex flex-col items-center gap-2 pt-20" action="/">
		<h2 class="text-3xl">Вход</h2>
		<input
			class="input input-sm input-bordered w-full"
			name="username"
			placeholder="Пользователь"
		/>
		<input class="input input-sm input-bordered w-full" type="password" name="password" placeholder="Пароль" />
		<button class="btn btn-primary btn-sm w-full" formaction="?/signin">Войти</button>
		<button
			onclick={() => (mode = 'signup')}
			class="btn btn-outline btn-primary btn-sm w-full
  ">Зарегистрироваться</button
		>
	</form>
{:else}
	<form method="POST" use:enhance class="flex flex-col items-center gap-2 pt-20">
		<h2 class="text-3xl">Регистрация</h2>
		<input
			class="input input-sm input-bordered w-full"
			name="username"
			placeholder="Пользователь"
		/>
		<input class="input input-sm input-bordered w-full" type="password" name="password" placeholder="Пароль" />
		<button class="btn btn-primary btn-sm w-full" formaction="?/signup">Зарегистрироваться</button>
		<button class="btn btn-outline btn-primary btn-sm w-full" onclick={() => (mode = 'signin')}
			>Войти</button
		>
	</form>
{/if}
{#if form?.msg}
  <p class="text-error mt-2">{form.msg}</p>
{/if}
