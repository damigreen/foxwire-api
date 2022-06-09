const triggers = [
  {
    name: 'User Registered',
    code: "user/created",
    entity_code: "USR",
  },
  {
    name: 'Reset User Password',
    code: "password/reset-code-generated",
    entity_code: "USR",
  },
  {
    name: 'Verify User Email',
    code: "email/verify-email",
    entity_code: "USR",
  },
  {
    name: 'Account Created',
    code: "account/created",
    entity_code: "ACC",
  },
  {
    name: 'Customer Created',
    code: "customer/created",
    entity_code: "CTM",
  },
]

export default triggers;
