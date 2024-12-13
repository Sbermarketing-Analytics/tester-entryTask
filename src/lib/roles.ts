export const roles = {
  admin: {
    tasks: {
      create: true,
      edit: true,
      delete: true,
      check: true,
    },
  },

  manager: {
    tasks: {
      delete: false,
      create: true,
      edit: true,
      check: true,
    },
  },

  reader: {
    tasks: {
      create: false,
      delete: false,
      edit: false,
      check: true,
    },
  }
}