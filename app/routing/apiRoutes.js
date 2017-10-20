
var friendData = require('../data/friends.js');

module.exports = function (app) {
  app.get('/api/friends', function (req, res) {
    res.json(friendData);
  });

  app.post('/api/friends', function (req, res) {
    friendData.push(req.body);

    var curScore = req.body.score;
    var bestFriend = 0;
    var lowestScore = 40;

    for (var i = 0; i < (friendData.length - 1); i++) {
      var compScore = friendData[i].score;
      var totalDifference = 0;

      for (var j = 0; j < curScore.length; j++) {
        var singleDifference = Math.abs(parseInt(curScore[j]) - parseInt(compScore[j]));
        totalDifference = totalDifference + singleDifference;
      }

      if (totalDifference < lowestScore) {
        lowestScore = totalDifference;
        bestFriend = i;
      }
    }

    res.send(friendData[bestFriend]);
  });
};
