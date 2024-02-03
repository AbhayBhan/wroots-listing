import React, { useEffect, useState } from "react";
import SearchFilter from "../components/SearchFilter";
import SearchBox from "../components/organism/search-filter";
import JobCard from "../components/JobCard";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveJobs } from "../services/jobs";
import Spinner from "../components/organism/spinner";

const Search = () => {
  const [jobList, setJobList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState({
    IT : false,
    NONIT : false,
    BPO : false
  })

  const { data, isLoading } = useQuery({
    queryKey: ["Jobs", "Fetch"],
    queryFn: () => fetchActiveJobs(),
  });

  const onSearch = (e) => {
    if (e) {
        setSearchList(jobList.filter(job => job.name.includes(e)));
    } else {
        setSearchList(jobList);
    }
    localStorage.setItem('searchlist', JSON.stringify(searchList));
  }

  useEffect(() => {
    if (data?.data?.roles) {
      setJobList(data.data.roles);
      setSearchList(data.data.roles);
      localStorage.setItem('searchlist', JSON.stringify(data.data.roles));
    }
  }, [isLoading]);

  const changeCategoryFilters = (obj) => {
    setCategoryFilter(obj);
    if(obj.IT){
      setSearchList(searchList.filter(job => job.category_id === 6));
    } else if(obj.NONIT){
      setSearchList(searchList.filter(job => job.category_id === 7));
    } else if(obj.BPO){
      setSearchList(searchList.filter(job => job.category_id === 1));
    } else {
      const list = JSON.parse(localStorage.getItem('searchlist'));
      setSearchList(list);
    }
  }

  return (
    <div className="container">
      <div className="mb-16">
        <h1 className="text-3xl font-bold">Search For Jobs ✨</h1>
      </div>
      <div className="flex flex-row gap-6">
        <SearchFilter categoryFilter={categoryFilter} changeCategoryFilters={changeCategoryFilters}/>
        <div className="w-3/4">
          <div className="mb-4">
            <SearchBox
              className="bg-white"
              onChange={onSearch}
              placeholder="Search Job Title or Keyword..."
            />
          </div>
          {isLoading ? (
            <div className="flex flex-row justify-center w-full">
              <Spinner />
            </div>
          ) : (
            <div className="space-y-2">
              {searchList.map((job) => {
                return <JobCard data={job} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
