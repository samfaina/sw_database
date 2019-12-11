import { Injectable, Logger } from '@nestjs/common';
import { createPool, Pool, PoolConnection } from 'mariadb';
import { OperationDto } from './models/OperationDto';
import { Site } from './models/Site';
import {
  DELETE_BY_ID,
  INSERT_SITE,
  MARK_ALL_AS_READ,
  SELECT_ALL_SORTED,
  SELECT_BY_ID,
  UPDATE_SITE,
} from './utils/queries';

@Injectable()
export class DatabaseService {
  private pool: Pool;
  private usr = 'scrapy';
  private logger = new Logger('DatabaseService');

  constructor() {
    this.pool = createPool({
      //   host: '192.168.1.132',
      host: '127.0.0.1',
      user: this.usr,
      database: 'scrapydb',
      password: this.usr,
      connectionLimit: 5,
    });
    this.logger.log('DB Pool created');
  }

  async findAllSites(): Promise<Site[]> {
    let conn: PoolConnection;
    return new Promise(async (resolve, reject) => {
      try {
        conn = await this.pool.getConnection();
        const rows = await conn.query(SELECT_ALL_SORTED);
        if (rows) {
          const sites = rows.map(row => new Site(row));
          this.logger.log(`Founded ${sites.length} site`);
          resolve(sites);
        }
      } catch (err) {
        this.logger.error('Find All Sites Error', err);
        reject(err);
      } finally {
        if (conn) {
          conn.end();
        }
      }
    });
  }

  async updateSite(site: Site): Promise<OperationDto> {
    let conn: PoolConnection;
    return new Promise(async (resolve, reject) => {
      try {
        conn = await this.pool.getConnection();
        const res = await conn.query(UPDATE_SITE, [
          site.last_update,
          site.chapter_count,
          site.chapter_date,
          site.watched ? 1 : 0,
          site.chapter_last_read !== undefined &&
          site.chapter_last_read !== null
            ? site.chapter_last_read
            : '0',
          site.chapter_last_published,
          site.status,
          site.favorite ? 1 : 0,
          site.archived ? 1 : 0,
          site.id,
        ]);
        this.logger.log(`Site updated: ${site.name}`);
        resolve(res);
      } catch (err) {
        this.logger.error('Error updating site: ', err);
        reject(err);
      } finally {
        if (conn) {
          conn.end();
        }
      }
    });
  }

  async markAllAsRead(): Promise<OperationDto> {
    let conn: PoolConnection;
    return new Promise(async (resolve, reject) => {
      try {
        conn = await this.pool.getConnection();
        const res: OperationDto = await conn.query(MARK_ALL_AS_READ);
        this.logger.log(`${res.affectedRows} marked as read`);

        resolve(res);
      } catch (err) {
        this.logger.error('Error marking all as read', err);
        reject(err);
      } finally {
        if (conn) {
          conn.end();
        }
      }
    });
  }

  async insertSite(site: Site): Promise<OperationDto> {
    let conn;
    return new Promise(async (resolve, reject) => {
      try {
        conn = await this.pool.getConnection();
        const res: OperationDto = await conn.query(INSERT_SITE, [
          site.url,
          site.name,
        ]);
        this.logger.log(`${site.name} inserted with id: ${res.insertId}`);
        resolve(res);
      } catch (err) {
        this.logger.error(`Error inserting ${site.name}`, err);
        reject(err);
      } finally {
        if (conn) {
          conn.end();
        }
      }
    });
  }

  async findSiteById(id: number | string): Promise<Site> {
    let conn: PoolConnection;
    return new Promise(async (resolve, reject) => {
      try {
        conn = await this.pool.getConnection();
        const rows = await conn.query(SELECT_BY_ID, id);

        if (rows) {
          const sites = rows.map(row => new Site(row));
          this.logger.log(`FindByID: ${sites[0].name} founded`);
          resolve(sites[0]);
        }
      } catch (err) {
        this.logger.error(`Error finding ID: ${id}`, err);
        reject(err);
      } finally {
        if (conn) {
          conn.end();
        }
      }
    });
  }

  async deleteSite(id: number | string): Promise<OperationDto> {
    let conn: PoolConnection;
    return new Promise(async (resolve, reject) => {
      try {
        conn = await this.pool.getConnection();
        const response: OperationDto = await conn.query(DELETE_BY_ID, id);
        this.logger.log(`${id} deleted ${response.affectedRows > 0}`);
        resolve(response);
      } catch (err) {
        this.logger.error(`Error deletind ID: ${id}`, err);
        reject(err);
      } finally {
        if (conn) {
          conn.end();
        }
      }
    });
  }
}
