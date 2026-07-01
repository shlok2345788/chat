// Mock Data Service for Mock Examination Management System

const INITIAL_ACADEMIC_YEARS = {
  "2025-2026": {
    departments: {
      "Computer Engineering": {
        semesters: {
          "Semester III": {
            divisions: ["Division A", "Division B"],
            subjects: ["Data Structures", "Digital Logic", "Discrete Mathematics"]
          },
          "Semester V": {
            divisions: ["Division A", "Division B", "Division C"],
            subjects: ["Software Engineering", "Computer Networks", "Database Management Systems", "Theory of Computer Science"]
          }
        }
      },
      "Information Technology": {
        semesters: {
          "Semester V": {
            divisions: ["Division A", "Division B"],
            subjects: ["Operating Systems", "Web Application Development", "Cryptography & Network Security"]
          }
        }
      },
      "Electrical Engineering": {
        semesters: {
          "Semester V": {
            divisions: ["Division A"],
            subjects: ["Power Electronics", "Control Systems", "Microcontrollers"]
          }
        }
      }
    }
  },
  "2026-2027": {
    departments: {
      "Computer Engineering": {
        semesters: {
          "Semester I": {
            divisions: ["Division A", "Division B"],
            subjects: ["Basic Mathematics", "Communication Skills", "Computer Fundamentals"]
          }
        }
      }
    }
  }
};

const CHAPTERS_BY_SUBJECT = {
  "Software Engineering": [
    "Ch 1: Introduction to Software Processes",
    "Ch 2: Agile Development",
    "Ch 3: Requirements Engineering",
    "Ch 4: System Modeling",
    "Ch 5: Architectural Design"
  ],
  "Computer Networks": [
    "Ch 1: Physical Layer & Mediums",
    "Ch 2: Data Link Protocols",
    "Ch 3: Network Routing Algorithms",
    "Ch 4: Transport Layer TCP/UDP",
    "Ch 5: Application Protocols"
  ],
  "Database Management Systems": [
    "Ch 1: ER Diagrams",
    "Ch 2: Relational Schema & Keys",
    "Ch 3: SQL Queries & Joins",
    "Ch 4: Transaction & Concurrency"
  ]
};

const MOCK_QUESTIONS = [
  {
    id: "q-1",
    subject: "Software Engineering",
    chapter: "Ch 1: Introduction to Software Processes",
    type: "MCQ",
    text: "Which model is most appropriate when requirements are well-defined and stable?",
    options: ["Waterfall Model", "Spiral Model", "Agile Scrum", "Incremental Model"],
    correctAnswer: "Waterfall Model",
    marks: 5,
    difficulty: "Easy",
    tags: ["Process-Models", "Waterfall"],
    favorite: true
  },
  {
    id: "q-2",
    subject: "Software Engineering",
    chapter: "Ch 2: Agile Development",
    type: "MCQ",
    text: "What is the typical duration of a sprint in Agile Scrum methodology?",
    options: ["1 to 4 weeks", "6 months", "1 day", "1 year"],
    correctAnswer: "1 to 4 weeks",
    marks: 5,
    difficulty: "Easy",
    tags: ["Agile", "Scrum"],
    favorite: false
  },
  {
    id: "q-3",
    subject: "Software Engineering",
    chapter: "Ch 3: Requirements Engineering",
    type: "MCQ",
    text: "Which of the following is considered a non-functional requirement?",
    options: ["System response time must be under 2 seconds", "Allow users to log in with Google OAuth", "Export results table in PDF format", "Enable search filtering on courses"],
    correctAnswer: "System response time must be under 2 seconds",
    marks: 5,
    difficulty: "Medium",
    tags: ["Requirements", "NFR"],
    favorite: true
  },
  {
    id: "q-4",
    subject: "Software Engineering",
    chapter: "Ch 4: System Modeling",
    type: "TF",
    text: "In UML diagrams, a dashed arrow represents a dependency association.",
    options: ["True", "False"],
    correctAnswer: "True",
    marks: 2,
    difficulty: "Medium",
    tags: ["UML", "Modeling"],
    favorite: false
  },
  {
    id: "q-5",
    subject: "Software Engineering",
    chapter: "Ch 5: Architectural Design",
    type: "Descriptive",
    text: "Explain the Model-View-Controller (MVC) architecture and its primary benefits in web engineering.",
    correctAnswer: "MVC splits an application into three interconnected parts: Model (data), View (UI), and Controller (logic). This decoupling allows parallel development, easy modification, and clean organization.",
    marks: 10,
    difficulty: "Hard",
    tags: ["Architecture", "MVC"],
    favorite: true
  },
  // Computer Networks
  {
    id: "q-6",
    subject: "Computer Networks",
    chapter: "Ch 3: Network Routing Algorithms",
    type: "MCQ",
    text: "Which routing protocol uses the Dijkstra algorithm to determine the shortest path?",
    options: ["OSPF", "RIP", "BGP", "ICMP"],
    correctAnswer: "OSPF",
    marks: 5,
    difficulty: "Hard",
    tags: ["Routing", "OSPF"],
    favorite: true
  },
  {
    id: "q-7",
    subject: "Computer Networks",
    chapter: "Ch 4: Transport Layer TCP/UDP",
    type: "TF",
    text: "UDP is a connection-oriented and reliable protocol that uses 3-way handshakes.",
    options: ["True", "False"],
    correctAnswer: "False",
    marks: 2,
    difficulty: "Easy",
    tags: ["Transport-Layer", "UDP"],
    favorite: false
  }
];

const INITIAL_EXAMS = [
  {
    id: "exam-1",
    name: "Software Engineering End-Sem Mock Exam",
    academicYear: "2025-2026",
    department: "Computer Engineering",
    semester: "Semester V",
    division: "Division A",
    subject: "Software Engineering",
    examType: "Mock Semester Exam",
    faculty: "Prof. R. D. Sen",
    totalQuestions: 5,
    duration: 15, // in minutes
    status: "Published", // Draft, Published, Upcoming, Expired
    attemptsAllowed: 2,
    createdDate: "2026-06-25",
    shuffleQuestions: true,
    shuffleOptions: true,
    randomQuestionGen: false,
    timerPerExam: true,
    timerPerQuestion: false,
    autoSubmitOnTimeout: true,
    fullscreenMode: true,
    preventTabSwitch: true,
    maxTabSwitches: 3,
    passingMarks: 12, // out of 27
    sections: [
      { id: "sec-mcq", name: "Section A: Multiple Choice Questions", type: "MCQ" },
      { id: "sec-tf", name: "Section B: True/False Questions", type: "TF" },
      { id: "sec-desc", name: "Section C: Descriptive", type: "Descriptive" }
    ],
    questions: [
      { ...MOCK_QUESTIONS[0], sectionId: "sec-mcq" },
      { ...MOCK_QUESTIONS[1], sectionId: "sec-mcq" },
      { ...MOCK_QUESTIONS[2], sectionId: "sec-mcq" },
      { ...MOCK_QUESTIONS[3], sectionId: "sec-tf" },
      { ...MOCK_QUESTIONS[4], sectionId: "sec-desc" }
    ]
  },
  {
    id: "exam-2",
    name: "Computer Networks Unit Test - 1",
    academicYear: "2025-2026",
    department: "Computer Engineering",
    semester: "Semester V",
    division: "Division A",
    subject: "Computer Networks",
    examType: "Unit Test 1",
    faculty: "Prof. K. A. Verma",
    totalQuestions: 2,
    duration: 10,
    status: "Upcoming",
    attemptsAllowed: 1,
    createdDate: "2026-06-29",
    startDate: "2026-07-05T09:00:00",
    shuffleQuestions: false,
    shuffleOptions: false,
    randomQuestionGen: false,
    timerPerExam: true,
    timerPerQuestion: false,
    autoSubmitOnTimeout: true,
    fullscreenMode: false,
    preventTabSwitch: false,
    passingMarks: 4,
    sections: [
      { id: "sec-1", name: "General CN questions", type: "MCQ" }
    ],
    questions: [
      { ...MOCK_QUESTIONS[5], sectionId: "sec-1" },
      { ...MOCK_QUESTIONS[6], sectionId: "sec-1" }
    ]
  },
  {
    id: "exam-3",
    name: "Database Management Systems Revision Test",
    academicYear: "2025-2026",
    department: "Computer Engineering",
    semester: "Semester V",
    division: "Division A",
    subject: "Database Management Systems",
    examType: "Unit Test 2",
    faculty: "Prof. R. D. Sen",
    totalQuestions: 0,
    duration: 20,
    status: "Draft",
    attemptsAllowed: 3,
    createdDate: "2026-06-30",
    shuffleQuestions: true,
    shuffleOptions: true,
    randomQuestionGen: false,
    timerPerExam: true,
    timerPerQuestion: false,
    autoSubmitOnTimeout: true,
    fullscreenMode: true,
    preventTabSwitch: true,
    passingMarks: 8,
    sections: [],
    questions: []
  }
];

const INITIAL_ATTEMPTS = [
  {
    id: "att-1",
    examId: "exam-1",
    studentId: "std-2",
    studentName: "Priya Patil",
    rollNumber: "CO-502",
    department: "Computer Engineering",
    marksObtained: 22,
    totalMarks: 27,
    percentage: 81.5,
    timeTaken: 360, // 6 minutes
    submittedAt: "2026-07-01T10:15:00Z",
    attemptCount: 1,
    answers: {
      "q-1": "Waterfall Model", // correct 5
      "q-2": "1 to 4 weeks", // correct 5
      "q-3": "System response time must be under 2 seconds", // correct 5
      "q-4": "True", // correct 2
      "q-5": "MVC is an architectural design separating database structures from the presentation layer to streamline layouts." // partial descriptive correct (assigned 5/10)
    },
    questionFeedback: {
      "q-1": { correct: true, score: 5 },
      "q-2": { correct: true, score: 5 },
      "q-3": { correct: true, score: 5 },
      "q-4": { correct: true, score: 2 },
      "q-5": { correct: null, score: 5 } // faculty assigned 5
    }
  },
  {
    id: "att-2",
    examId: "exam-1",
    studentId: "std-1",
    studentName: "Amit Sharma",
    rollNumber: "CO-501",
    department: "Computer Engineering",
    marksObtained: 22,
    totalMarks: 27,
    percentage: 81.5,
    timeTaken: 420, // 7 minutes (longer time taken -> ranks below Priya)
    submittedAt: "2026-07-01T10:00:00Z",
    attemptCount: 1,
    answers: {
      "q-1": "Waterfall Model",
      "q-2": "1 to 4 weeks",
      "q-3": "System response time must be under 2 seconds",
      "q-4": "True",
      "q-5": "MVC means Model View Controller which splits the view layout code from logic controllers."
    },
    questionFeedback: {
      "q-1": { correct: true, score: 5 },
      "q-2": { correct: true, score: 5 },
      "q-3": { correct: true, score: 5 },
      "q-4": { correct: true, score: 2 },
      "q-5": { correct: null, score: 5 }
    }
  },
  {
    id: "att-3",
    examId: "exam-1",
    studentId: "std-3",
    studentName: "Rohan Das",
    rollNumber: "CO-503",
    department: "Computer Engineering",
    marksObtained: 22,
    totalMarks: 27,
    percentage: 81.5,
    timeTaken: 360, // 6 minutes (same marks and time as Priya, but Rohan submitted at 09:45, earlier than Priya's 10:15 -> ranks above Priya!)
    submittedAt: "2026-07-01T09:45:00Z",
    attemptCount: 1,
    answers: {
      "q-1": "Waterfall Model",
      "q-2": "1 to 4 weeks",
      "q-3": "System response time must be under 2 seconds",
      "q-4": "True",
      "q-5": "MVC splits data, visuals and logical control into three layers for clean architecture."
    },
    questionFeedback: {
      "q-1": { correct: true, score: 5 },
      "q-2": { correct: true, score: 5 },
      "q-3": { correct: true, score: 5 },
      "q-4": { correct: true, score: 2 },
      "q-5": { correct: null, score: 5 }
    }
  }
];

const INITIAL_NOTIFICATIONS = [
  { id: "n-1", text: "Mock Semester exam 'Software Engineering Mock Exam' is now open for attempts.", date: "2026-07-01" },
  { id: "n-2", text: "Computer Networks exam is scheduled for July 5th, 2026.", date: "2026-06-30" }
];

export const getDB = () => {
  const years = localStorage.getItem("exam_academic_years");
  const exams = localStorage.getItem("exam_exams");
  const questions = localStorage.getItem("exam_questions");
  const attempts = localStorage.getItem("exam_attempts");
  const notifications = localStorage.getItem("exam_notifications");
  const activeUser = localStorage.getItem("exam_active_role") || "Faculty"; // Default roles: Admin, Faculty, Student
  const currentStudentId = localStorage.getItem("exam_student_id") || "std-1";

  if (!years) localStorage.setItem("exam_academic_years", JSON.stringify(INITIAL_ACADEMIC_YEARS));
  if (!exams) localStorage.setItem("exam_exams", JSON.stringify(INITIAL_EXAMS));
  if (!questions) localStorage.setItem("exam_questions", JSON.stringify(MOCK_QUESTIONS));
  if (!attempts) localStorage.setItem("exam_attempts", JSON.stringify(INITIAL_ATTEMPTS));
  if (!notifications) localStorage.setItem("exam_notifications", JSON.stringify(INITIAL_NOTIFICATIONS));

  return {
    academicYears: years ? JSON.parse(years) : INITIAL_ACADEMIC_YEARS,
    exams: exams ? JSON.parse(exams) : INITIAL_EXAMS,
    questions: questions ? JSON.parse(questions) : MOCK_QUESTIONS,
    attempts: attempts ? JSON.parse(attempts) : INITIAL_ATTEMPTS,
    notifications: notifications ? JSON.parse(notifications) : INITIAL_NOTIFICATIONS,
    activeRole: activeUser,
    currentStudentId
  };
};

export const updateDB = (key, data) => {
  localStorage.setItem(`exam_${key}`, JSON.stringify(data));
};

export const getChaptersBySubject = (subject) => {
  return CHAPTERS_BY_SUBJECT[subject] || ["Ch 1: General Concept 1", "Ch 2: General Concept 2", "Ch 3: General Concept 3"];
};

export const getToppersForExam = (examId) => {
  const db = getDB();
  const examAttempts = db.attempts.filter(a => a.examId === examId);

  // Sorting logic:
  // 1. Higher marksObtained first
  // 2. If marks are same -> less timeTaken first
  // 3. If still same -> earlier submission time (submittedAt) first
  return [...examAttempts].sort((a, b) => {
    if (b.marksObtained !== a.marksObtained) {
      return b.marksObtained - a.marksObtained;
    }
    if (a.timeTaken !== b.timeTaken) {
      return a.timeTaken - b.timeTaken;
    }
    return new Date(a.submittedAt) - new Date(b.submittedAt);
  });
};
