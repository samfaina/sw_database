export const SELECT_ALL = `SELECT * FROM ${process.env.SW_DB_TABLENAME}`;
export const SELECT_ALL_SORTED = `SELECT * FROM ${process.env.SW_DB_TABLENAME} ORDER BY watched,  FORMAT(chapter_last_published, 0) - FORMAT(chapter_last_read, 0) DESC`;
export const UPDATE_SITE = `UPDATE ${process.env.SW_DB_TABLENAME} SET last_update=?, chapter_count=?, chapter_date=?, watched=?, chapter_last_read=?, chapter_last_published=?, status=?, favorite=?, archived=? WHERE id=?`;
export const SELECT_BY_ID = `SELECT * FROM ${process.env.SW_DB_TABLENAME} WHERE id = ?`;
export const INSERT_SITE = `INSERT INTO ${process.env.SW_DB_TABLENAME} (url, name) VALUES (?, ?)`;
export const DELETE_BY_ID = `DELETE FROM ${process.env.SW_DB_TABLENAME} WHERE id = ?`;
export const MARK_ALL_AS_READ = `UPDATE ${process.env.SW_DB_TABLENAME} SET watched=1`;
export const FIND_USER = `SELECT * FROM ${process.env.SW_DB_ACCESS_TABLENAME} WHERE username = ?`;
