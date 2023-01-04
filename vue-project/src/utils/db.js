import Dexie from "dexie";

export const db = new Dexie("blogDB");

db.version(1).stores({
  bgpic: "key, pic"
});