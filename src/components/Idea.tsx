import type { IdeaType } from "../App";
import NewIdeaForm from "./NewIdeaFrom";

export default function Idea({
  idea,
  editIdea,
}: {
  idea: IdeaType;
  editIdea: (idea: IdeaType) => void;
}) {
  return (
    <div className="flex flex-co;" key={idea?.id}>
      {idea?.editing ? (
        <NewIdeaForm idea={idea} onSubmit={editIdea} />
      ) : (
        <div className="flex flex-col items-start" data-testid="idea">
          <h2 className="text-3xl" data-testid="title">
            {idea?.title}
          </h2>
          <time className="text-xs font-extralight" data-testid="created-at">
            <span className="pr-1">Created at</span>
            {`${idea?.created_at}`}
          </time>
          {idea?.updated_at && (
            <>
              <time
                data-testid="updated-at"
                className="text-xs font-extralight"
              >
                <span className="pr-1">Updated at:</span>
                {idea.updated_at}
              </time>
            </>
          )}
          <p className="text-xl mt-2 font-extralight" data-testid="description">
            {idea?.description}
          </p>
        </div>
      )}
    </div>
  );
}
