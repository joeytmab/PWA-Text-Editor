import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDb active, putting into database');

  // create connection to the database and version that we want to see
  const j8 = await openDB('jate', 1);

  // create new transaction, then specify the database/data privileges
  const tx = j8.transaction('jate', 'readwrite');

  // open up the desired object store
  const store = tx.objectStore('jate');

  // put route needs required fields in which to change fields, in this case, content
  const result = await store.put({ content: content});

  console.log(result)

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('getDb triggered; getting data from the database');

  const j8Two = await openDB('jate', 1);

  // similar to GET route; we are not writing anything
  // so, we use readonly instead of readwrite
  const tx = j8Two.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // getAll() needed to get all data from database
  const result = await store.getAll();

  console.log(result);
  console.log('result.value');
}

initdb();
