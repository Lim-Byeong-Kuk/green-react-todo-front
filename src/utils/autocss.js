const makeDiv = (title, value) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);

const f = (i) => i + 3;

function generateTasks() {
  const tasks = [];
  const today = new Date();

  for (let i = 1; i <= 100; i++) {
    const tno = i;
    const title = `Task Title ${i}`;
    const writer = `Writer${(i % 10) + 1}`;
    const complete = Math.random() < 0.5; // true/false 랜덤

    // 오늘 기준 -100일 ~ +100일 랜덤 날짜
    const offset = Math.floor(Math.random() * 201) - 100;
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + offset);

    tasks.push({
      tno,
      title,
      writer,
      complete,
      dueDate: dueDate.toISOString().split("T")[0], // YYYY-MM-DD
    });
  }

  return tasks;
}

const tasks = generateTasks();

export { makeDiv, f, tasks };
