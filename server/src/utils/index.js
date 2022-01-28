const replaceQuotes = (sql) => sql.replace("'", "''");

const isObjectEmpty = (obj) => (obj ? Object.keys(obj)?.length <= 0 : true);

module.exports = { replaceQuotes, isObjectEmpty };
