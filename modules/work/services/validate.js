/* eslint-disable no-undef */
const { Language, Validator } = require("pinpoint-fw");
const {
  InvalidDataException,
  DatabaseException,
  DataNotFoundException
} = require(process.cwd() + "/exceptions");

const Work = require(process.cwd() + "/models/works/work");

//* Validate Create Going Topic
exports.createTopic = topic => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateTopic(topic);

    if (!validator.isValid()) {
      reject(
        new InvalidDataException(
          "Thông tin khởi tạo không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

//* Validate Create New Topic
exports.createNewTopic = topic => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateNewTopic(topic);

    if (!validator.isValid()) {
      reject(
        new InvalidDataException(
          "Thông tin khởi tạo không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

//* Validate Create A New Article
exports.createArticle = article => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateArticle(article);

    if (!validator.isValid()) {
      console.log("validator.getErrors(): ", validator.getErrors());
      reject(
        new InvalidDataException(
          "Thông tin khởi tạo không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

//* Validate Edit A Topic
exports.editTopic = topic => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateTopic(topic);

    if (!validator.isValid()) {
      reject(
        new InvalidDataException(
          "Thông tin cập nhật không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

//* Validate Create New Topic
exports.editNewTopic = topic => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateNewTopic(topic);

    if (!validator.isValid()) {
      reject(
        new InvalidDataException(
          "Thông tin cập nhật không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

//* Validate Edit An Article
exports.editArticle = article => {
  return new Promise((resolve, reject) => {
    //Validate data
    let validator = validateArticle(article);

    if (!validator.isValid()) {
      reject(
        new InvalidDataException(
          "Thông tin cập nhật không hợp lệ",
          validator.getErrors()
        )
      );
    } else {
      resolve();
    }
  });
};

//! ************* Support *************** !//
//* Check Author
exports.checkAuthor = (username, workId) => {
  return new Promise((resolve, reject) => {
    Work.findById(workId, (err, workDetail) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!workDetail || workDetail.is_deleted == true)
        return reject(
          new DataNotFoundException("Không có công trình trong hệ thống")
        );
      if (username != workDetail.author)
        return reject(
          new InvalidDataException(
            "Yêu cầu người dùng phải tác giả mới có quyền cập nhật thông tin đề tài"
          )
        );
      resolve();
    });
  });
};

//* Check Article
exports.checkArticle = workId => {
  return new Promise((resolve, reject) => {
    Work.findById(workId, (err, workDetail) => {
      if (err) return reject(new DatabaseException("Lỗi cơ sở dữ liệu"));
      if (!workDetail || workDetail.is_deleted == true)
        return reject(
          new DataNotFoundException("Không có công trình trong hệ thống")
        );
      if (workDetail.type != 2) {
        return reject(
          new InvalidDataException("Yêu cầu đối tượng phải là bài báo")
        );
      }
      resolve();
    });
  });
};

//? ************* Function *************** ?//
function validateTopic(topic) {
  let validator = new Validator();
  validator.ensure("name", topic.name, [
    ["Required", null, Language("NAME_REQUIRED")]
  ]);
  validator.ensure("goal_completion", topic.goal_completion, [
    ["Required", null, Language("GOAL_COMPLETION_REQUIRED")]
  ]);
  // validator.ensure("budget_source", topic.budget_source, [
  //   // ["Required", null, Language("BUDGET_SOURCE_REQUIRED")],
  //   ["Int", null, Language("BUDGET_SOURCE_INT")]
  // ]);
  // validator.ensure("total_cost", topic.total_cost, [
  //   ["Required", null, Language("TOTAL_COST_REQUIRED")],
  //   ["Int", null, Language("TOTAL_COST_INT")]
  // ]);
  // validator.ensure("unit_money", topic.unit_money, [
  //   ["Required", null, Language("UNIT_MONEY_REQUIRED")],
  //   ["Int", { gt: 0 }, Language("UNIT_MONEY_INT")]
  // ]);
  validator.ensure("research_area", topic.research_area, [
    ["Required", null, Language("RESEARCH_AREA_REQUIRED")],
    ["Int", { gt: 0 }, Language("RESEARCH_AREA_INT")]
  ]);
  validator.ensure("level", topic.level, [
    ["Required", null, Language("LEVEL_REQUIRED")],
    ["Int", { gt: 0 }, Language("LEVEL_INT")]
  ]);

  // validate for exist
  // validator.ensure("masoDeTai", topic.masoDeTai, [
  //   ["Required", null, Language("TOPIC_CODE_REQUIRED")]
  // ]);
  validator.ensure("org_impl", topic.org_impl, [
    ["Required", null, Language("ORG_IMPL_REQUIRED")]
  ]);
  validator.ensure("org_coo_impl", topic.org_coo_impl, [
    ["Required", null, Language("ORG_COO_IMPL_REQUIRED")]
  ]);
  validator.ensure("country_impl", topic.country_impl, [
    ["Required", null, Language("COUNTRY_IMPL_REQUIRED")]
  ]);
  // validator.ensure("receive_amount_year", topic.receive_amount_year, [
  //   // ["Required", null, Language("RECEIVE_AMOUNT_YEAR_REQUIRED")],
  //   ["Int", null, Language("RECEIVE_AMOUNT_YEAR_INT")]
  // ]);
  // validator.ensure("expected_date", topic.expected_date, [
  //   ["Required", null, Language("EXPECTED_REQUIRED")],
  //   ["Int", null, Language("EXPECTED_REQUIRED_INT")]
  // ]);
  // validator.ensure("over_date", topic.over_date, [
  //   ["Required", null, Language("OVER_DATE_REQUIRED")],
  //   ["Int", null, Language("OVER_DATE_INT")]
  // ]);

  // Remove for new
  // validator.ensure("end_date", topic.end_date, [
  //   ["Required", null, Language("END_DATE_REQUIRED")],
  //   ["Int", null, Language("END_DATE_INT")]
  // ]);
  // validator.ensure("ethical_assembly", topic.ethical_assembly, [
  //   ["Required", null, Language("ETHICAL_ASSEMBLY_REQUIRED")],
  //   ["Int", { gt: 0 }, Language("ETHICAL_ASSEMBLY_INT")]
  // ]);
  // validator.ensure("operating_amount", topic.operating_amount, [
  //   // ["Required", null, Language("OPERATING_AMOUNT_REQUIRED")],
  //   ["Int", null, Language("OPERATING_AMOUNT_INT")]
  // ]);
  // validator.ensure("rank", topic.rank, [
  //   ["Required", null, Language("RANK_REQUIRED")],
  //   ["Int", { gt: 0 }, Language("RANK_INT")]
  // ]);
  // validator.ensure("receive_amount", topic.receive_amount, [
  //   // ["Required", null, Language("RECEIVE_AMOUNT_REQUIRED")],
  //   ["Int", null, Language("RECEIVE_AMOUNT_INT")]
  // ]);
  // validator.ensure("review_date", topic.review_date, [
  //   ["Required", null, Language("REVIEW_DATE_REQUIRED")],
  //   ["Int", null, Language("REVIEW_DATE_INT")]
  // ]);
  validator.ensure("roles", topic.roles, [
    ["Required", null, Language("ROLES_REQUIRED")]
  ]);
  // validator.ensure("start_date", topic.start_date, [
  //   ["Required", null, Language("START_DATE_REQUIRED")],
  //   ["Int", null, Language("START_DATE_INT")]
  // ]);
  // validator.ensure("status", topic.status, [
  //   ["Required", null, Language("STATUS_REQUIRED")],
  //   ["Int", { gt: 0 }, Language("STATUS_INT")]
  // ]);
  // validator.ensure("technology_transfer", topic.technology_transfer, [
  //   ["Required", null, Language("TECHNOLOGY_TRANSFER_REQUIRED")]
  // ]);
  return validator;
}

function validateNewTopic(topic) {
  let validator = new Validator();
  validator.ensure("name", topic.name, [
    ["Required", null, Language("NAME_REQUIRED")]
  ]);
  validator.ensure("goal_completion", topic.goal_completion, [
    ["Required", null, Language("GOAL_COMPLETION_REQUIRED")]
  ]);
  validator.ensure("budget_source", topic.budget_source, [
    ["Required", null, Language("BUDGET_SOURCE_REQUIRED")],
    ["Int", { gt: 0 }, Language("BUDGET_SOURCE_INT")]
  ]);
  validator.ensure("total_cost", topic.total_cost, [
    // ["Required", null, Language("TOTAL_COST_REQUIRED")],
    ["Int", null, Language("TOTAL_COST_INT")]
  ]);
  validator.ensure("unit_money", topic.unit_money, [
    // ["Required", null, Language("UNIT_MONEY_REQUIRED")],
    ["Int", { gt: 0 }, Language("UNIT_MONEY_INT")]
  ]);
  validator.ensure("research_area", topic.research_area, [
    ["Required", null, Language("RESEARCH_AREA_REQUIRED")],
    ["Int", { gt: 0 }, Language("RESEARCH_AREA_INT")]
  ]);
  validator.ensure("level", topic.level, [
    ["Required", null, Language("LEVEL_REQUIRED")],
    ["Int", { gt: 0 }, Language("LEVEL_INT")]
  ]);
  validator.ensure("org_impl", topic.org_impl, [
    ["Required", null, Language("ORG_IMPL_REQUIRED")]
  ]);
  validator.ensure("org_coo_impl", topic.org_coo_impl, [
    ["Required", null, Language("ORG_COO_IMPL_REQUIRED")]
  ]);
  validator.ensure("country_impl", topic.country_impl, [
    ["Required", null, Language("COUNTRY_IMPL_REQUIRED")]
  ]);
  validator.ensure("month_perform", topic.month_perform, [
    ["Required", null, Language("MONTH_PERFORM_REQUIRED")],
    ["Int", null, Language("MONTH_PERFORM_INT")]
  ]);
  return validator;
}

function validateArticle(article) {
  let validator = new Validator();
  validator.ensure("article_kind", article.article_kind, [
    ["Required", null, Language("ARTICLE_KIND_REQUIRED")],
    ["Int", { gt: 0 }, Language("ARTICLE_KIND_INT")]
  ]);
  validator.ensure("name", article.name, [
    ["Required", null, Language("NAME_REQUIRED")]
  ]);
  validator.ensure("roles", article.roles, [
    ["Required", null, Language("ROLES_REQUIRED")]
  ]);
  validator.ensure("magazine_name", article.magazine_name, [
    ["Required", null, Language("MAGAZINE_NAME_REQUIRED")]
  ]);
  // validator.ensure("chapter", article.chapter, [
  //   ["Required", null, Language("CHAPTER_REQUIRED")],
  //   ["Int", {}, Language("CHAPTER_INT")]
  // ]);
  // validator.ensure("number", article.number, [
  //   ["Required", null, Language("NUMBER_REQUIRED")],
  //   ["Int", {}, Language("NUMBER_INT")]
  // ]);
  // validator.ensure("page", article.page, [
  //   ["Required", null, Language("PAGE_REQUIRED")],
  //   ["Int", {}, Language("PAGE_INT")]
  // ]);
  validator.ensure("publish_date", article.publish_date, [
    ["Required", null, Language("PUPBLISH_DATE_REQUIRED")],
    ["Int", { $gte: 1000, $lte: 9999 }, Language("PUPBLISH_DATE_INT")]
  ]);
  // validator.ensure("impact_factor", article.impact_factor, [
  //   ["Required", null, Language("IMPACT_FACTOR_REQUIRED")],
  //   ["Float", {}, Language("IMPACT_FACTOR_FLOAT")]
  // ]);
  // validator.ensure("isi_scopus", article.isi_scopus, [
  //   ["Required", null, Language("ISI_SCOPUS_REQUIRED")]
  // ]);
  // validator.ensure("doi", article.doi, [
  //   ["Required", null, Language("DOI_REQUIRED")]
  // ]);
  validator.ensure("summary", article.summary, [
    ["Required", null, Language("SUMMARY_REQUIRED")]
  ]);
  // validator.ensure("issn", article.issn, [
  //   ["Required", null, Language("ISSN_REQUIRED")]
  // ]);
  // validator.ensure("url", article.url, [
  //   ["Required", null, Language("URL_REQUIRED")]
  // ]);
  return validator;
}
