export const admins = [
  'admin@growcode.com',
]

export const employees = [
  'jane@employees.growcode.com',
  'joe@employees.growcode.com',
]

export function getRoleByEmail(email: string): 'admin' | 'employee' | null {
  const e = email.trim().toLowerCase()
  if (admins.includes(e)) return 'admin'
  if (employees.includes(e)) return 'employee'
  return null
}
