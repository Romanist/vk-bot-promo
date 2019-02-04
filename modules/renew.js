async function renew(ctx) {
  console.log('renew start!')
  let contextScene = ctx.scene;
  let id = ctx.message.from_id;
  let promise = User.findOne({'id': id}, function (err, user) {
    if (err) {
      if(err.code == 11000) {
        return console.log('null here', null);
      }
      else {
        return console.log('error', null);
      }
    }
    if (!user) {
      let user = new User(
        {
          id: id,
          value: {},
          step: 0
        }
      );
      user.save(function (err) {
        if (err) {
          return next(err);
        }
      });
    } else {
      user.value = {};
      user.step = 0;
      user.save(function (err) {
          if(err) {
              console.error('ERROR!', err);
          }
      });
    }
  }).exec();
  promise.then(ctx => {
    console.log('renewed')
    contextScene.enter('meet', [0])
  }, err => {
    console.log('err', err)
  });
}

module.exports = renew;