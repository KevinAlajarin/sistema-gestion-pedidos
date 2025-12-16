const { poolPromise, sql } = require('../config/database');

class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM ${this.tableName}`);
    return result.recordset;
  }

  async getById(id, idColumnName) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(`SELECT * FROM ${this.tableName} WHERE ${idColumnName} = @Id`);
    return result.recordset[0];
  }
}

module.exports = BaseRepository;