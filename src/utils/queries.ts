export const SELECT_ALL = 'SELECT * FROM sites';
// export const SELECT_ALL_SORTED ="SELECT * FROM sites ORDER BY watched, chapter_date DESC";
export const SELECT_ALL_SORTED =
  'SELECT * FROM sites ORDER BY watched,  FORMAT(chapter_last_published, 0) - FORMAT(chapter_last_read, 0) DESC';
export const UPDATE_SITE =
  'UPDATE sites SET last_update=?, chapter_count=?, chapter_date=?, watched=?, chapter_last_read=?, chapter_last_published=?, status=?, favorite=?, archived=? WHERE id=?';
export const SELECT_BY_ID = 'SELECT * FROM sites WHERE id = ?';
export const INSERT_SITE = 'INSERT INTO sites (url, name) VALUES (?, ?)';
export const DELETE_BY_ID = 'DELETE FROM sites WHERE id = ?';
export const MARK_ALL_AS_READ = 'UPDATE sites SET watched=1';
