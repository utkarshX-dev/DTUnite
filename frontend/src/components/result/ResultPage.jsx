import React, { useState, useEffect } from "react";
import result2023 from "./result2023.json";
import result2022 from "./result2022.json";
import result2024 from "./result2024.json";
import { Skeleton } from "@mui/material";

const allResults = [
  { year: 2024, data: result2024 },
  { year: 2023, data: result2023 },
  { year: 2022, data: result2022 },
];

const yearOptions = allResults.map(r => r.year);

const sortOptions = [
  { label: "Sort by", value: "" },
  { label: "CGPA", value: "cgpa" },
  { label: "Branch Rank", value: "branchRank" },
  { label: "University Rank", value: "universityRank" },
];

function safeNumber(val) {
  const num = Number(val);
  return isNaN(num) ? -Infinity : num;
}

function showNA(val) {
  return val === undefined || val === null || val === "" ? "-" : val;
}

export default function ResultPage() {
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [sortBy, setSortBy] = useState("Sort by");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [selectedYear, sortBy, sortOrder, search]);

  const selectedResult = allResults.find(r => r.year === selectedYear);

  const getSortedData = (data) => {
    return [...data].sort((a, b) => {
      let aVal, bVal;
      if (sortBy === "cgpa") {
        aVal = safeNumber(a.cgpa);
        bVal = safeNumber(b.cgpa);
      } else if (sortBy === "branchRank") {
        aVal = safeNumber(a.branch_rank);
        bVal = safeNumber(b.branch_rank);
      } else if (sortBy === "universityRank") {
        aVal = safeNumber(a.university_rank);
        bVal = safeNumber(b.university_rank);
      } else {
        aVal = a[sortBy];
        bVal = b[sortBy];
      }
      if (sortOrder === "asc") return aVal - bVal;
      else return bVal - aVal;
    });
  };

 const filtered = selectedResult
  ? getSortedData(selectedResult.data).filter(row =>
      (row.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (row.roll_no || "").toLowerCase().includes(search.toLowerCase())
    )
  : [];

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold text-center mt-5 text-primary">Student Results for {selectedYear}</h2>
      <p className="text-center text-muted">Sorry for the Inconvenience. Branch rank for academic year 2024 not available for Now...🕛</p>
      <div className="mb-3 d-flex gap-3 align-items-center flex-wrap justify-content-center">
        <label className="fw-bold">Select Year:</label>
        <select
          className="form-select"
          style={{ maxWidth: 120 }}
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
        >
          {yearOptions.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          className="form-select"
          style={{ maxWidth: 180 }}
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name or Roll No"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 250 }}
        />
      </div>
      <div className="table-responsive shadow rounded">
        <table className="table table-striped align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>CGPA</th>
              <th>Branch Rank</th>
              <th>University Rank</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 7 }).map((_, idx) => (
                <tr key={idx}>
                  <td><Skeleton variant="text" width={90} height={24} /></td>
                  <td><Skeleton variant="text" width={70} height={24} /></td>
                  <td><Skeleton variant="text" width={50} height={24} /></td>
                  <td><Skeleton variant="text" width={60} height={24} /></td>
                  <td><Skeleton variant="text" width={80} height={24} /></td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  No results found.
                </td>
              </tr>
            ) : (
              filtered.map((row, idx) => (
                <tr key={idx}>
                  <td>{showNA(row.name)}</td>
                  <td>{showNA(row.roll_no)}</td>
                  <td>
                    {row.cgpa === null || row.cgpa === undefined || isNaN(Number(row.cgpa))
                      ? "-"
                      : row.cgpa}
                  </td>
                  <td>
                    {row.branch_rank === null || row.branch_rank === undefined || isNaN(Number(row.branch_rank))
                      ? "-"
                      : row.branch_rank}
                  </td>
                  <td>
                    {row.university_rank === null || row.university_rank === undefined || isNaN(Number(row.university_rank))
                      ? "-"
                      : row.university_rank}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}