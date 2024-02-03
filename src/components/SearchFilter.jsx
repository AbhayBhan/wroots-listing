import React from "react";

const SearchFilter = ({ categoryFilter, changeCategoryFilters }) => {
  return (
    <div className="flex flex-col p-4 h-36 gap-3 w-1/4 bg-white">
      <h1 className="font-bold">Job Types</h1>
      <div className="gap-1">
        <div className="flex flex-row gap-1">
          <input
            checked={categoryFilter.IT}
            onChange={() =>
              changeCategoryFilters({ NONIT : false, BPO : false, IT: !categoryFilter.IT })
            }
            type="checkbox"
          />
          <h1>IT Jobs</h1>
        </div>
        <div className="flex flex-row gap-1">
          <input
            checked={categoryFilter.NONIT}
            onChange={() =>
              changeCategoryFilters({
                IT : false,
                NONIT: !categoryFilter.NONIT,
                BPO : false
              })
            }
            type="checkbox"
          />
          <h1>NON-IT Jobs</h1>
        </div>
        <div
          checked={categoryFilter.BPO}
          onChange={() =>
            changeCategoryFilters({ IT : false, NONIT : false, BPO: !categoryFilter.BPO })
          }
          className="flex flex-row gap-1"
        >
          <input type="checkbox" />
          <h1>BPO Jobs</h1>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
