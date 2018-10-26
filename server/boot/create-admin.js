'use-strict';

module.exports = app => {
  const {user, Role, RoleMapping} = app.models;
  user.findOrCreate(
    {
      where: {
        'username': 'DefaultAdmin',
      },
    },
    {
      'username': 'DefaultAdmin',
      'email': 'default@admin.com',
      'password': 'admin',
    },
    (err, user) => {
      if (err) console.log(err);
      Role.findOrCreate(
        {
          where: {
            'name': 'admin',
          },
        },
        {
          'name': 'admin',
        },
        (err) => {
          if (err) console.log(err);
          RoleMapping.findOrCreate(
            {
              where: {
                principalType: 'admin',
                principalId: user.id,
              },
            },
            {
              principalType: 'admin',
              principalId: user.id,
            },
            (err) => {
              if (err) console.log(err);
            }
          );
        }
      );
    }
  );
};
