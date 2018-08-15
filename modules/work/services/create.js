const {
  DatabaseException,
  DataNotFoundException
} = require(process.cwd() + "/exceptions");

const Topic = require(process.cwd() + "/models/works/topic");
const Article = require(process.cwd() + "/models/works/article");

/**
 * Create One Topic
 */
exports.createTopic = topic => {
  return new Promise((resolve, reject) => {
    new Topic(topic).save((err, topic) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!topic) return reject(new DataNotFoundException("Khởi tạo đề tài thất bại, vui lòng tạo lại"));
      resolve(topic.toObject());
    });
  });
};

/**
 * Create One Article
 */
exports.createArticle = article => {
  return new Promise((resolve, reject) => {
    new Article(article).save((err, article) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!article) return reject(new DataNotFoundException("Khởi tạo bài báo thất bại, vui lòng tạo lại"));
      resolve(article.toObject());
    });
  });
};