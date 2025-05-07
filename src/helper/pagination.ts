export default function pagination(model: Array<any>, req) {
    const page = +req.query.page;
    const limit = +req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResult = model.slice(startIndex, endIndex);
    const result = {
        resultPOIs: [],
        previousPage: {},
        nextPage: {},
    };
    result.resultPOIs = paginatedResult;
    if (startIndex > 0) {
        result.previousPage = {
            page: +page - 1,
            limit: limit,
        }
    };
    if (endIndex < model.length) {
        result.nextPage = {
            page: +page + 1,
            limit: limit,
        }
    };
    return result;
}