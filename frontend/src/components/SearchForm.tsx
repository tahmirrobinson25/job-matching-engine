type Filters = {
  title: string;
  location: string;
  type: string;
  salary: string;
};

type SearchFormProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleSubmit: () => Promise<void>;
  loading: boolean;
};

const fieldClass =
  'mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-violet-400 dark:focus:ring-violet-400/20';

const labelClass =
  'text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400';

export const SearchForm = ({
  filters,
  setFilters,
  handleSubmit,
  loading
}: SearchFormProps) => {
  return (
    <form
      className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:shadow-none sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit();
      }}
    >
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Search filters
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Adjust fields and run a search against your API.
          </p>
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-violet-600 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 active:scale-[0.98] dark:bg-violet-500 dark:hover:bg-violet-400 dark:focus-visible:outline-violet-400 sm:mt-0"
          id="search-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Jobs'}
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="text-left">
          <label className={labelClass} htmlFor="filter-title">
            Job title
          </label>
          <input
            id="filter-title"
            type="text"
            value={filters.title}
            placeholder="e.g. Software engineer"
            className={fieldClass}
            onChange={(e) =>
              setFilters({ ...filters, title: e.target.value })
            }
          />
        </div>

        <div className="text-left">
          <label className={labelClass} htmlFor="filter-location">
            Location
          </label>
          <input
            id="filter-location"
            type="text"
            value={filters.location}
            placeholder="e.g. Remote, New Jersey"
            className={fieldClass}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
        </div>

        <div className="text-left">
          <label className={labelClass} htmlFor="filter-type">
            Job type
          </label>
          <input
            id="filter-type"
            type="text"
            value={filters.type}
            placeholder="e.g. Full-time, Contract"
            className={fieldClass}
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value })
            }
          />
        </div>

        <div className="text-left">
          <label className={labelClass} htmlFor="filter-salary">
            Minimum salary
          </label>
          <input
            id="filter-salary"
            type="number"
            min={0}
            inputMode="numeric"
            value={filters.salary}
            placeholder="e.g. 80000"
            className={fieldClass}
            onChange={(e) =>
              setFilters({ ...filters, salary: e.target.value })
            }
          />
        </div>
      </div>
    </form>
  );
};
