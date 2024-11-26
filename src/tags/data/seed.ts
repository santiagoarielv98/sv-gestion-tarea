import fs from "fs";
import path, { dirname } from "path";
import { fakerES as faker } from "@faker-js/faker";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tasks = Array.from({ length: 100 }, () => ({
  id: faker.number.int({ min: 1, max: 9999 }),
  title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  content: faker.word.words({ count: 8 }),
}));

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2),
);

console.log("✅ Tasks data generated.");
