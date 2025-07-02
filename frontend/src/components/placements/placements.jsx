import React, { useState } from "react";
import data from "./placementdata.json";

const placements2025 = data.Sheet1.filter(item => item.Name);

const branchOptions = [
  ...new Set(placements2025.map(p => p.Branch).filter(Boolean))
];

const ctcOptions = [
  { label: "All", value: "" },
  { label: "20+ LPA", value: 20 },
  { label: "30+ LPA", value: 30 },
  { label: "40+ LPA", value: 40 }
];

const cgpaOptions = [
  { label: "All", value: "" },
  { label: "6 - 7", value: "6-7", min: 6, max: 7 },
  { label: "7 - 8", value: "7-8", min: 7, max: 8 },
  { label: "8 - 9", value: "8-9", min: 8, max: 9 },
  { label: "9+", value: "9+", min: 9, max: 10 }
];

export default function PlacementsPage() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [year, setYear] = useState("2025");
  const [branch, setBranch] = useState("");
  const [ctc, setCtc] = useState("");
  const [cgpa, setCgpa] = useState("");

  // Helper to show N/A for blank or missing fields
  const showNA = val => (val === undefined || val === null || val === "" ? "N/A" : val);

  // Filter and sort placements for 2025
  const filtered = placements2025
    .filter(p =>
      (p.Name || "").toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => !branch || p.Branch === branch)
    .filter(p => !ctc || (Number(p.CTC) >= Number(ctc)))
    .filter(p => {
      if (!cgpa) return true;
      const cg = Number(p.CGPA);
      const selected = cgpaOptions.find(opt => opt.value === cgpa);
      if (!selected || isNaN(cg)) return false;
      return cg >= selected.min && cg < selected.max;
    })
    .sort((a, b) =>
      sortOrder === "desc"
        ? (b.CTC || 0) - (a.CTC || 0)
        : (a.CTC || 0) - (b.CTC || 0)
    );

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Placement Stats</h2>
      <div className="mb-3 d-flex gap-3 align-items-center">
        <label className="fw-bold">Select Year:</label>
        <select
          className="form-select"
          style={{ maxWidth: 120 }}
          value={year}
          onChange={e => setYear(e.target.value)}
        >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
      {year === "2024" ? (
        <div className="alert alert-warning text-center fw-bold">
          Placement data for 2024 is <span className="text-danger">NOT AVAILABLE</span>.
        </div>
      ) : (
        <>
          <div className="mb-3 d-flex gap-3 flex-wrap">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ maxWidth: 200 }}
            />
            <select
              className="form-select"
              style={{ maxWidth: 140 }}
              value={branch}
              onChange={e => setBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              {branchOptions.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <select
              className="form-select"
              style={{ maxWidth: 120 }}
              value={ctc}
              onChange={e => setCtc(e.target.value)}
            >
              {ctcOptions.map(opt => (
                <option key={opt.label} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              className="form-select"
              style={{ maxWidth: 120 }}
              value={cgpa}
              onChange={e => setCgpa(e.target.value)}
            >
              {cgpaOptions.map(opt => (
                <option key={opt.label} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              className="px-4 py-2 rounded border border-orange-500 text-orange-500 bg-white d-flex align-items-center gap-2 transition-colors duration-200 hover:bg-orange-500 hover:text-white"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              Sort by CTC {sortOrder === "asc" ? "↓" : "↑"}
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Branch</th>
                  <th>CGPA</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>CTC (LPA)</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, idx) => (
                  <tr key={idx}>
                    <td>{showNA(p.Name)}</td>
                    <td>{showNA(p[" Roll No"])}</td>
                    <td>{showNA(p.Branch)}</td>
                    <td>{showNA(p.CGPA)}</td>
                    <td>{showNA(p.Company)}</td>
                    <td>{showNA(p.Role)}</td>
                    <td>{showNA(p.CTC)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-muted text-center py-4">No results found.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}