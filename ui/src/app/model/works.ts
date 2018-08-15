export class Cochair {
    username: string;
    fullname: string;
    point: number;
    email: string;
    type: number; // 0: On Sys   1: Non Sys
    id: number;
    gender: number;
    linkAvar: string;
}

export class Statitics {
    view_number: number;
    update_number: number;
}

export class Follower {
    username: number;
    fullname: number;
}

export class Member {
    username: string;
    fullname: string;
    point: number;
    email: string;
    type: number; // 0: On Sys   1: Non Sys
    id: number;
    gender: number;
    linkAvar: string;
}

export class Operation {
    _id: string;
    description: string;
    work_id: string;
    username: string;
    fullname: string;
    created: Date;
}

export class Files {
    _id: string;
    created: Date;
    filename: string;
    description: string;
    work_id: string;
    file_url: string;
    data: any;
}

export class RolesContent {
    name: string;
    value: boolean;
}

export class Work {
    // NEW properties
    masoDeTai: string;  // Mã số đề tài
    org_impl: string;   // Tổ chức chủ trì thực hiện
    org_coo_impl: string; // Tổ chức phối hợp thực hiện
    country_impl: string; // Nước phối hợp thực hiện
    receive_amount_year: number;  // Năm chuyển tiền
    expected_date: number;  // Thời gian dự kiến nghiệm thu
    over_date: number;  // Thời gian gia hạn

    ethical_assembly_date:string;  // Số, ngày/tháng/năm bản chấp thuận
    ethical_assembly_date_meeting:number;  // Ngày họp HĐ Đạo đức (Quy trình đầy đủ)
    ethical_assembly_member:string;  // Các thành viên HĐ tham dự
    ethical_assembly_date_summary:number; // Ngày tổng hợp biên bản góp ý (quy trình đầy đủ)
    ethical_assembly_comment:string;  // Ủy viên nhận xét

    decided_works: number // quyết định đề tài
    decided_works_approval: string;  // Số Quyết định phê duyệt đề tài
    decided_works_approval_date: number;  // Ngày ký quyết định
    decided_works_approval_level: string;  // Cấp quyết định

    decided_works_acceptance: string;  // Số Quyết định nghiệm thu đề tài
    decided_works_acceptance_date: number;  // Ngày ký quyết định nghiệm thu
    decided_works_acceptance_level: string;  // Cấp quyết định nghiệm thu

    decided_works_acceptance_off: string;  // Số Quyết định công nhận kết quả nghiệm thu của các cơ sở khác
    decided_works_acceptance_off_date: number;  // Ngày ký quyết định
    decided_works_acceptance_off_level: string; // Cấp quyết định

    ///  Nhập thông tin sản phẩm giáo dục
    product_edu_dh: number;  // Số lượng ĐH
    product_edu_ths: number;  // Số lượng ThS
    product_edu_cki: number;  // Số lượng CKI
    product_edu_ckii: number;  // Số lượng CKII
    product_edu_ts: number;  // Số lượng TS
    product_edu_nt: number;  // Số lượng Bác sỹ Nội trú
    product_edu_other: number; // Số lượng Khác

    // Nhập thông tin sản phẩm khoa học
    product_science_cd: number;  // Số lượng chuyên đề
    product_science_qt: number; // Số lượng Quy trình
    product_science_bb: number; // Số lượng Bài báo
    product_science_sa: number; // Số lượng Sách
    product_science_other: number; // Số lượng Khác

    month_perform: number;  // Số tháng thực hiện.    

    work_parent: string[];  // Đề tài cha. là danh sách String  VD:  work_parent: ['idDetai', '' Ten de tai]

    work_status: number;

    is_opened: boolean;

    _id: string;
    share_works: number; // chia sẻ đề tài
    files = new Array<Files>();

    roles: Object;
    cochairNonInSystem = new Array<Cochair>();
    memberNonInSystem = new Array<Member>();
    name: string;
    work_roles: string[];
    type: number;
    role_type: number;
    all_point: number;
    add_point: number;
    author: string;
    author_fullname: string;
    cochair = new Array<Cochair>();
    research_area: number;
    statitics: Statitics;
    followers: Follower[];
    goal_completion: string;
    articles: string[];
    members = new Array<Member>();
    status: number;
    progress: number;
    review_date: number;
    start_date: number;
    end_date: number;
    budget_source: number;
    total_cost: number;
    receive_amount: number;
    operating_amount: number;
    unit_money: number;
    ethical_assembly: number;
    
    level: number;
    rank: number;
    technology_transfer: string;
    article_kind: number;
    magazine_name: string;
    chapter: number;
    number: number;
    page: number;
    publish_date: number;
    impact_factor: number;
    isi_scopus: string[];
    doi: string;
    keyword: string[];
    summary: string;
    created_date: Date;
    operations = new Array<Operation>();
    number_author: number;
    issn: string;
    url: string;
}

