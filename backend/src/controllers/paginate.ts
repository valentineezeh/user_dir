// This function handles pagination
export const pagination = (count: number, limit: number, page: number) => {
  const numberOfPages = Math.ceil(count / limit);
    const nextPage = page + 1;
    const meta = {
      page: page,
      limit,
      previousPage: (page > 1) ? page - 1 : false,
      nextPage: (numberOfPages >= nextPage) ? nextPage : false,
      pageCount: numberOfPages,
      total: count
    };
    return meta;
}