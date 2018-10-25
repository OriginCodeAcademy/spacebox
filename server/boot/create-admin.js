module.exports = (app) => {
  const { User, Role, Rolemapping } = this.app;
  User.findOrCreate(
    // Filter to find if DefaultAdmin already exists in DB
    {
      where: {
        'username': 'DefaultAdmin'
      }
    },
    // If filter doesn't return anything, create User in DB using this data
    {
      'username': 'DefaultAdmin',
      'email': 'default@admin.com',
      'password': 'admin'
    },
    // Find or create User's Role
    (err, user) => {
      if(err) console.log(err);
      Role.findOrCreate(
        // Filter to see if admin Role exists in DB        
        {
          where: {
            'name': 'admin'
          }
        },
        // If filter doesn't return anything, create Role admin in DB using this data
        {
          'name': 'admin'
        },
        // Find or create RoleMapping
        (err) => {
          if(err) console.log(err);
          Rolemapping.findOrCreate(
            // Filter to see if admin Role is in RoleMapping
            {
              where: {
                principalType: 'admin',
                principalId: user.id
              }
            },
            // If filter doesn't return anything, create RoleMapping for admin Role
            {
              principalType: 'admin',
              principalId: user.id
            },
            (err) => {
              if(err) console.log(err);
            }
          )
        }
      )
    }
  )
}
