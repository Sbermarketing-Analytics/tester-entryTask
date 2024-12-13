import {roles} from '$lib/roles'
import { depends } from '@chord-ts/rpc'


export async function load({cookies}) {
  const role = cookies.get('role') ?? 'anonym'
  return {
    allow: roles[role] ?? {},
    role
  }
}