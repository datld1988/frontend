exports.ABC = "Hello ${1}, welcome to ${2}";

//MAIN MODULE
exports.LOGIN_SUCCESS = "Đăng nhập thành công";
exports.REGISTER_SUCCESS = "Đăng ký thành công";

//MANAGE_WORK MODULE
exports.ALL_WORKS_SUCCESS = "Lấy thông tin công trình nghiên cứu thành công.";
exports.DENY_ACCESS_WORK = "Không có quyền truy cập vào công trình này";


//VALIDATE MESSAGES
// --> USER
exports.USERNAME_REQUIRED = "Vui lòng nhập email đăng nhập";
exports.USERNAME_VALIDATION = "Định dạng email không đúng";
exports.PASSWORD_REQUIRED = "Vui lòng nhập mật khẩu";
exports.NEW_PASSWORD_REQUIRED = "Vui lòng nhập mật khẩu mới";
exports.PASSWORD_LENGTH = "Mật khẩu phải có độ dài từ 6 - 32 kí tự";
exports.USER_TYPE_REQUIRED = "Chưa chọn loại người dùng";
exports.USER_TYPE_WRONG = "Loại người dùng không hợp lệ";
exports.WORK_ROLES_REQUIRED = "Chưa chọn cơ sở công tác";
exports.FAMILY_NAME_REQUIRED = "Vui lòng nhập họ";
exports.MIDDLE_NAME_REQUIRED = "Vui lòng nhập tên đệm";
exports.FIRST_NAME_REQUIRED = "Vui lòng nhập tên";
exports.FULL_NAME_REQUIRED = "Vui lòng nhập họ và tên";
exports.GENDER_REQUIRED = "Vui lòng chọn giới tính";
exports.GENDER_WRONG = "Giới tính không hợp lệ";
exports.BIRTHDAY_REQUIRED = "Vui lòng nhập ngày sinh nhật";
exports.BIRTHDAY_INT = "Định dạng của ngày sinh nhật không hợp lệ (dạng số)";
exports.ACADEMIC_RANK_REQUIRED = "Vui lòng nhập học hàm";
exports.ACADEMIC_RANK_INT = "Định dạng của học hàm không hợp lệ (dạng số)";
exports.DEGREE_REQUIRED = "Vui lòng nhập học vị";
exports.DEGREE_INT = "Định dạng của học vị không hợp lệ (dạng số)";
exports.MOBILE_REQUIRED = "Vui lòng nhập số điện thoại";
exports.ADDRESS_REQUIRED = "Vui lòng nhập địa chỉ";
exports.RESEARCH_AREA_REQUIRED = "Vui lòng nhập lĩnh vực nghiên cứu";
exports.RESEARCH_AREA_INT = "Định dạng của lĩnh vực nghiên cứu không hợp lệ (dạng số)";
exports.WP_NAME_REQUIRED = "Vui lòng nhập tên nơi công tác",

// --> WORK
exports.WORK_TYPE_REQUIRED = "Vui lòng chọn loại công trình (đề tài / bài báo)";
exports.WORK_TYPE_WRONG = "Loại công trình không hợp lệ";
exports.ROLES_REQUIRED = "Vui lòng nhập quyền truy cập";
exports.NAME_REQUIRED = "Vui lòng nhập tên";
exports.GOAL_COMPLETION_REQUIRED = "Vui lòng nhập mục tiêu hoàn thành";
exports.COCHAIR_REQUIRED = "Vui lòng nhập các chủ nhiệm";
exports.MEMBERS_REQUIRED = "Vui lòng nhập thành viên";
exports.STATUS_REQUIRED = "Vui lòng chọn tiến độ công việc";
exports.STATUS_INT = "Tiến độ công trình không hợp lệ";
exports.REVIEW_DATE_REQUIRED = "Vui lòng nhập năm xét duyệt";
exports.REVIEW_DATE_INT = "Năm xét duyệt không hợp lệ";
exports.START_DATE_REQUIRED = "Vui lòng nhập ngày bắt đầu";
exports.START_DATE_INT = "Ngày bắt đầu không hợp lệ";
exports.END_DATE_REQUIRED = "Vui lòng nhập ngày kết thúc";
exports.END_DATE_INT = "Ngày kết thúc không hợp lệ";
exports.BUDGET_SOURCE_REQUIRED = "Vui lòng chọn nguồn ngân sách";
exports.BUDGET_SOURCE_INT = "Nguồn ngân sách không hợp lệ";
exports.TOTAL_COST_REQUIRED = "Vui lòng nhập tổng chi phí";
exports.TOTAL_COST_INT = "Tổng chi phí không hợp lệ (phải là dạng số)";
exports.RECEIVE_AMOUNT_REQUIRED = "Vui lòng nhập Kinh phí đã nhận";
exports.RECEIVE_AMOUNT_INT = "Kinh phí đã nhận không hợp lệ (phải là dạng số)";
exports.OPERATING_AMOUNT_REQUIRED = "Vui lòng nhập Kinh phí đã sử dụng";
exports.OPERATING_AMOUNT_INT = "Kinh phí đã sử dụng không hợp lệ (phải là dạng số)";
exports.UNIT_MONEY_REQUIRED = "Vui lòng chọn đơn vị tiền tệ";
exports.UNIT_MONEY_INT = "Đơn vị tiền tệ không hợp lệ";
exports.RESEARCH_AREA_REQUIRED = "Vui lòng chọn lĩnh vực nghiên cứu";
exports.RESEARCH_AREA_INT = "Lĩnh vực nghiên cứu không hợp lệ";
exports.ETHICAL_ASSEMBLY_REQUIRED = "Vui lòng chọn trạng thái hội đồng đạo đức";
exports.ETHICAL_ASSEMBLY_INT = "Trạng thái hội đồng đạo đức không hợp lệ";
exports.LEVEL_REQUIRED = "Vui lòng chọn cấp độ đề tài";
exports.LEVEL_INT = "Định dạng cấp độ đề tài không hợp lệ";
exports.RANK_REQUIRED = "Vui lòng chọn xếp loại đề tài";
exports.RANK_INT = "Định dạng xếp loại đề tài không hợp lệ";
exports.TECHNOLOGY_TRANSFER_REQUIRED = "Vui lòng chọn trạng thái công nghệ chuyển giao";
exports.TECHNOLOGY_TRANSFER_INT = "Định dạng trạng thái công nghệ chuyển giao không hợp lệ";
exports.DECIDED_WORKS_REQUIRED = "Vui lòng chọn quyết định đề tài";
exports.DECIDED_WORKS_INT = "Định dạng quyết định đề tài không hợp lệ";
exports.ARTICLE_KIND_REQUIRED = "Vui lòng chọn loại bài báo";
exports.ARTICLE_KIND_INT = "Định dạng chọn loại bài báo không hợp lệ";
exports.MAGAZINE_NAME_REQUIRED = "Vui lòng nhập tên tạp chí";
exports.CHAPTER_INT = "Định dạng tập bài báo không hợp lệ";
exports.CHAPTER_REQUIRED = "Vui lòng nhập tập bài báo";
exports.NUMBER_REQUIRED = "Vui lòng nhập số bài báo";
exports.NUMBER_INT = "Định dạng số bài báo không hợp lệ";
exports.PAGE_REQUIRED = "Vui lòng nhập trang bài báo";
exports.PAGE_INT = "Định dạng trang bài báo không hợp lệ";
exports.PUPBLISH_DATE_REQUIRED = "Vui lòng nhập năm công bố";
exports.PUPBLISH_DATE_INT = "Định dạng năm công bố không hợp lệ";
exports.IMPACT_FACTOR_REQUIRED = "Vui lòng nhập điểm";
exports.IMPACT_FACTOR_FLOAT = "Định dạng điểm không hợp lệ";
exports.ISI_SCOPUS_REQUIRED = "Vui lòng chọn tạp chí ISI hoặc SCOPUS";
exports.ISI_SCOPUS_INT = "Định dạng tạp chí ISI hoặc SCOPUS không hợp lệ";
exports.KEYWORD_REQUIRED = "Vui lòng nhập từ khóa";
exports.SUMMARY_REQUIRED = "Vui lòng nhập tóm tắt";
exports.DOI_REQUIRED = "Vui lòng nhập DOI";
exports.ISSN_REQUIRED = "Vui lòng nhập ISSN";
exports.URL_REQUIRED = "Vui lòng nhập URL";
exports.TOPIC_CODE_REQUIRED = "Vui lòng nhập mã số đề tài";
exports.ORG_IMPL_REQUIRED = "Vui lòng nhập tổ chức chủ trì thực hiện";
exports.ORG_COO_IMPL_REQUIRED = "Vui lòng nhập tổ chức phối hợp thực hiện";
exports.COUNTRY_IMPL_REQUIRED = "Vui lòng nhập nước phối hợp thực hiện";
exports.RECEIVE_AMOUNT_YEAR_REQUIRED = "Vui lòng nhập năm chuyển tiền";
exports.RECEIVE_AMOUNT_YEAR_INT = "Định dạng năm chuyển tiền không hợp lệ";
exports.EXPECTED_REQUIRED = "Vui lòng nhập thời gian dự kiến nghiệm thu";
exports.EXPECTED_REQUIRED_INT = "Định dạng thời gian dự kiến nghiệm thu không hợp lệ";
exports.OVER_DATE_REQUIRED = "Vui lòng nhập thời gian gia hạn";
exports.OVER_DATE_INT = "Định dạng thời gian gia hạn không hợp lệ";
exports.MONTH_PERFORM_REQUIRED = "Vui lòng nhập số tháng thực hiện";
exports.MONTH_PERFORM_INT = "Định dạng số tháng thực hiện không hợp lệ";
exports.WORK_PARENT_REQUIRED = "Vui lòng nhập đề tài cha";

// ACTIVITY
exports.DESCRIPTION_REQUIRED = "Vui lòng nhập nội dung miêu tả";

/**
 * Exception messages
 * 
 * 1. AUTH MESSAGES
 * 2. DATABASE MESSAGES
 * 3. DATA MESSAGES
 */
exports.UNDEFINED_EXCEPTION = "Lỗi không xác định!";
// 1. AUTH MESSAGES
exports.INVALID_TOKEN = "Token không hợp lệ hoặc đã hết hạn";
exports.WRONG_USER_OR_PASSWORD_EXCEPTION = "Tài khoản hoặc mật khẩu không đúng, vui lòng kiểm tra lại";
exports.AUTHORIZATION_EXCEPTION = "Truy cập bị từ chối, bạn không có quyền truy cập chức năng này";
exports.NOT_ACTIVED_EXCEPTION = "Tài khoản researcher chưa được active";
exports.BANNED_EXCEPTION = "Tài khoản bị khóa";
exports.HOMELESS_EXCEPTION = "Tài khoản bị kick khỏi cơ sở cấp 1";

// 2. DATABASE MESSAGES
exports.UNDEFINED_DATABASE_EXCEPTION = "Kết nối đến cơ sở dữ liệu bị gián đoạn";

//3. DATA MESSAGES
exports.INVALID_DATA_EXCEPTION = "Dữ liệu truyền lên không hợp lệ";
exports.EXISTED_DATA_EXCEPTION = "Dữ liệu đã tồn tại trong hệ thống (không thể save)";
exports.DATA_NOT_FOUND_EXCEPTION = "Không tìm thấy dữ liệu trong hệ thống";
exports.DENY_ACCESS_DATA_EXCEPTION = "Từ chối truy cập dữ liệu trong hệ thống";