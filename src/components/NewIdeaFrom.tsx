import { useEffect, useState } from "react";
import { IdeaType } from "../App";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input";
import Button from "./Button";

export default function NewIdeaForm({
  idea,
  onSubmit,
}: {
  idea?: IdeaType;
  onSubmit: (idea: IdeaType) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (idea) {
      setTitle(idea?.title);
      setDescription(idea?.description);
    }
  }, [idea]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      id: idea?.id ? idea.id : uuidv4(),
      title: title,
      description: description,
      created_at: idea
        ? idea.created_at
        : new Date().toISOString().split("T")[0],
      updated_at: idea ? new Date().toISOString().split("T")[0] : "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-8 items-baseline">
      <Input
        type="text"
        id="title"
        label="Title"
        placeholder="Type idea title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
      />
      <Input
        type="text"
        label="description"
        id="description"
        placeholder="Type idea description"
        maxLength={120}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
      />
      <Button
        className={`${
          idea?.editing ? "bg-green-600" : "bg-gray-500"
        } text-white `}
        type="submit"
      >
        {idea?.editing ? "Done" : " Add Idea"}
      </Button>
    </form>
  );
}
