import redis from "redis";
import { SESSION_NOT_FOUND_EXCEPTION } from "./debugger.exception.js";

const client = redis.createClient();
client
    .connect() // 연결
    .then(() => console.log("Connected to Redis"))
    .catch((err) => console.error("Redis connection error", err));

export async function find(sessionId) {
    const reply = await client.lRange(sessionId, 0, -1);
    if (reply.length === 0) throw SESSION_NOT_FOUND_EXCEPTION();
    return reply.map((item) => JSON.parse(item));
}

export async function insert(sessionId, data) {
    client.rPush(sessionId, JSON.stringify(data));
}

export async function remove(sessionId) {
    const result = await client.del(sessionId);
    if (result === 0) throw SESSION_NOT_FOUND_EXCEPTION();
}
