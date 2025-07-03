import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is DTU Unite?",
    answer: "DTU Unite is a vibrant community platform designed to bring together students, mentors, and resources to facilitate learning, collaboration, and growth."
  },
  {
    question: "How is the process for getting an education loan at DTU?",
    answer: "The process is smooth. Visit SBI, submit the required documents, and after verification and approval, the loan is processed. The interest rate is around 8.3% for loan amounts above 4 lakhs, with a repayment period of 5 years. Always check with the specific bank for the latest policies."
  },
  {
    question: "What happens if I miss course registration?",
    answer: "If you miss course registration, act promptly. Check the website, contact administration or instructors, and appeal for late registration if possible. Learn from the experience and be proactive with future deadlines."
  },
  {
    question: "What scholarships are available at DTU?",
    answer: "DTU provides fee concession scholarships based on income criteria, as well as scholarships for minorities and different categories (NTSE, post-metric for SC/ST, MCM e-district, etc). Check the DTU website and government sources regularly."
  },
  {
    question: "Is CGPA important?",
    answer: "Yes, maintaining a high CGPA (8.0 or above) is important for placements and internships. Some companies have CGPA cutoffs. A good CGPA is a minimum requirement for many opportunities."
  },
  {
    question: "Is 75% attendance necessary?",
    answer: "In the first year, students usually don't get detained for low attendance, but teachers may give internal marks based on attendance. It's better to attend classes if possible."
  },
  {
    question: "Where can I find study material?",
    answer: "Visit fresources.tech for useful study material, especially before exams."
  },
  {
    question: "How should I study for exams?",
    answer: "Be thorough with previous year papers, assignments, and a few notes/books for reference."
  },
  {
    question: "How do I choose FEC subjects?",
    answer: "Choose FECs like logical reasoning, soft skills, communication skills, and yoga based on better grades, lower input, and attendance leniency. EVS is compulsory and should be taken before the 4th semester."
  },
  {
    question: "How can I join DTU Unite?",
    answer: "Sign up for an account on our website or mobile app. Membership is free and open to all students."
  },
  {
    question: "How supportive are the professors?",
    answer: "Professors are supportive if you have a genuine problem or want to volunteer in research. Being a CR can help, but genuine interest matters more."
  },
  {
    question: "How to find a peer group of your interest?",
    answer: "Join societies related to your interests (coding, research, UPSC, startups, etc). Talk to people, share ideas, and participate in activities."
  },
  {
    question: "How to apply for DTU internships?",
    answer: "Apply for USIP Internships, off-campus internships, or use platforms like Internshala, Angellist, and LinkedIn. Cold-emailing HRs is also effective."
  },
  {
    question: "Do college societies help in placements?",
    answer: "Yes, societies provide exposure, leadership, teamwork, and confidence, all of which are valuable in placements."
  },
  {
    question: "Should I start coding from first year?",
    answer: "Yes, starting early helps build a strong foundation for tech roles and internships."
  },
  {
    question: "Can I get into coding if my branch is Chemical?",
    answer: "Absolutely. Many non-CS students succeed in tech. Use online resources, join coding clubs, and participate in hackathons."
  },
  {
    question: "Should I change my branch?",
    answer: "Change your branch if your interests and career goals align better with another field. Consult faculty, seniors, or counselors before deciding."
  },
  {
    question: "Does a non-circuit branch affect my chances in tech companies?",
    answer: "Not necessarily. Strong coding and problem-solving skills matter more than branch for many tech companies."
  },
  {
    question: "When and how to start preparing for placements?",
    answer: "Start from second year. Focus on coding, data structures, projects, internships, and soft skills. Use platforms like LeetCode, Codeforces, and GeeksforGeeks."
  },
  {
    question: "How important are projects for placements?",
    answer: "Projects are very important. They showcase your skills, creativity, and problem-solving abilities. Be ready to discuss them in interviews."
  },
  {
    question: "How to build a strong LinkedIn profile?",
    answer: "Use a professional photo, write a good headline and summary, add education, experience, projects, and skills. Engage with content, join groups, and connect with professionals."
  },
  {
    question: "What else can I do apart from CGPA and coding to build my profile?",
    answer: "Participate in extracurriculars, join clubs, take leadership roles, do internships, work on projects, attend workshops, and pursue certifications. Build a well-rounded profile."
  },
  {
    question: "How can I participate in hackathons?",
    answer: "Look for hackathon announcements on college notice boards, websites, and platforms like Devfolio, HackerEarth, and HackerRank. Form a team and register."
  },
  {
    question: "Are there opportunities for research at DTU?",
    answer: "Yes, you can approach professors for research projects or join technical societies and research groups."
  },
  {
    question: "How do I get a hostel room?",
    answer: "Apply through the DTU hostel portal after admission. Allotment is based on merit and availability."
  },
  {
    question: "How to get involved in entrepreneurship at DTU?",
    answer: "Join the E-Cell, participate in startup events, and connect with alumni entrepreneurs."
  },
];

function FaqsPage() {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", md: "2.3rem" },
            letterSpacing: 0.5,
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Find answers to the most common queries.
        </Typography>
        <Box
          sx={{
            width: "20rem",
            height: 3,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #ffb300 100%)`,
            borderRadius: 2,
            mx: "auto",
            mb: 1,
          }}
        />
      </Box>

      {faqs.map((faq, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.04 }}
        >
          <Accordion
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: "0 2px 12px 0 rgba(33, 150, 243, 0.06)",
              bgcolor: "#f6f8fa",
              border: "1px solid #e3e8ee",
              "&:before": { display: "none" },
              "& .MuiAccordionSummary-root": {
                borderRadius: 2,
                px: 2,
                bgcolor: "#e3f2fd",
                minHeight: 56,
                "&:hover": {
                  bgcolor: "#e0f2fe",
                },
              },
              "& .MuiAccordionSummary-content": {
                fontWeight: 600,
                color: "#1976d2",
                fontSize: "1.08rem",
              },
              "& .MuiAccordionDetails-root": {
                bgcolor: "#fff",
                borderRadius: "0 0 1rem 1rem",
                px: 2,
                py: 2,
                fontSize: "1rem",
                color: "#374151",
              },
            }}
            disableGutters
            elevation={0}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: "#1976d2",
                    fontSize: "1.7rem",
                  }}
                />
              }
            >
              <Typography component="span">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" component="span">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ))}
    </Container>
  );
}

export default FaqsPage;
