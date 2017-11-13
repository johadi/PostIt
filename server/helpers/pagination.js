import constants from './constants';
/**
 * Helper function to get limit and offset for pagination
 * @function paginateResult
 * @param {object} req
 * @return {object} offset and limit for pagination
 */
const paginateResult = (req) => {
  let limit;
  let offset;

  if (req.query.limit) {
    limit = isNaN(parseInt(req.query.limit, 10)) || req.query.limit < 0 ?
      constants.DEFAULT_ITEMS_PER_PAGE : parseInt(req.query.limit, 10);
  } else {
    limit = constants.DEFAULT_ITEMS_PER_PAGE;
  }

  if (req.query.offset) {
    offset = isNaN(parseInt(req.query.offset, 10)) || req.query.offset < 0 ?
      0 : parseInt(req.query.offset, 10);
  } else {
    let page;
    if (req.query.page) {
      page = isNaN(parseInt(req.query.page, 10)) || req.query.page < 1 ?
        1 : parseInt(req.query.page, 10);
    } else {
      page = 1;
    }
    offset = limit * (page - 1);
  }
  // convert the query to standard number for use
  // Let the page query default to one if user never passes page query
  // const pageQuery = parseInt(page, 10) || 1;
  // // limit you want to display per page
  // const limit = itemsPerPage;
  // const currentPage = pageQuery < 1 ? 1 : pageQuery;
  // // Number of items to skip
  // const offset = limit * (currentPage - 1);
  // const previousPage = currentPage - 1;
  // const nextPage = currentPage + 1;
  // const hasPreviousPage = previousPage >= 1;
  return { limit, offset };
};
/**
 * Helper function to get pagination meta data
 * @function getPaginationMeta
 * @param {object} databaseResult
 * @param {number} offset
 * @param {number} limit
 * @return {object} pagination meta data
 */
const getPaginationMeta = (databaseResult, offset, limit) => {
  const totalPages = Math.ceil(databaseResult.count / limit);
  const totalCount = databaseResult.count;
  const outputCount = databaseResult.rows.length;
  const pageSize = limit;
  const currentPage = Math.floor(offset / limit) + 1;
  return {
    totalPages,
    totalCount,
    outputCount,
    pageSize,
    currentPage
  };
};

export { paginateResult, getPaginationMeta };
