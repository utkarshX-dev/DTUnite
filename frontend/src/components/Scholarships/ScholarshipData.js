const scholarshipData = [
  {
    name: "DTU Fee Concession",
    criteria: "Income upto ₹4.5 lac",
    benefits: [
      "100% full fee waiver",
      "100% tuition fee waiver",
      "50% tuition fee waiver",
    ],
    type: "college funded",
    website: "https://dtu.ac.in/",
  },
  {
    name: "Post Matric Scholarships Scheme for Minorities",
    criteria: [
      "50% marks or equivalent grade in the previous final examination",
      "annual income upto ₹2 lac",
    ],
    benefits: ["Tuition fee ₹10k per annum"],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Merit cum Mean Scholarship for Professional and Technical Courses",
    criteria: [
      "50% marks or equivalent grade in the previous final examination",
      "annual income upto ₹2.5 lac",
    ],
    benefits: [
      "Tuition fee ₹20k per annum",
      "Maintenance Allowance Rs.1000/month for hosteller and Rs.500/month for day scholar",
    ],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Post Matric Scholarships for Students with disabilities",
    criteria: ["40% disability", "annual income upto ₹2.5 lac"],
    benefits: [
      "Reimbursement of compulsory Non-refundable Rs.1.5 lac per annum",
      "Maintenance Allowance Rs.1600/month for hosteller and Rs.750/month for day scholar",
      "Book Allowance Rs.1500 per annum",
      "Disability Allowance: a)Visually Impaired Rs.4000 b)Hearing Impaired Rs.2000 c)Physically Disabled (OH) Rs.2000 d)Intellectual Disabilities Rs.4000 e)All other types Rs.2000",
    ],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Top Class Education Scheme for SC Students",
    criteria: [
      "annual income upto ₹8 lac selection only 10 students as per JEE rank and 30% slots for girls",
    ],
    benefits: [
      "Full Tuition fee and non-refundable charges",
      "Academic Allowance of Rs.86000 in first year of study and Rs.41000 in every subsequent year to take care of living expenses, book and stationary, computer/laptop",
    ],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "National Fellowships and Scholarships for Higher Education of ST student (Formally Top Class Education for ST Students Scholarship)",
    criteria: ["annual income upto ₹6 lac"],
    benefits: [
      "Full Tuition fee and non-refundable charges",
      "Academic Allowance of Rs.86000 in first year of study and Rs.41000 in every subsequent year to take care of living expenses, book and stationary, computer/laptop",
    ],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Central Sector Scheme of Scholarships for College and University Students",
    criteria: [
      "annual income upto ₹4.5 lac",
      "Students who are above 80th percentile of successful candidates in relevant stream from respective Board of Examination in Class 10+2 pattern or equivalent",
    ],
    benefits: [
      "Rs.12000 per annum for first three years of College and University Courses",
    ],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Rifles",
    criteria: [
      "Wards/widows of deceased",
      "CAPFs & AR personnel died in harness/election duty, wards of personnel disabled due to causes attributable to Government Service and Wards of ExCAPFs & AR Personnel in receipt of Gallantry Awards",
      "Wards/widows of retired and servicing CAPFs & AR personnel (below Officer Rank)",
    ],
    benefits: [
      "Rs.36,000 per annum to each girl & Rs.30,000 per annum for each boy",
    ],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Prime Minister's Scholarship Scheme for Wards of States/UTs Police Personnel Martyred during Terror/Naxal Attack",
    criteria: [
      "Wards/widows of deceased",
      "minimum of 60% marks in Minimum Entry Qualification (MEQ)",
      "Pursuing first professional degree programme in the field of Engineering, Medicine, Dental, Veterinary, BBA, BCA, B. Pharma, B.SC (Nursing, Agriculture, etc.), MBA and MCA etc",
    ],
    benefits: [
      "Rs.36,000 per annum for girls and Rs. 30,000 per annum for boys",
    ],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Prime Minister's Scholarship Scheme for Wards of RPF/RPSF",
    criteria: ["60% and above in 12th", "awarded to only two wards per family"],
    benefits: [
      "Rs.36,000 per annum for girls and Rs. 30,000 per annum for boys",
    ],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Financial Support to the Student of NER for Higher Professional Courses (NEC Merit Scholarship)",
    criteria: [
      "annual income upto ₹8 lac",
      "resident of any north eastern states",
    ],
    benefits: ["Rs.22,000 per annum"],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Pragati Scholarship Scheme for Girls Students (Technical Degree)",
    criteria: [
      "annual income upto ₹8 lac",
      "Girl candidate should be admitted to 1st year or 2nd year through lateral entry",
    ],
    benefits: ["Rs.50,000 per annum"],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Saksham Scholarship Scheme for Specially Abled Student (Technical Degree)",
    criteria: [
      "annual income upto ₹8 lac",
      "Girl candidate should be admitted to 1st year or 2nd year through lateral entry",
      "40% disability",
    ],
    benefits: ["Rs.50,000 per annum"],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "AICTE - Swanath Scholarship Scheme (Technical Degree)",
    criteria: [
      "annual income upto ₹8 lac",
      "Orphan OR Either or both parent died due to covid 19 OR Wards of Armed Forces and Central Paramilitary Forces martyred in action (Shaheed)",
    ],
    benefits: ["Rs.50,000 per annum"],
    type: "central govt funded",
    website: "https://scholarships.gov.in/Students",
  },
  {
    name: "Post Matric Scholarship for SC",
    criteria: ["annual income upto ₹2.5 lac", "resident of Delhi"],
    benefits: ["Full fee + Allowance of Rs. 7000 per annum"],
    type: "Delhi govt funded",
    website: "https://edistrict.delhigovt.nic.in/",
  },
  {
    name: "Merit Scholarship to SC/ST/OBC Students of College/Professional Institutes",
    criteria: [
      "no income limit for SC and OBC - annual income upto ₹2.5 lac",
      "resident of Delhi",
    ],
    benefits: ["Rs. 12,000 per annum"],
    type: "Delhi govt funded",
    website: "https://edistrict.delhigovt.nic.in/",
  },
  {
    name: "Post Matric Scholarship for OBC",
    criteria: ["annual income upto ₹2.5 lac", "resident of Delhi"],
    benefits: [
      "Rs.20000 per annum for day scholar and Rs.25000 per annum for hosteller",
    ],
    type: "Delhi govt funded",
    website: "https://edistrict.delhigovt.nic.in/",
  },
];
export default scholarshipData;
