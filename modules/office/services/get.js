const {
    DatabaseException,
    DataNotFoundException
} = require(process.cwd() + "/exceptions");

const Office = require(process.cwd()+"/models/office");

/**
 * Get Parent Work Offices
 */
exports.parentOffices = () => {
    return new Promise((resolve, reject) => {
        Office.find({ parent_code: null }, (err, offices) => {
            if (err) reject(new DatabaseException("Truy xuất tập cơ sở cấp 1. Lỗi cơ sở dữ liệu"));
            if (!offices.length) reject(new DataNotFoundException("Truy xuất tập cơ sở cấp 1. Không tìm thấy cơ sở nào trong hệ thống"));
            resolve(offices);
        });
    });
}

/**
 * Get Children Work Offices
 */
exports.childrenOffices = parent_code => {
    return new Promise((resolve, reject) => {
        Office.find({ parent_code }, (err, offices) => {
            if (err) reject(new DatabaseException("Truy xuất tập cơ sở con. Lỗi cơ sở dữ liệu"));
            if (!offices.length) reject(new DataNotFoundException("Truy xuất tập cơ sở con. Không tìm thấy cơ sở nào trong hệ thống"));
            resolve(offices);
        });
    });
}

/**
 * Get Detail Work Office
 */
exports.detailOffice = code => {
    return new Promise((resolve, reject) => {
        Office.findOne({ code }, (err, office) => {
            if (err) reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
            if (!office) reject(new DataNotFoundException("Không tìm thấy cơ sở này trong hệ thống"));
            resolve(office);
        });
    });
}