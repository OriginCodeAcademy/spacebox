'use-strict';

module.exports = app => {
  const {user, Role, RoleMapping} = app.models;
  user.findOrCreate(
    {
      where: {
        'username': process.env.DEFAULT_ADMIN_USERNAME,
      },
    },
    {
      'username': process.env.DEFAULT_ADMIN_USERNAME,
      'email': process.env.DEFAULT_ADMIN_EMAIL,
      'password': process.env.DEFAULT_ADMIN_PASSWORD,
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
