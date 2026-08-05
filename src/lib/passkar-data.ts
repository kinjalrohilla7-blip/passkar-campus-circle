import books from "@/assets/res-books.jpg";
import cycle from "@/assets/res-cycle.jpg";
import guitar from "@/assets/res-guitar.jpg";
import electronics from "@/assets/res-electronics.jpg";
import lab from "@/assets/res-lab.jpg";
import furniture from "@/assets/res-furniture.jpg";

export const images = { books, cycle, guitar, electronics, lab, furniture };

export const currentUser = {
  name: "Priyansh Mehra",
  initials: "PM",
  branch: "Computer Science & Engineering",
  semester: "Semester 5",
  residence: "Hosteller · Block C",
  college: "Sardar Patel Institute of Technology",
  email: "priyansh.m22@spit.ac.in",
  circularScore: 782,
  savedThisSemester: 18450,
  rescued: 27,
  helped: 41,
  co2: 96,
};

export type Category = {
  slug: string;
  name: string;
  count: number;
  sub: string[];
  note: string;
};

export const categories: Category[] = [
  {
    slug: "books",
    name: "Books",
    count: 1284,
    note: "Semester sets, reference texts, handwritten notes",
    sub: ["Semester Textbooks", "Reference & Competitive", "Handwritten Notes", "Question Banks"],
  },
  {
    slug: "electronics",
    name: "Electronics",
    count: 476,
    note: "Calculators, boards, drives, peripherals",
    sub: ["Calculators", "Arduino & Boards", "Monitors & Peripherals", "Storage"],
  },
  {
    slug: "furniture",
    name: "Furniture",
    count: 218,
    note: "Study tables, chairs, shelves, lamps",
    sub: ["Study Tables", "Chairs", "Shelves", "Lamps"],
  },
  {
    slug: "hostel",
    name: "Hostel Essentials",
    count: 903,
    note: "Buckets, kettles, mattresses, cupboards",
    sub: ["Kitchen", "Bedding", "Storage", "Cleaning"],
  },
  {
    slug: "cycles",
    name: "Cycles",
    count: 132,
    note: "Campus commuters, geared cycles, spares",
    sub: ["City Cycles", "Geared Cycles", "Spares & Repair", "Helmets"],
  },
  {
    slug: "lab",
    name: "Lab Equipment",
    count: 341,
    note: "Coats, kits, instruments, drawing sets",
    sub: ["Lab Coats", "Drawing Kits", "Measuring Instruments", "Safety Gear"],
  },
  {
    slug: "music",
    name: "Musical Instruments",
    count: 87,
    note: "Guitars, keyboards, percussion, accessories",
    sub: ["Guitars", "Keyboards", "Percussion", "Accessories"],
  },
  {
    slug: "sports",
    name: "Sports Equipment",
    count: 264,
    note: "Rackets, cricket kits, gym gear, jerseys",
    sub: ["Racket Sports", "Cricket", "Fitness", "Team Kits"],
  },
];

export type JourneyStep = {
  name: string;
  batch: string;
  action: string;
  date: string;
  note?: string;
};

export type Resource = {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  image: string;
  condition: string;
  conditionScore: number;
  mode: "Borrow" | "Sell" | "Donate" | "Exchange";
  price: string;
  distance: string;
  department: string;
  owner: string;
  ownerBatch: string;
  verified: boolean;
  hands: number;
  moneySaved: number;
  co2Saved: number;
  studentsHelped: number;
  remainingLife: number;
  repairs: string[];
  description: string;
  journey: JourneyStep[];
};

export const resources: Resource[] = [
  {
    id: "engineering-graphics",
    title: "Engineering Graphics — Bhatt & Panchal",
    category: "Books",
    categorySlug: "books",
    subcategory: "Semester Textbooks",
    image: books,
    condition: "Good",
    conditionScore: 78,
    mode: "Borrow",
    price: "Free for 1 semester",
    distance: "220 m · Library Wing",
    department: "Mechanical Engineering",
    owner: "Sneha Kulkarni",
    ownerBatch: "Batch 2026",
    verified: true,
    hands: 4,
    moneySaved: 3240,
    co2Saved: 11.4,
    studentsHelped: 4,
    remainingLife: 72,
    repairs: ["Spine re-taped — Aug 2024", "Cover laminated — Jan 2025"],
    description:
      "The first-year drawing bible. Every isometric projection in this copy has pencil annotations from four students who cleared the subject with it. Diagrams on pages 112-140 are marked with the exact steps our professors expect.",
    journey: [
      { name: "Rahul Deshpande", batch: "Batch 2024", action: "Original owner", date: "Jul 2021", note: "Bought new for ₹640" },
      { name: "Sneha Kulkarni", batch: "Batch 2026", action: "Passed on graduation", date: "May 2024", note: "Added colour-coded index" },
      { name: "Aman Qureshi", batch: "Batch 2027", action: "Passed forward", date: "Dec 2024" },
      { name: "Priyansh Mehra", batch: "Batch 2028", action: "Currently borrowed", date: "Aug 2026", note: "Returns after end-sems" },
      { name: "Next student", batch: "—", action: "Ready for its next reader", date: "Nov 2026" },
    ],
  },
  {
    id: "campus-cycle",
    title: "Hero Sprint Campus Cycle",
    category: "Cycles",
    categorySlug: "cycles",
    subcategory: "City Cycles",
    image: cycle,
    condition: "Very Good",
    conditionScore: 84,
    mode: "Sell",
    price: "₹2,400",
    distance: "40 m · Hostel Block C",
    department: "Civil Engineering",
    owner: "Ishan Barot",
    ownerBatch: "Batch 2026",
    verified: true,
    hands: 3,
    moneySaved: 9600,
    co2Saved: 142,
    studentsHelped: 3,
    remainingLife: 81,
    repairs: ["New brake pads — Feb 2026", "Chain replaced — Sep 2025", "Full service — Jun 2026"],
    description:
      "Three graduating batches have ridden this to 8 a.m. lectures. Serviced last month at the campus repair drive, tyres hold air for weeks, and the rear carrier fits a full lab kit.",
    journey: [
      { name: "Tanmay Rao", batch: "Batch 2022", action: "Original owner", date: "Aug 2018" },
      { name: "Farhan Shaikh", batch: "Batch 2024", action: "Sold within campus", date: "Jun 2022", note: "₹3,100" },
      { name: "Ishan Barot", batch: "Batch 2026", action: "Current owner", date: "Jul 2024" },
      { name: "Next student", batch: "—", action: "Listed before graduation", date: "Available now" },
    ],
  },
  {
    id: "acoustic-guitar",
    title: "Yamaha F310 Acoustic Guitar",
    category: "Musical Instruments",
    categorySlug: "music",
    subcategory: "Guitars",
    image: guitar,
    condition: "Good",
    conditionScore: 74,
    mode: "Borrow",
    price: "₹150 / week",
    distance: "610 m · Cultural Block",
    department: "Electronics & Telecom",
    owner: "Meera Iyer",
    ownerBatch: "Batch 2027",
    verified: true,
    hands: 5,
    moneySaved: 12800,
    co2Saved: 28,
    studentsHelped: 9,
    remainingLife: 68,
    repairs: ["Restrung — Jul 2026", "Nut filed — Mar 2025"],
    description:
      "The unofficial guitar of the Music Club. It has played every farewell night since 2020. Comes with a padded bag, spare strings, and a capo taped inside the case pocket.",
    journey: [
      { name: "Music Club", batch: "Est. 2019", action: "Club purchase", date: "Sep 2019" },
      { name: "Karan Puri", batch: "Batch 2023", action: "Long-term custodian", date: "Jan 2021" },
      { name: "Meera Iyer", batch: "Batch 2027", action: "Current custodian", date: "Aug 2025" },
      { name: "Open to borrow", batch: "—", action: "Weekly borrow slots open", date: "This week" },
    ],
  },
  {
    id: "casio-991",
    title: "Casio FX-991EX Scientific Calculator",
    category: "Electronics",
    categorySlug: "electronics",
    subcategory: "Calculators",
    image: electronics,
    condition: "Excellent",
    conditionScore: 92,
    mode: "Sell",
    price: "₹700",
    distance: "150 m · Academic Block A",
    department: "Computer Science",
    owner: "Devanshi Patil",
    ownerBatch: "Batch 2026",
    verified: true,
    hands: 2,
    moneySaved: 1900,
    co2Saved: 4.2,
    studentsHelped: 2,
    remainingLife: 90,
    repairs: ["Battery replaced — May 2026"],
    description:
      "Exam-hall approved, screen unscratched, all keys crisp. Sold with the original slide cover and the matrix-mode cheat card taped to the back.",
    journey: [
      { name: "Devanshi Patil", batch: "Batch 2026", action: "Original owner", date: "Aug 2022" },
      { name: "Aarav Nair", batch: "Batch 2027", action: "Borrowed for end-sems", date: "Nov 2025" },
      { name: "Next student", batch: "—", action: "Listed before graduation", date: "Available now" },
    ],
  },
  {
    id: "lab-coat",
    title: "Lab Coat + Safety Goggles Set",
    category: "Lab Equipment",
    categorySlug: "lab",
    subcategory: "Lab Coats",
    image: lab,
    condition: "Good",
    conditionScore: 70,
    mode: "Donate",
    price: "Free",
    distance: "330 m · Chemistry Lab",
    department: "Chemical Engineering",
    owner: "Nikhil Sawant",
    ownerBatch: "Batch 2026",
    verified: false,
    hands: 3,
    moneySaved: 2100,
    co2Saved: 9.6,
    studentsHelped: 3,
    remainingLife: 60,
    repairs: ["Washed and pressed — Jul 2026", "Button re-stitched — 2025"],
    description:
      "Size M, freshly laundered, no stains. Donated to the first-year chemistry batch so nobody has to buy a coat they will wear for two semesters.",
    journey: [
      { name: "Anaya Ghosh", batch: "Batch 2023", action: "Original owner", date: "Jul 2019" },
      { name: "Nikhil Sawant", batch: "Batch 2026", action: "Received via Legacy Wall", date: "Jun 2023" },
      { name: "First-year pool", batch: "—", action: "Donated to department pool", date: "Available now" },
    ],
  },
  {
    id: "study-desk",
    title: "Wooden Study Chair & Shelf",
    category: "Furniture",
    categorySlug: "furniture",
    subcategory: "Chairs",
    image: furniture,
    condition: "Fair",
    conditionScore: 62,
    mode: "Exchange",
    price: "Exchange for a desk lamp",
    distance: "90 m · Hostel Block D",
    department: "Information Technology",
    owner: "Rhea Menon",
    ownerBatch: "Batch 2026",
    verified: true,
    hands: 4,
    moneySaved: 5400,
    co2Saved: 38,
    studentsHelped: 4,
    remainingLife: 55,
    repairs: ["Leg joint re-glued — Jan 2026", "Sanded and polished — 2024"],
    description:
      "Solid teak, survived four hostel shifts and one monsoon. The shelf holds a full semester of books plus a kettle. Happy to swap for a working desk lamp.",
    journey: [
      { name: "Hostel Store", batch: "2017", action: "Campus inventory", date: "Jun 2017" },
      { name: "Vivek Kadam", batch: "Batch 2022", action: "Allotted", date: "Jul 2018" },
      { name: "Rhea Menon", batch: "Batch 2026", action: "Current owner", date: "Aug 2023" },
      { name: "Next student", batch: "—", action: "Open for exchange", date: "Available now" },
    ],
  },
];

export const skills = [
  {
    id: "dsa",
    title: "DSA & Interview Prep",
    mentor: "Aditya Raghavan",
    batch: "Batch 2026 · Placed at Zeta",
    type: "Teach",
    rating: 4.9,
    reviews: 38,
    match: 96,
    sessions: 24,
    blurb: "Six-week sprint from arrays to graphs, using the exact sheet that got 11 juniors placed.",
  },
  {
    id: "figma",
    title: "Product Design in Figma",
    mentor: "Ira Bhattacharya",
    batch: "Batch 2027 · Design Club Lead",
    type: "Teach",
    rating: 4.8,
    reviews: 21,
    match: 88,
    sessions: 16,
    blurb: "Auto-layout, design tokens and how to present a case study that gets internship replies.",
  },
  {
    id: "tabla",
    title: "Tabla for Absolute Beginners",
    mentor: "Sarthak Joshi",
    batch: "Batch 2026 · Music Club",
    type: "Exchange",
    rating: 5,
    reviews: 12,
    match: 71,
    sessions: 9,
    blurb: "Trade lessons — teach me Python, I'll teach you teentaal. Two evenings a week at the amphitheatre.",
  },
  {
    id: "matlab",
    title: "MATLAB & Simulink Labs",
    mentor: "Prof. assistant Kavya Rao",
    batch: "Batch 2025 · TA, Signals Lab",
    type: "Learn",
    rating: 4.7,
    reviews: 29,
    match: 83,
    sessions: 31,
    blurb: "Walkthroughs for every lab experiment in the Signals & Systems manual, plus viva prep.",
  },
  {
    id: "gate",
    title: "GATE CS Mentorship",
    mentor: "Harshita Menon",
    batch: "Batch 2024 · AIR 312",
    type: "Mentorship",
    rating: 4.9,
    reviews: 44,
    match: 91,
    sessions: 52,
    blurb: "Monthly plan reviews, mock analysis and the notes that actually mattered in the last three papers.",
  },
  {
    id: "photography",
    title: "Campus Photography",
    mentor: "Zoya Merchant",
    batch: "Batch 2027 · Media Cell",
    type: "Exchange",
    rating: 4.6,
    reviews: 15,
    match: 64,
    sessions: 11,
    blurb: "Manual mode, campus light and editing. Borrow the Media Cell's spare body during sessions.",
  },
];

export const communityGroups = {
  champions: [
    { name: "Anushka Kale", role: "Campus Champion · Hostel C", rescued: 96, note: "Runs the Sunday collection drive" },
    { name: "Yash Tandel", role: "Campus Champion · Library", rescued: 74, note: "Verifies every book listing" },
    { name: "Fatima Ansari", role: "Verified Volunteer · Labs", rescued: 58, note: "Repairs lab kits before reuse" },
  ],
  studyGroups: [
    { name: "Operating Systems — Unit 3 Sprint", members: 14, when: "Tue & Thu, 8 PM · Library Room 2" },
    { name: "Thermodynamics Doubt Circle", members: 22, when: "Sat, 11 AM · Mech Seminar Hall" },
    { name: "Placement Aptitude Daily", members: 61, when: "Every weekday, 7 AM · Online" },
  ],
  projectTeams: [
    { name: "Solar Charging Bench for Quad", members: 6, need: "Needs 1 embedded dev" },
    { name: "Campus Waste Mapping (SDG 12)", members: 9, need: "Needs 2 data analysts" },
    { name: "PassKar Repair Café", members: 4, need: "Needs a carpenter mentor" },
  ],
  drives: [
    { name: "Graduation Handover Week", when: "12–19 May", goal: "1,000 items rescued", progress: 68 },
    { name: "First-Year Starter Kits", when: "1–8 July", goal: "400 kits assembled", progress: 42 },
    { name: "Monsoon Book Rescue", when: "20–24 June", goal: "600 books dried & rebound", progress: 87 },
  ],
  lostFound: [
    { item: "Black Casio watch", where: "Found near Canteen 2", when: "2 hours ago" },
    { item: "Blue Nalgene bottle", where: "Lost in Library Wing", when: "Yesterday" },
    { item: "ID card — Sem 3, IT", where: "Found at Gate 1", when: "3 days ago" },
  ],
  events: [
    { name: "Repair Café: Cycles & Lamps", when: "Sat 10 AM · Workshop Shed", going: 84 },
    { name: "Legacy Wall Open Mic", when: "Fri 6 PM · Amphitheatre", going: 132 },
    { name: "Zero-Waste Hostel Audit", when: "Sun 9 AM · Block A–D", going: 47 },
  ],
};

export const legacyPosts = [
  {
    id: 1,
    author: "Rahul Deshpande",
    batch: "Batch 2024 · Mechanical",
    type: "Books & Notes",
    title: "Every Mechanical semester note I ever wrote",
    body: "Four years of handwritten notes, indexed by unit and marked with what actually appeared in papers. Collect from the Mech department store — ask for the green box with my name on it.",
    reactions: 214,
  },
  {
    id: 2,
    author: "Harshita Menon",
    batch: "Batch 2024 · CSE",
    type: "Roadmap",
    title: "The GATE roadmap that got me AIR 312",
    body: "Month-by-month plan, the three books worth buying, and the eleven YouTube playlists I'd skip if I did it again. Message me in October if you want a mock review.",
    reactions: 389,
  },
  {
    id: 3,
    author: "Farhan Shaikh",
    batch: "Batch 2024 · IT",
    type: "Interview Experience",
    title: "18 rounds, 3 offers — the honest version",
    body: "What I was actually asked at each company, what I got wrong, and the two behavioural answers that changed everything. Nobody tells juniors how boring the preparation really is.",
    reactions: 276,
  },
  {
    id: 4,
    author: "Anaya Ghosh",
    batch: "Batch 2023 · Chemical",
    type: "Advice",
    title: "To the person who gets my hostel room",
    body: "The desk drawer sticks — lift it slightly. The window catches the best morning light in Block A. Join one club that has nothing to do with your branch. It will matter more than your CGPA.",
    reactions: 512,
  },
  {
    id: 5,
    author: "Karan Puri",
    batch: "Batch 2023 · E&TC",
    type: "Projects",
    title: "Open-sourcing my final year IoT project",
    body: "Full schematics, BOM with campus-market prices, and the failure log. Two juniors have already extended it — please don't rebuild the same air quality monitor from scratch.",
    reactions: 168,
  },
  {
    id: 6,
    author: "Tanvi Shirke",
    batch: "Batch 2024 · CSE",
    type: "Mentorship",
    title: "I'll review one resume a week, forever",
    body: "Wherever I end up working, I'm keeping Sunday evenings for PassKar juniors. Send the PDF, get it back with comments by Monday. This is my way of paying back the seniors who did it for me.",
    reactions: 431,
  },
];

export const conversations = [
  {
    id: "sneha",
    name: "Sneha Kulkarni",
    handle: "Mechanical · Batch 2026",
    verified: true,
    unread: 2,
    last: "The book is at the library desk, ask for shelf 4B",
    time: "5m",
    messages: [
      { from: "them", text: "Hey! Saw you requested the Engineering Graphics book 📘", time: "6:12 PM" },
      { from: "them", text: "It's already been through three students — the annotations are the best part.", time: "6:12 PM" },
      { from: "me", text: "That's exactly why I want it. Can I collect it tomorrow?", time: "6:20 PM" },
      { from: "them", text: "The book is at the library desk, ask for shelf 4B", time: "6:21 PM" },
    ],
  },
  {
    id: "ishan",
    name: "Ishan Barot",
    handle: "Civil · Batch 2026",
    verified: true,
    unread: 0,
    last: "Cycle serviced last week, brakes are new",
    time: "1h",
    messages: [
      { from: "me", text: "Is the Hero Sprint still available?", time: "4:02 PM" },
      { from: "them", text: "Cycle serviced last week, brakes are new", time: "4:40 PM" },
    ],
  },
  {
    id: "champions",
    name: "Campus Champions",
    handle: "24 members · Verified group",
    verified: true,
    unread: 5,
    last: "Anushka: Handover Week volunteers needed for Block C",
    time: "3h",
    messages: [
      { from: "them", text: "Anushka: Handover Week volunteers needed for Block C", time: "2:15 PM" },
      { from: "them", text: "Yash: I can take Saturday morning 🙌", time: "2:31 PM" },
      { from: "me", text: "Put me down for Saturday too.", time: "2:44 PM" },
    ],
  },
  {
    id: "meera",
    name: "Meera Iyer",
    handle: "E&TC · Batch 2027",
    verified: false,
    unread: 0,
    last: "Guitar is free this weekend if you still want it",
    time: "Yesterday",
    messages: [
      { from: "them", text: "Guitar is free this weekend if you still want it", time: "9:04 PM" },
    ],
  },
];

export const activity = [
  { who: "Aman Qureshi", what: "passed Engineering Graphics to you", when: "2 hours ago", tone: "pass" },
  { who: "You", what: "donated a desk lamp to the first-year pool", when: "Yesterday", tone: "donate" },
  { who: "Anushka Kale", what: "verified your cycle listing", when: "Yesterday", tone: "verify" },
  { who: "Harshita Menon", what: "replied to your GATE mentorship request", when: "2 days ago", tone: "skill" },
  { who: "Legacy Wall", what: "3 new posts from graduating CSE seniors", when: "3 days ago", tone: "legacy" },
];

export const semesterStats = [
  { month: "Jan", saved: 6200, items: 24 },
  { month: "Feb", saved: 9400, items: 38 },
  { month: "Mar", saved: 12800, items: 52 },
  { month: "Apr", saved: 15100, items: 61 },
  { month: "May", saved: 24600, items: 98 },
  { month: "Jun", saved: 18900, items: 74 },
  { month: "Jul", saved: 21300, items: 86 },
  { month: "Aug", saved: 27400, items: 112 },
];

export const campusBreakdown = [
  { name: "Books", value: 1284 },
  { name: "Hostel", value: 903 },
  { name: "Electronics", value: 476 },
  { name: "Lab", value: 341 },
  { name: "Sports", value: 264 },
  { name: "Furniture", value: 218 },
];

export const achievements = [
  { name: "First Pass", detail: "Passed your first resource forward", done: true },
  { name: "Chain Builder", detail: "An item you listed reached its 3rd student", done: true },
  { name: "Repair Hero", detail: "Fixed an item instead of replacing it", done: true },
  { name: "Legacy Keeper", detail: "Left a Legacy Wall post before graduating", done: false },
  { name: "Department Anchor", detail: "Helped 50 students in one branch", done: false },
  { name: "Zero-Waste Semester", detail: "Bought nothing new for a full semester", done: false },
];
