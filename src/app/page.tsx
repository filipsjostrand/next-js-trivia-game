"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  { id: "9", name: "General Knowledge" },
  { id: "10", name: "Entertainment: Books" },
  { id: "11", name: "Entertainment: Film" },
  { id: "12", name: "Entertainment: Music" },
  { id: "13", name: "Entertainment: Musicals & Theatres" },
  { id: "14", name: "Entertainment: Television" },
  { id: "15", name: "Entertainment: Video Games" },
  { id: "16", name: "Entertainment: Board Games" },
  { id: "17", name: "Science & Nature" },
  { id: "18", name: "Science: Computers" },
  { id: "19", name: "Science: Mathematics" },
  { id: "20", name: "Mythology" },
  { id: "21", name: "Sports" },
  { id: "22", name: "Geography" },
  { id: "23", name: "History" },
  { id: "24", name: "Politics" },
  { id: "25", name: "Art" },
  { id: "26", name: "Celebrities" },
  { id: "27", name: "Animals" },
  { id: "28", name: "Vehicles" },
  { id: "29", name: "Entertainment: Comics" },
  { id: "30", name: "Science: Gadgets" },
  { id: "31", name: "Entertainment: Japanese Anime & Manga" },
  { id: "32", name: "Entertainment: Cartoon & Animations" },
];

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export default function TriviaApp() {
  const [amount, setAmount] = useState("5");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const startTrivia = async () => {
    let url = `https://opentdb.com/api.php?amount=${amount}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    if (type) url += `&type=${type}`;

    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setStarted(true);
    setFinished(false);
    setCurrent(0);
    setScore(0);
    setSelected("");
  };

  const answers = questions[current]
    ? [...questions[current].incorrect_answers, questions[current].correct_answer].sort()
    : [];

  const submitAnswer = () => {
    if (selected === questions[current].correct_answer) {
      setScore((s) => s + 1);
    }
    setSelected("");
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  };

  if (!started) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="underline text-xl">Trivia Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="pb-1">#️⃣ Number of Questions</Label>
              <Select onValueChange={setAmount} defaultValue="5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="pb-1">🗃️ Category</Label>
<Select onValueChange={setCategory}>
  <SelectTrigger>
    <SelectValue placeholder="Any Category" />
  </SelectTrigger>
  <SelectContent className="max-h-72 overflow-y-auto">
    {CATEGORIES.map((cat) => (
      <SelectItem key={cat.id} value={cat.id}>
        {cat.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

            </div>

            <div>
              <Label className="pb-1">📊 Difficulty </Label>
              <Select onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="pb-1">✅ Type</Label>
              <Select onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple">Multiple Choice</SelectItem>
                  <SelectItem value="boolean">True / False</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" onClick={startTrivia}>
              Start Trivia
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Quiz Finished 🎉</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              Score: <strong>{score}</strong> / {questions.length}
            </p>
            <Button onClick={() => setStarted(false)}>Play Again</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>
            Question {current + 1} / {questions.length}
          </CardTitle>
          <Badge variant="secondary">Score: {score}</Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: questions[current].question }}
          />

          <RadioGroup value={selected} onValueChange={setSelected}>
            {answers.map((answer) => (
              <div
                key={answer}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem value={answer} id={answer} />
                <Label
                  htmlFor={answer}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              </div>
            ))}
          </RadioGroup>

          <Button
            className="w-full"
            onClick={submitAnswer}
            disabled={!selected}
          >
            Submit Answer
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
