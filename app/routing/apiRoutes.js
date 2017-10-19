
var friendData = require('../data/friends.js');

module.exports = function (app) {
  app.get('/api/friends', function (req, res) {
    res.json(friendData);
  });

  app.post('/api/friends', function (req, res) {
    friendData.push(req.body);
    // req.body returns an object of the user's answers (i.e. what we send over in post)
    var curScore = req.body.score;
    var bestFriend = 0;
    var lowestScore = 40;

    for (var i = 0; i < (friendData.length - 1); i++) {
      var compScore = friendData[i].score;
      var totalDifference = 0;
      console.log('compscore:', compScore);

      for (var j = 0; j < curScore.length; j++) {
        var singleDifference = Math.abs(parseInt(curScore[j]) - compScore[j]);
        totalDifference = totalDifference + singleDifference;

        if (totalDifference < lowestScore) {
          lowestScore = totalDifference;
          bestFriend = i;

          console.log('totalDifference:', totalDifference);
          console.log('lowestScore:', lowestScore);
          console.log('bestFriend:', bestFriend);
        }
      }
    }

    res.send(friendData[bestFriend]);
  });
};
