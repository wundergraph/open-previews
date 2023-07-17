import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useClipboard } from "../hooks/use-clipboard";
import { CheckIcon, CopyIcon } from "lucide-react";

const getScript = (props: { repo: string; cat: string }) => {
  return `<script
  src="https://openpreviews.com/widget.js"
  type="text/javascript"
  data-repository="${props.repo || "[ENTER_REPOSITORY]"}"
  data-category-id="${props.cat || "[ENTER_CATEGORY_ID]"}"
  async />`;
};

const apiUrl = import.meta.env.PUBLIC_API_URL || "http://localhost:9991";

const getCategories = async (repo: string) => {
  try {
    return await fetch(`${apiUrl}/operations/Categories?repo=${repo}`).then(
      async (res) => {
        let json;
        try {
          json = await res.json();
        } catch {}
        if (res.status !== 200) {
          return {
            data: [],
            error: json?.errors?.[0]?.message || "Something went wrong",
          };
        }
        return json;
      }
    );
  } catch (e: any) {
    return { data: [], error: e.message || "Could not fetch the repository" };
  }
};

export const Setup = () => {
  const [repo, setRepo] = React.useState("");
  const [cat, setCat] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [categories, setCategories] = React.useState<
    { id: string; name: string }[]
  >([]);

  const fetchCategories = useDebouncedCallback((repo) => {
    if (repo?.match(/^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/)) {
      setLoading(true);
      getCategories(repo)
        .then(({ data, error }) => {
          const op = data?.find((c: any) =>
            ["Open previews", "Preview comments"].includes(c.name)
          );
          if (op) {
            setCat(op.id);
          }
          setCategories(data);
          setError(error);
        })
        .finally(() => setLoading(false));
    }
  }, 500);

  const script = getScript({ repo, cat });
  const { copied, onCopy, setValue } = useClipboard(script);

  React.useEffect(() => {
    setValue(script);
  }, [script]);

  return (
    <div className="flex-start mt-16 flex max-w-screen-md flex-col space-y-8">
      <div>
        <h3 className="mb-4 text-xl font-bold">1. Github repository</h3>

        <p className="text-md mb-4">
          <a
            href="https://github.com/apps/open-previews"
            className="decoration-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Install the Open Previews app
          </a>{" "}
          to give access to your repository and allow people to post comments.
          The repository has to be public.
        </p>

        <label className="text-sm">
          Repository{" "}
          <input
            name="repository"
            placeholder="username/repo-name"
            className="focus:ring-primary h-12 w-full border px-2 text-sm focus:outline-none focus:ring-2"
            value={repo}
            onChange={(e) => {
              setRepo(e.target.value);
              fetchCategories(e.target.value);
            }}
          />
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <div>
        <h3 className="mb-4 text-xl font-bold">2. Discussion category</h3>
        <p className="text-md">
          If you haven't enabled discussions in your repository yet, you can do
          so in your repository settings.
        </p>
        <p className="text-md mb-4">
          It's recommended to create a new category (eg "Open previews") with
          the `Announcement` type where the comments will be stored.
        </p>

        <label className="text-sm">
          Category{" "}
          <select
            name="category"
            className="focus:ring-primary w-full border px-2 text-sm shadow-none focus:outline-none focus:ring-2"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            disabled={!categories.length}
          >
            {categories.length ? (
              <>
                <option disabled>Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="">
                {isLoading ? "Loading..." : "No categories found"}
              </option>
            )}
          </select>
        </label>
      </div>
      <div>
        <h3 className="mb-4 text-xl font-bold">3. Enable Open Previews</h3>
        <p className="text-md mb-4">
          Add the following script to the `head` of you website or app.
        </p>
        <div className="text-md relative border p-4 font-mono">
          <code>
            <pre>{script}</pre>
          </code>
          <button className="absolute right-4 top-4" onClick={onCopy}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};
