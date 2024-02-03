import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/job?id=${data?.id}`)}
      className="flex flex-row justify-between w-full p-4 bg-white transition-all duration-300 rounded-lg hover:shadow-lg"
    >
      <div className="flex flex-col items-start w-1/3 gap-1">
        <h1 className="font-bold flex-wrap">{data?.name}</h1>
        <h1 className="flex-wrap">{data?.CompanyName}</h1>
      </div>
      <div className="flex flex-col gap-1 items-center w-1/3">
        <h1 className="flex-wrap">
          {data?.min_salary / 100000}L - {data?.max_salary / 100000}L
        </h1>
        <h1 className="flex-wrap">
          {data?.min_experience} - {data?.max_experience} Years of Experience
        </h1>
      </div>
      <div className="flex flex-col items-end gap-1 w-1/3">
        <h1 className="flex-wrap">{data?.no_of_positions} Open Positions</h1>
        <h1 className="flex-wrap">Chennai, Hyderabad, Bangalore</h1>
      </div>
    </div>
  );
};

export default JobCard;
