// database.config.ts
import Dexie from "dexie";
export interface Message {
  id: string;
  message: string;
  sender: string;
  receiver: string;
  timestamp: string;
}
const db = new Dexie("chatDatabase");
db.version(1).stores({
  chats: 'id, message, sender, receiver, timestamp'
});

export const chatTable = db.table('chats');

export default db;