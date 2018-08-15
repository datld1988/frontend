const { DatabaseException } = require(process.cwd() + "/exceptions");

const Work = require(process.cwd() + "/models/works/work");

/**
 * Delete One Work
 */
exports.deleteWork = workId => {
  return new Promise((resolve, reject) => {
    let criterial = {
      _id: workId,
      status: { $gte: 1 },
      is_deleted: { $ne: true },
      work_status : 1
    };

    let objUpdate = {
      is_deleted: true,
      updated_date: new Date(),
      work_status: 3
    };
    Work.findOneAndUpdate(
      criterial,
      objUpdate,
      { new: true },
      (err, work) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!work)
          return reject(
            new DatabaseException("Xóa công trình thất bại, vui lòng thử lại")
          );
        resolve(work.toObject());
      }
    );
  });
};
