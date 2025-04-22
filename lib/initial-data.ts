import type { ResumeData } from "@/lib/types"

export const initialResumeData: ResumeData = {
  personalInfo: {
    name: "John Doe",
    title: "Software Engineer",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    website: "johndoe.dev",
    linkedin: "linkedin.com/in/johndoe",
    summary:
      "Experienced software engineer with a passion for building scalable web applications and solving complex problems. Skilled in JavaScript, TypeScript, React, and Node.js.",
  },
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "Aug 2016",
      endDate: "May 2020",
      location: "Berkeley, CA",
      description:
        "Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development, Machine Learning",
    },
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "Jun 2022",
      endDate: "Present",
      location: "San Francisco, CA",
      description:
        "- Led the development of a customer-facing dashboard using React and TypeScript\n- Implemented RESTful APIs using Node.js and Express\n- Collaborated with cross-functional teams to deliver features on time\n- Mentored junior developers and conducted code reviews",
    },
    {
      company: "Web Innovations",
      position: "Software Engineer",
      startDate: "Jul 2020",
      endDate: "May 2022",
      location: "San Francisco, CA",
      description:
        "- Developed and maintained front-end applications using React\n- Worked with backend team to integrate APIs\n- Improved application performance by 30%\n- Participated in agile development processes",
    },
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description:
        "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented features like user authentication, product catalog, shopping cart, and payment processing.",
      technologies: "React, Node.js, Express, MongoDB, Stripe",
      link: "github.com/johndoe/ecommerce",
      startDate: "Jan 2022",
      endDate: "Apr 2022",
    },
    {
      name: "Task Management App",
      description:
        "Developed a task management application with drag-and-drop functionality, user authentication, and real-time updates.",
      technologies: "React, Firebase, Material UI",
      link: "github.com/johndoe/task-manager",
      startDate: "Sep 2021",
      endDate: "Dec 2021",
    },
  ],
  skills: {
    categories: ["Programming Languages", "Frameworks & Libraries", "Tools & Platforms"],
    skillsByCategory: {
      "Programming Languages": ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
      "Frameworks & Libraries": ["React", "Node.js", "Express", "Next.js", "Redux", "Tailwind CSS"],
      "Tools & Platforms": ["Git", "GitHub", "AWS", "Docker", "Jest", "Webpack"],
    },
    otherSkills: "Agile Methodologies, CI/CD, RESTful APIs, GraphQL, Database Design",
  },
}
