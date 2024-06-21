import { useEffect, useState } from "react";
import { IdeaType } from "../App";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input";
import Button from "./Button";
import { currentDate } from "../utils/date";

export default function NewIdeaForm({
  idea,
  onSubmit,
}: {
  idea?: IdeaType;
  onSubmit: (idea: IdeaType) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const maxLength = 120;
  const remainingChars = maxLength - description.length;

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
      created_at: idea ? idea.created_at : currentDate(),
      updated_at: idea ? currentDate() : "",
    });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row  gap-8 md:items-baseline"
    >
      <Input
        type="text"
        id="title"
        label="Title"
        data-testid={idea?.editing ? "edit-title" : "new-title"}
        placeholder="Type idea title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        autoFocus
      />
      <Input
        type="text"
        label="description"
        id="description"
        data-testid={idea?.editing ? "edit-description" : "new-description"}
        placeholder="Type idea description"
        maxLength={maxLength}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
      />
      {remainingChars < 20 && (
        <span className="text-xs text-red-500" data-testid="remaining-chars">
          {remainingChars} characters left
        </span>
      )}

      <Button
        className={`${
          idea?.editing ? "bg-green-600" : "bg-blue-700"
        } text-white `}
        type="submit"
        data-testid={idea?.editing ? "edit-submit" : "new-submit"}
      >
        {idea?.editing ? "Done" : " Add Idea"}
      </Button>
    </form>
  );
}
