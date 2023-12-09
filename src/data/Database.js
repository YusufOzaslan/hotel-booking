import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('veritabani.db');

// Tablo oluşturma
const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT);'
    );
  });
};

// Kullanıcı ekleme
const addUser = (email, password, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO users (email, password) VALUES (?, ?);',
      [email, password],
      (_, results) => {
        callback(results.rowsAffected);
      },
      (_, error) => {
        console.error('Veri ekleme hatası:', error);
      }
    );
  });
};

// Kullanıcıları getirme
const getUsers = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM users;',
      [],
      (_, results) => {
        const rows = results.rows;
        const users = [];
        for (let i = 0; i < rows.length; i++) {
          users.push(rows.item(i));
        }
        callback(users);
      },
      (_, error) => {
        console.error('Veri sorgulama hatası:', error);
      }
    );
  });
};

export default {
  createTable,
  addUser,
  getUsers,
};
