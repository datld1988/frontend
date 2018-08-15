const _ = require("lodash");
const { InvalidDataException } = require(process.cwd() + "/exceptions");

/**
 * Calculate Topic
 */
exports.calculateTopic = topic => {
  let result;
  let { level, status } = topic;
  if (parseInt(status) <= 2) {
    result = getTopicPoint(parseInt(level), 0);
  } else if (parseInt(status) <= 4) {
    result = getTopicPoint(parseInt(level), 1);
  } else {
    result = getTopicPoint(parseInt(level), 2);
  }

  topic.all_point = result.totalPoint;
  topic.add_point = result.addPoint;
  topic.cochair = addPointToCochair(topic.cochair, result.cochairPoint);

  return topic;
};

/**
 * Calculate Article
 */
exports.calculateArticle = article => {
  let { article_kind, impact_factor } = article;
  let result = getArticlePoint(parseInt(article_kind), parseInt(impact_factor));

  article.all_point = result.totalPoint;
  article.add_point = result.addPoint;
  article.cochair = addPointToCochair(article.cochair, result.cochairPoint);

  return article;
};

/**
 * Clear Members Point In Topic
 */
exports.clearMemberPoint = members => {
  members = _.map(members, member => {
    member.point = 0;
    return member;
  });
  return members;
};

/**
 * Check Point Members Topic
 */
exports.checkPointMember = topic => {
  let totalMemberPoint = sumPoint(topic.members);
  if (totalMemberPoint > topic.add_point) {
    return new InvalidDataException("Số điểm cộng vượt quá số điểm còn dư");
  } else {
    return topic;
  }
};

/*********** Function *************/
function getTopicPoint(level, status) {
  let result = {
    totalPoint: 0,
    cochairPoint: 0
  };

  if (status == 2) {
    switch (level) {
      // cap nhà nước
      case 1:
        result.totalPoint = 210;
        result.cochairPoint = 105;
        break;
      // cap bộ
      case 2:
      case 3:
      case 4:
        result.totalPoint = 150;
        result.cochairPoint = 75;
        break;
      // cap co so
      case 5:
        result.totalPoint = 70;
        result.cochairPoint = 50;
        break;
    }
  } else if (status == 1) {
    switch (level) {
      // cap nhà nước
      case 1:
        result.totalPoint = 70;
        break;
      // cap bộ
      case 2:
      case 3:
      case 4:
        result.totalPoint = 50;
        break;
      // cap co so
      case 5:
        result.totalPoint = 0;
        break;
    }
    result.cochairPoint = result.totalPoint / 2;
  }

  result.addPoint = result.totalPoint - result.cochairPoint;
  return result;
}

function getArticlePoint(type, factor) {
  let result = {
    totalPoint: 0,
    addPoint: 0,
    cochairPoint: 0
  };

  switch (type) {
    case 1:
      if (factor > 3) {
        result.totalPoint = 210;
      } else {
        result.totalPoint = 150;
      }
      break;
    case 2:
      if (factor == 1) result.totalPoint = 70;
      if (factor == 0.75) result.totalPoint = 50;
      if (factor == 0.5) result.totalPoint = 35;
      break;
    case 3:
      result.totalPoint = 35;
      break;
  }

  result.cochairPoint = result.totalPoint;
  return result;
}

function addPointToCochair(cochairs, cochairPoint) {
  let point = cochairPoint / cochairs.length;
  cochairs = _.map(cochairs, cochair => {
    cochair.point = point;
    return cochair;
  });
  return cochairs;
}

function sumPoint(...args) {
  return args.reduce(function(result, item) {
    return result + item.point;
  }, 0);
}
