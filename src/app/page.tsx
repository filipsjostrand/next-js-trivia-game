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
{ id: 27, name: "Animals" },
{ id: 25, name: "Art" },
{ id: 26, name: "Celebrities" },
{ id: 16, name: "Entertainment: Board Games" },
{ id: 10, name: "Entertainment: Books" },
{ id: 32, name: "Entertainment: Cartoon & Animations" },
{ id: 29, name: "Entertainment: Comics" },
{ id: 11, name: "Entertainment: Film" },
{ id: 31, name: "Entertainment: Japanese Anime & Manga" },
{ id: 12, name: "Entertainment: Music" },
{ id: 13, name: "Entertainment: Musicals & Theatres" },
{ id: 14, name: "Entertainment: Television" },
{ id: 15, name: "Entertainment: Video Games" },
{ id: 9, name: "General Knowledge" },
{ id: 22, name: "Geography" },
{ id: 23, name: "History" },
{ id: 20, name: "Mythology" },
{ id: 24, name: "Politics" },
{ id: 17, name: "Science & Nature" },
{ id: 18, name: "Science: Computers" },
{ id: 30, name: "Science: Gadgets" },
{ id: 19, name: "Science: Mathematics" },
{ id: 21, name: "Sports" },
{ id: 28, name: "Vehicles" }
];

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export default function TriviaApp() {
  const [amount, setAmount] = useState("5");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);


  const startTrivia = async () => {
     try {
      let url = `https://opentdb.com/api.php?amount=${amount}`;
      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;
      if (type) url += `&type=${type}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Network error");
    }

    const data = await res.json();

        if (data.response_code !== 0 || !data.results?.length) {
      throw new Error("Not enough questions available.");
    }

    setQuestions(data.results);
    setStarted(true);
    setFinished(false);
    setCurrent(0);
    setScore(0);
    setSelected("");
    setSubmitted(false);
    setError(null);
      } catch (err) {
    console.error(err);

    // Reset to start screen
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setError("Could not start trivia. Try different settings.");
  }
  };

  const answers = questions[current]
  ? [...questions[current].incorrect_answers, questions[current].correct_answer]
  : [];


    const submitAnswer = () => {
      setSubmitted(true);

      if (selected === questions[current].correct_answer) {
        setScore((s) => s + 1);
      }
    };

    const nextQuestion = () => {
      setSubmitted(false);
      setSelected("");

      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
      } else {
        setFinished(true);
      }
    };

  if (!started) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-muted p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/pexels-fatih-turan-63325184-27519472.jpg')" }}>
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="underline text-xl">Trivia Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

          {error && (
            <div className="rounded-md bg-red-100 text-red-700 p-2 text-sm">
              {error}
            </div>
          )}

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
                  <SelectItem key={cat.id} value={cat.id.toString()}>
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
          <Badge
          className="text-sm"
          variant="secondary">Score: {score}</Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: questions[current].question }}
          />

        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          disabled={submitted}
        >
          {answers.map((answer, index) => {
            const isCorrect = answer === questions[current].correct_answer;
            const isSelected = answer === selected;

            const showCorrect = submitted && isCorrect;
            const showWrong = submitted && isSelected && !isCorrect;

            return (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={answer}
                  id={`answer-${index}`}
                />

                <Label
                  htmlFor={`answer-${index}`}
                  className={`
                    cursor-pointer
                    ${showCorrect ? "text-green-600 font-semibold" : ""}
                    ${showWrong ? "text-red-600 font-semibold" : ""}
                  `}
                  dangerouslySetInnerHTML={{
                    __html:
                      answer +
                      (showCorrect ? " ✔" : "") +
                      (showWrong ? " ✖" : ""),
                  }}
                />
              </div>
            );
          })}
        </RadioGroup>
          {!submitted ? (
            <Button
              className="w-full"
              onClick={submitAnswer}
              disabled={!selected}
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={nextQuestion}
            >
              Next Question
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
