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
};

export const SearchForm = ({
  filters,
  setFilters,
  handleSubmit,
}: SearchFormProps) => {
  return (
    <div>
      <div>
        <label>Enter Job Title: </label>
        <input
          type="text"
          value={filters.title}
          placeholder="Ex. Software Engineer"
          onChange={(e) =>
            setFilters({ ...filters, title: e.target.value })
          }
          style={{ width: 275 }}
        />
      </div>

      <div>
        <label>Enter Location: </label>
        <input
          type="text"
          value={filters.location}
          placeholder="Ex. New Jersey or Remote"
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          style={{ width: 275 }}
        />
      </div>

      <div>
        <label>Enter Job Type: </label>
        <input
          type="text"
          value={filters.type}
          placeholder="Ex. Full-time"
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
          style={{ width: 275 }}
        />
      </div>

      <div>
        <label>Enter Desired Salary: </label>
        <input
          type="number"
          value={filters.salary}
          placeholder="Ex. 80000"
          onChange={(e) =>
            setFilters({ ...filters, salary: e.target.value })
          }
          style={{ width: 235 }}
        />
      </div>

      <div>
        <button onClick={handleSubmit}>Search All Jobs</button>
      </div>
    </div>
  );
};