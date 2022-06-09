const functions = [
  {
    name: 'List Users',
    code: 'users.index',
    entity_code: 'USR',
    allowed_roles: ['administrator'],
  },
  {
    name: 'Create User',
    code: 'users.store',
    entity_code: 'USR',
    allowed_roles: ['administrator'],
  },
  {
    name: 'Show Single User',
    code: 'users.show',
    entity_code: 'USR',
    allowed_roles: ['administrator'],
  },
  {
    name: 'Update User',
    code: "users.update",
    entity_code: 'USR',
    allowed_roles: ['administrator'],
  },
  {
    name: 'List Accounts',
    code: 'accounts.index',
    entity_code: 'ACC',
    allowed_roles: ['administrator'],
  },
  {
    name: 'Create Account',
    code: 'accounts.store',
    entity_code: 'ACC',
    allowed_roles: ['administrator'],
  },
  {
    name: 'Show Single Account',
    code: 'accounts.show',
    entity_code: 'ACC',
    allowed_roles: ['administrator'],
  },
  {
    name: 'Update Account',
    code: 'accounts.update',
    entity_code: 'ACC',
    allowed_roles: ['administrator'],
  },
  {
    name: 'List Customers',
    code: 'customers.index',
    entity_code: 'CTM',
    allowed_roles: ['administrator'],
  },
  {
    name: 'Create Customer',
    code: 'customers.store',
    entity_code: 'CTM',
    allowed_roles: ['administrator'],
  },
  {
    name: 'Update Customer',
    code: 'customers.update',
    entity_code: 'CTM',
    allowed_roles: ['administrator'],
  },
  {
    name: 'List Roles',
    code: 'roles.index',
    entity_code: 'RLE',
    allowed_roles: ['administrator']
  },
  {
    name: 'Create Role',
    code: 'roles.store',
    entity_code: 'RLE',
    allowed_roles: ['administrator']
  },
  {
    name: 'Show Single Role',
    code: 'roles.show',
    entity_code: 'RLE',
    allowed_roles: ['administrator']
  },
  {
    name: 'Update Role',
    code: 'roles.update',
    entity_code: 'RLE',
    allowed_roles: ['administrator']
  }
]

export default functions;
