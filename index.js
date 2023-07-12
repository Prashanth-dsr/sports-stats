import delay from "delay";
import PQueue from "p-queue";

const queue = new { concurrency: 1 }();

(async () => {
  await delay(200);
  console.log(`8. Pending promises: ${queue.pending
  }`);

  (async () => {
    await queue.add(() => "🐙");
    console.log("11. resolved");
  })();

  console.log("9. added 🐙");

  console.log(`10. pending promises: ${queue.pending}`);

  await queue.onIdle();
  console.log("12. All work is done");
})();

(async () => {
  await queue.add(() => "🦄");

  console.log("5. Resolved");
})();
console.log("1. Added 🦄");

(async () => {
  await queue.add(() => "🐴");
  console.log("6. Resolved");
})();
console.log("2. Added 🐴");

(async () => {
  await queue.onEmpty();
  console.log("7. Queue is empty");
})();

console.log(`3. Queue size: ${queue.size}`);

console.log(`4. Pending promises: ${queue.pending}`);
