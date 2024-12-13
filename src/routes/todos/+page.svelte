<script lang="ts">
	import {client} from '@chord-ts/rpc'
  import debounce from 'lodash.debounce'

	import type { Client } from './+server';
  import Todo from './Todo.svelte';
  

  let {data} = $props()

  let {allow, role} = data
  console.log(allow)

  const rpc = client<Client>({endpoint: '/todos'})
  let todos: Awaited<ReturnType<typeof rpc.TODO.all>> = $state([])

  async function loadData() {
    todos = await rpc.TODO.all()
  }

  const onupdate = debounce(async (todo) => {
    await rpc.TODO.update(todo)
  })

  const ondelete = async (todo) => {
    const deleted = await rpc.TODO.delete(todo)
    todos = todos.filter(t => deleted.id !== t.id)
  }

  async function create() {
    const todo = await rpc.TODO.create()
    console.log('add', todo)
    todos.push(todo)
  }

  

  $effect(() => {
    loadData()
  })

</script>

<div class="p-2">

</div>

<div class="flex flex-col items-center gap-2">
  {#each todos as todo, i}
    <Todo {allow} {...todo} {onupdate} {ondelete}/>
  {/each}
  <button class="btn btn-outline btn-sm" onclick={create}>+ Добавить</button>
</div>