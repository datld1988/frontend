const { DatabaseException, DataNotFoundException } = require(process.cwd() +
  "/exceptions");

const File = require(process.cwd() + "/models/file");

/**
 * Delete One File
 */
exports.deleteById = fileId => {
  return new Promise((resolve, reject) => {
    File.findOneAndUpdate(
      { _id: fileId, type: 0 },
      { is_deleted: true },
      (err, file) => {
        if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
        if (!file)
          return reject(
            new DataNotFoundException("Không có file trong hệ thống")
          );
        resolve(file.toObject());
      }
    );
  });
};
