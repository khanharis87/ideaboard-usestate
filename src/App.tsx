import { useEffect, useState } from "react";
import "./App.css";

import IdeaBoard from "./components/IdeaBoard";
import NewIdeaForm from "./components/NewIdeaFrom";
import Idea from "./components/Idea";
import Button from "./components/Button";
export type IdeaType = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string;
  editing?: boolean;
};

function App() {
  const [ideas, setIdeas] = useState<IdeaType[]>(
    JSON.parse(window.localStorage.getItem("ideas") || "[]")
  );

  const addIdea = (idea: IdeaType) => {
    setIdeas([idea, ...ideas]);
  };

  const submitEditItem = (idea: IdeaType) => {
    setIdeas(ideas.map((i) => (i.id === idea.id ? idea : i)));
  };

  const startEditItem = (idea: IdeaType) => {
    setIdeas(
      ideas.map((i) => (i.id === idea.id ? { ...i, editing: true } : i))
    );
  };

  const deleteIdea = (idea: IdeaType) => {
    setIdeas(ideas.filter((i) => i.id !== idea.id));
  };

  const sortIdeasAlphabetically = () => {
    setIdeas([...ideas].sort((a, b) => a.title.localeCompare(b.title)));
  };

  useEffect(() => {
    window.localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  return (
    <>
      <h1 className="text-5xl mb-8">Idea Board</h1>
      <NewIdeaForm onSubmit={addIdea} />

      <IdeaBoard>
        {ideas.length !== 0 && (
          <div className="flex justify-between mt-4">
            <button
              onClick={sortIdeasAlphabetically}
              className="bg-blue-500  rounded-lg py-1 px-3"
            >
              Sort by title
            </button>
          </div>
        )}

        {ideas.map((idea) => (
          <li key={idea.id} className="flex flex-col">
            <Idea idea={idea} editIdea={submitEditItem} />
            {!idea?.editing && (
              <div className="flex gap-2">
                <Button
                  className="bg-blue-400 text-white"
                  onClick={() => startEditItem(idea)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-600 text-white"
                  onClick={() => deleteIdea(idea)}
                >
                  Delete
                </Button>
              </div>
            )}
          </li>
        ))}
      </IdeaBoard>
    </>
  );
}

export default App;
