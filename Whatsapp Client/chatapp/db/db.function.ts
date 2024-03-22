import { chatTable } from "./db.model";
async function addChat(id: string, message: string, sender: string, receiver: string, timestamp: number) {
    const res = await chatTable.add({ id, message, sender, receiver, timestamp });
    console.log("New chat:", res);
}
export async function fetchChatsByNumber(number: string) {
    const chats = await chatTable.where('sender').equals(number).or('receiver').equals(number).toArray();
    return chats;
}
export default addChat;
