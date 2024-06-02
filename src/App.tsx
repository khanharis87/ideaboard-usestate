import { useState } from "react";
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
  const [ideas, setIdeas] = useState<IdeaType[]>([]);

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

  return (
    <>
      <h1 className="text-5xl mb-8">Idea Board</h1>
      <NewIdeaForm onSubmit={addIdea} />
      <IdeaBoard>
        {ideas.map((idea) => (
          <li className="flex flex-col">
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
