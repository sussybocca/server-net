import localforage from "localforage";
import { socket } from "./socket.js";

let usersInServer = [];
export const customCommands = {};

export function generateUniqueNumber() {
  return Math.floor(Math.random() * 10000);
}

export function joinServer({ name, serverId }) {
  const userNumber = generateUniqueNumber();
  usersInServer.push({ id: userNumber, name });
  saveToServerNotes();
  socket.emit("joinServer", { serverId, name });
  return userNumber;
}

export function kickUser(userNumber, serverId) {
  usersInServer = usersInServer.filter(u => u.id !== userNumber);
  saveToServerNotes();
  socket.emit("kickUser", { serverId, userId: userNumber });
}

export function saveToServerNotes() {
  localforage.setItem("serverNotes", usersInServer);
}

export function parseCommand(command, serverId) {
  const kickMatch = command.match(/kick user (\d+) out/);
  if (kickMatch) {
    kickUser(parseInt(kickMatch[1]), serverId);
  } else {
    const [cmd, ...args] = command.split(" ");
    if (customCommands[cmd]) customCommands[cmd](args);
  }
}

export function registerPythonCommand(name, func) {
  customCommands[name] = func;
}
