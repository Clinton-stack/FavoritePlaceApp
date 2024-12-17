import * as SQLite from "expo-sqlite";

let db; // Declare the `db` variable globally

// Function to initialize the database
async function initializeDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("places.db");
    console.log("Database initialized successfully!");
  }
  return db;
}

// Function to initialize the table
export async function init() {
  try {
    await initializeDatabase(); // Ensure DB is initialized
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );
    `);
    console.log("Table created or already exists.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// Function to insert a place
export async function insertPlace(place) {
  try {
    const { title, imageUri, address, location } = place;
    const { lat, lng } = location;

    if (!title || !imageUri || !address || !lat || !lng) {
      throw new Error("One or more required fields are missing.");
    }
    await initializeDatabase(); // Ensure DB is initialized
    const result = await db.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
      [title, imageUri, address, lat, lng]
    );
    console.log("Place inserted successfully!");
  } catch (error) {
    console.error("Error inserting place:", error);
  }
}

// Function to fetch all places
export async function fetchPlaces() {
  try {
    await initializeDatabase(); // Ensure DB is initialized
    const result = await db.getAllAsync(`SELECT * FROM places;`);
    console.log("Fetched places successfully!");
    return result;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}

//function to get selected place
export async function getPlaceById(id) {
    console.log("id", id)
  try {
    await initializeDatabase(); // Ensure DB is initialized
    const result = await db.getAllAsync(`SELECT * FROM places WHERE id = ?;`, [id]);
    console.log("Fetched place successfully!",);
    return result[0];
  } catch (error) {
    console.error("Error fetching place:", error);
    return null;
  }
}
