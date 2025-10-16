import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Routes, Route, Link } from "react-router-dom";

function Btn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-xl border-2 border-gray-300 hover:border-black transition"
    />
  );
}

function SchulteTrainer() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  const palette = ["#1f77b4", "#d62728", "#2ca02c", "#ff7f0e", "#9467bd"];

  const generateGrid = () => {
    const nums = Array.from({ length: 25 }, (_, i) => i + 1).sort(
      () => Math.random() - 0.5
    );
    const cols = nums.map(
      () => palette[Math.floor(Math.random() * palette.length)]
    );
    setNumbers(nums);
    setColors(cols);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timeLeft === 0) setIsRunning(false);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    generateGrid();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-4">
      <div className="absolute top-4 right-4">
        <Link to="/rules" title="Правила">
          <HelpCircle size={28} className="text-gray-600 hover:text-black" />
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Таблица Шульте</h1>

      <div className="grid grid-cols-5 gap-2 mb-6">
        {numbers.map((num, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-xl text-2xl font-bold"
            style={{ color: colors[i] }}
          >
            {num}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <Btn onClick={generateGrid}>Создать новую генерацию</Btn>
        <Btn
          onClick={() => {
            setTimeLeft(30);
            setIsRunning(true);
          }}
        >
          Запустить таймер (30 сек)
        </Btn>
      </div>

      <div className="text-xl font-semibold">
        {isRunning ? `⏱️ Осталось: ${timeLeft} сек` : ""}
      </div>
    </div>
  );
}

function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-6">
      <Link to="/" className="absolute top-4 left-4 text-blue-600">
        ← Назад
      </Link>
      <h1 className="text-2xl font-bold mb-4">Правила игры</h1>
      <div className="max-w-lg text-left text-lg leading-relaxed">
        <p className="mb-4">
          Цель — как можно быстрее найти все числа от <b>1 до 25</b> по порядку.
        </p>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Смотри в центр таблицы, не перемещая взгляд.</li>
          <li>Находи числа последовательно (1, 2, 3 … 25).</li>
          <li>Отмечай каждое найденное число мысленно или пальцем.</li>
          <li>Работай на время — стандартно 30 секунд.</li>
        </ol>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SchulteTrainer />} />
      <Route path="/rules" element={<RulesPage />} />
    </Routes>
  );
}
