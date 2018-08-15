const { DatabaseException, DataNotFoundException } = require(process.cwd() +
  "/exceptions");

const Topic = require(process.cwd() + "/models/works/topic");
const Article = require(process.cwd() + "/models/works/article");
const Work = require(process.cwd() + "/models/works/work");

/**
 * Submit One Work
 */
exports.submitWork = workId => {
  return new Promise((resolve, reject) => {
    Work.findByIdAndUpdate(
      {
        _id: workId,
        status: { $gte: 0 },
        work_status: 1
      },
      { work_status: 3 },
      { new: true },
      (err, work) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!work)
          return reject(
            new DataNotFoundException("Không tìm thấy công trình hợp lệ")
          );
        resolve();
      }
    );
  });
};

/**
 * Open One Work
 */
exports.openWork = workId => {
  return new Promise((resolve, reject) => {
    let criterial = {
      _id: workId,
      status: { $gte: 1 },
      is_opened: { $ne: true },
      work_status: 0
    };
    console.log("criterial: ", criterial);

    let objUpdate = {
      is_opened: true
    };
    console.log('objUpdate: ', objUpdate);
    
    Work.findOneAndUpdate(criterial, objUpdate, { new: true }, (err, work) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!work)
        return reject(
          new DatabaseException(
            "Yêu cầu mở công trình thất bại, vui lòng thử lại"
          )
        );
      resolve(work.toObject());
    });
  });
};

/**
 * Update One Topic
 */
exports.editTopic = (topicId, topic) => {
  return new Promise((resolve, reject) => {
    let criterial = {
      _id: topicId,
      status: { $gte: 0 },
      is_deleted: { $ne: true },
      work_status: 1
    };
    topic.updated_date = new Date();

    Topic.findByIdAndUpdate(criterial, topic, { new: true }, (err, dbTopic) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!dbTopic)
        return reject(
          new DataNotFoundException(
            "Cập nhật đề tài thất bại, vui lòng cập nhật lại"
          )
        );
      resolve(dbTopic.toObject());
    });
  });
};

/**
 * Update One Article
 */
exports.editArticle = (articleId, article) => {
  return new Promise((resolve, reject) => {
    let criterial = {
      _id: articleId,
      status: { $gte: 1 },
      is_deleted: { $ne: true },
      work_status: 1
    };
    article.updated_date = new Date();

    Article.findOneAndUpdate(
      criterial,
      article,
      { new: true },
      (err, dbArticle) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!dbArticle)
          return reject(
            new DataNotFoundException(
              "Cập nhật bài báo thất bại, vui lòng cập nhật lại"
            )
          );
        resolve(dbArticle.toObject());
      }
    );
  });
};

/**
 * Push Article to Topic
 */
exports.pushToTopic = (topicId, articleId) => {
  return new Promise((resolve, reject) => {
    let criterial = {
      _id: topicId,
      status: { $gte: 0 },
      is_deleted: { $ne: true },
      work_status: 1
    };

    let objUpdate = {
      $push: { articles: articleId },
      updated_date: new Date()
    };
    Topic.findOneAndUpdate(
      criterial,
      objUpdate,
      { new: true },
      (err, dbTopic) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!dbTopic)
          return reject(
            new DataNotFoundException(
              "Thêm bài báo vào đề tài thất bại, vui lòng thử lại"
            )
          );
        resolve(dbTopic.toObject());
      }
    );
  });
};

/**
 * Push Article out Topic
 */
exports.deleteInTopic = (topicId, articleId) => {
  return new Promise((resolve, reject) => {
    let criterial = {
      _id: topicId,
      status: { $gte: 0 },
      is_deleted: { $ne: true },
      work_status: 1
    };

    let objUpdate = {
      $pull: { articles: articleId },
      updated_date: new Date()
    };
    Topic.findOneAndUpdate(
      criterial,
      objUpdate,
      { new: true },
      (err, dbTopic) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!dbTopic)
          return reject(
            new DatabaseException(
              "Xóa bài báo vào đề tài thất bại, vui lòng thử lại"
            )
          );
        resolve(dbTopic.toObject());
      }
    );
  });
};
