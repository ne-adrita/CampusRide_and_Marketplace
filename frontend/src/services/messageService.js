import { loadJSON, saveJSON, seedConversations, seedMessages, seedUsers, generateId } from '../data';

const delay = () => new Promise(r => setTimeout(r, 30));

export async function getConversations() {
  await delay();
  const convs = loadJSON('conversations', seedConversations);
  const msgs = loadJSON('messages', seedMessages);
  return {
    data: convs.map(c => ({
      ...c,
      last_message: msgs[c.user_id]?.length > 0
        ? msgs[c.user_id][msgs[c.user_id].length - 1].content
        : c.last_message || 'No messages',
    })),
  };
}

export async function getMessages(userId) {
  await delay();
  const msgs = loadJSON('messages', seedMessages);
  return { data: msgs[userId] || [] };
}

export async function sendMessage(receiverId, content) {
  await delay();
  const msgs = loadJSON('messages', seedMessages);
  const currentUser = loadJSON('currentUser', {});
  const msg = {
    message_id: generateId('msg_'),
    sender_id: currentUser.user_id,
    content,
    sent_at: new Date().toISOString(),
  };
  if (!msgs[receiverId]) msgs[receiverId] = [];
  msgs[receiverId].push(msg);
  saveJSON('messages', msgs);

  const convs = loadJSON('conversations', seedConversations);
  if (!convs.find(c => c.user_id === receiverId)) {
    const users = loadJSON('users', seedUsers);
    const u = users[receiverId];
    if (u) {
      convs.unshift({ user_id: u.user_id, name: u.name, profile_pic: u.avatar, last_message: content });
      saveJSON('conversations', convs);
    }
  }
  return { data: msg };
}
