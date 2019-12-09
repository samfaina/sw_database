export class Site {
  id: number;
  url: string;
  last_update: string;
  chapter_count: number;
  chapter_date: string;
  selector_chapter: string;
  selector_date: string;
  name: string;
  watched: boolean;
  favorite: boolean;
  chapter_last_published: number | string;
  chapter_last_read: number | string;
  status: string;
  format_date: string;

  constructor(data) {
    this.id = data.id || null;
    this.url = data.url || null;
    this.last_update = data.last_update || '';
    this.chapter_count = data.chapter_count || 0;
    this.chapter_date = data.chapter_date || '';
    this.selector_chapter = data.selector_chapter || '.chapters a';
    this.selector_date = data.selector_date || '.date-chapter-title-rtl';
    this.name = data.name;
    this.watched = data.watched === 1;
    this.favorite = data.favorite === 1;
    this.chapter_last_published = data.chapter_last_published || '';
    this.chapter_last_read = data.chapter_last_read || '';
    this.status = data.status || '';
    this.format_date = data.format_date || 'DD MMM YYYY';
  }
}
