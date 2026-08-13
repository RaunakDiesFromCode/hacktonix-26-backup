/* =========================================================
   EVENT STATUS CONFIG
   ---------------------------------------------------------
   Single switch that controls which timeline is shown.
   Flip comingSoon → true when dates aren't finalized.
   ========================================================= */

export const EVENT_STATUS = {
    comingSoon: false,
    dateText: "18–19 APRIL, FIEM Sonarpur",
};

/* =========================================================
   CORE TYPES
   ---------------------------------------------------------
   Central type definitions used across the app.
   Keep all shared interfaces here so you don't duplicate.
   ========================================================= */

export interface TimelineEvent {
    time: string; // "12:00 PM"
    title: string; // "Check-In & Verification"
}

export interface TimelineDayData {
    day: string; // Day 01 / Phase 01
    date: string; // 17th April / TBA
    dateLabel: string; // Subtitle
    events: TimelineEvent[];
}

export type PersonRole = "mentor" | "judge";

export type Person = {
    id: number;
    name: string;
    role: PersonRole;
    title: string;
    avatar: string;
};

export type Sponsor = {
    id: string;
    name: string;
    logo: string;
    website?: string;
};

export type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

/* =========================================================
   MAIN EVENT TIMELINE (LOCKED DATES)
   ---------------------------------------------------------
   Used when event schedule is finalized.
   ========================================================= */

export const TIMELINE = [
    {
        day: "Day 01",
        date: "18th April",
        dateLabel: "Kickoff & Chaos",
        events: [
            { time: "11:00 AM", title: "Reporting & Document Verification" },
            { time: "12:00 PM", title: "Inauguration Ceremony Start" },
            { time: "01:00 PM", title: "Hackathon Start" },
            { time: "02:00 PM", title: "1st Mentoring Session" },
            { time: "07:30 PM", title: "First Judging Round" },
            { time: "09:30 PM", title: "Dinner Break" },
            { time: "11:30 PM", title: "Break" },
        ],
    },
    {
        day: "Day 02",
        date: "19th April",
        dateLabel: "Execution & Glory",
        events: [
            { time: "02:00 AM", title: "2nd Mentoring Session" },
            { time: "03:00 AM", title: "Snacks and Coffee Break" },
            { time: "09:00 AM", title: "Breakfast Break" },
            { time: "09:30 AM", title: "2nd Judging Round" },
            { time: "11:30 AM", title: "Final Judging Round" },
            { time: "12:30 PM", title: "Ending Ceremony and Prize Distribution" },
        ],
    },
];

/* =========================================================
   COMING SOON TIMELINE (PLACEHOLDER MODE)
   ---------------------------------------------------------
   Used before final schedule exists.
   Keeps hype alive without lying to users.
   ========================================================= */

export const COMING_SOON_TIMELINE: TimelineDayData[] = [
     {
        day: "Day 01",
        date: "18th April",
        dateLabel: "Kickoff & Chaos",
        events: [
            { time: "11:00 AM", title: "Reporting & Document Verification" },
            { time: "12:00 PM", title: "Inauguration Ceremony Start" },
            { time: "01:00 PM", title: "Hackathon Start" },
            { time: "02:00 PM", title: "1st Mentoring Session" },
            { time: "07:30 PM", title: "First Judging Round" },
            { time: "09:30 PM", title: "Dinner Break" },
            { time: "11:30 PM", title: "Break" },
        ],
    },
    {
        day: "Day 02",
        date: "19th April",
        dateLabel: "Execution & Glory",
        events: [
            { time: "02:00 AM", title: "2nd Mentoring Session" },
            { time: "03:00 AM", title: "Snacks and Coffee Break" },
            { time: "09:00 AM", title: "Breakfast Break" },
            { time: "09:30 AM", title: "2nd Judging Round" },
            { time: "11:30 AM", title: "Final Judging Round" },
            { time: "12:30 PM", title: "Ending Ceremony and Prize Distribution" },
        ],
    },
];

/* =========================================================
   ACTIVE TIMELINE SWITCH
   ---------------------------------------------------------
   Single source of truth for UI consumption.
   Your components should ONLY import this.
   ========================================================= */

// export const ACTIVE_TIMELINE: TimelineDayData[] = EVENT_STATUS.comingSoon
//     ? COMING_SOON_TIMELINE
//     : TIMELINE;
export const ACTIVE_TIMELINE: TimelineDayData[] = COMING_SOON_TIMELINE



/* =========================================================
   PEOPLE (MENTORS / JUDGES)
   ---------------------------------------------------------
   Empty now, plug later.
   ========================================================= */

export const PEOPLE: Person[] = [
    {
        id: 1,
        name: "Arpan Chowdhury",
        role: "judge",
        title: "SDE Frontend Intern @Springer Capital",
        avatar: "judge-mentor/hack-judge_e67vxy.webp",
    },
    {
        id: 3,
        name: "Dr. Abhay Nath",
        role: "judge",
        title: "AI-ML Research Scientist-II at CHARUSAT",
        avatar: "judge-mentor/hack-judge-3_wvdgyj.webp",
    },
    {
        id: 7,
        name: "Aditya Singh",
        role: "judge",
        title: "Mentee @Linux Foundation and SDE @Cromtek",
        avatar: "judge-mentor/hack-judge-5.jpeg",
    },
     {
        id: 9,
        name: "Sanglap Mridha",
        role: "judge",
        title: "SDE 2@Cozeva",
        avatar: "judge-mentor/IMG_0743~2.heif",
    },
     {
        id: 10,
        name: "Jhalak Dutta",
        role: "judge",
        title: "Assistant Professor, Department of CSE, Heritage Institute of Technology, Kolkata",
        avatar: "judge-mentor/hack-judge-jhalak.jpeg",
    },
    {
        id: 11,
        name: "Narendra Nath Chatterjee",
        role: "judge",
        title: "Senior Android Engineer@ Ajaib Indonesia",
        avatar: "judge-mentor/judge-narendra.png",
    },
     {
        id: 4,
        name: "Sayanabha Chandra",
        role: "mentor",
        title: "Software Engineer Accenture",
        avatar: "judge-mentor/hack-judge-4_ywdowb.webp",
    },
    {
        id: 5,
        name: "Aymaan Shabbir Ibrahim",
        role: "mentor",
        title: "SYSTEMS ENGINEER @TCS",
        avatar: "judge-mentor/hack-mentor-1_j6vf2f.webp",
    },
     {
        id: 8,
        name: "Anindita Bhowmick",
        role: "judge",
        title: "Founder and CEO of Anibotix Robotics Private Limited",
        avatar: "judge-mentor/anindita.png",
    },
    {
        id: 2,
        name: "Souradip Pal",
        role: "mentor",
        title: "AI Engineer at CannerAI",
        avatar: "judge-mentor/souradip.png",
    },
];

/* =========================================================
   SPONSORS
   ---------------------------------------------------------
   Logos shown in marquee/grid.
   ========================================================= */

export const PREVIOUS_SPONSORS: Sponsor[] = [
  /* ===== Existing Sponsors ===== */

  {
    id: "s1",
    name: "RedBull",
    logo: "/sponsors/redbull.png",
    website: "https://www.redbull.com/",
  },
  {
    id: "s2",
    name: "CodeCrafters",
    logo: "/sponsors/codecrafter.png",
    website: "https://codecrafters.io/",
  },
  {
    id: "s3",
    name: "gen.xyz",
    logo: "/sponsors/xyz.png",
    website: "https://gen.xyz/",
  },
  {
    id: "s4",
    name: "GeeksforGeeks",
    logo: "/sponsors/gfg.png",
    website: "https://www.geeksforgeeks.org/",
  },
  {
    id: "s5",
    name: "Pizza Hut",
    logo: "/sponsors/pizzahut.png",
    website: "https://www.pizzahut.co.in/",
  },

  /* ===== Sponsors From Image ===== */

  {
    id: "s6",
    name: "Ardent Computech Pvt. Ltd.",
    logo: "/sponsors/ardent.png",
  },
  {
    id: "s7",
    name: "The Telegraph Edugraph",
    logo: "/sponsors/edugraph.png",
    website: "https://www.telegraphindia.com/edugraph",
  },
  {
    id: "s8",
    name: "Jamboree",
    logo: "/sponsors/jamboree.png",
    website: "https://www.jamboreeindia.com/",
  },
  {
    id: "s9",
    name: "LIC",
    logo: "/sponsors/lic.png",
    website: "https://licindia.in/",
  },
  {
    id: "s10",
    name: "Ogma TechLab",
    logo: "/sponsors/og.png",
  },
  {
    id: "s11",
    name: "Globsyn",
    logo: "/sponsors/globsyn.png",
    website: "https://globsyn.com/",
  },
  {
    id: "s12",
    name: "Finlatics",
    logo: "/sponsors/finlatics.png",
    website: "https://www.finlatics.com/",
  },
  {
    id: "s13",
    name: "Aptech Computer Education",
    logo: "/sponsors/aptech.png",
    website: "https://www.aptech-education.com/",
  },
  {
    id: "s14",
    name: "LINC",
    logo: "/sponsors/linc.png",
    website: "https://www.lincpens.com/",
  },
  {
    id: "s15",
    name: "Cipla",
    logo: "/sponsors/cipla.png",
    website: "https://www.cipla.com/",
  },
  {
    id: "s16",
    name: "Abbott",
    logo: "/sponsors/abbott.png",
    website: "https://www.abbott.com/",
  },
  {
    id: "s17",
    name: "The Kolkata Buzz",
    logo: "/sponsors/kolkatabuzz.png",
  },
];

export const CURRENT_SPONSORS: Sponsor[] = [
  {
    id: "c1",
    name: "CodeCrafters",
    logo: "/sponsors/codecrafter.png",
    website: "https://codecrafters.io/",
  },
   {
    id: "c2",
    name: "InterviewBuddy",
    logo: "/sponsors/interviewBuddy.png",
    website: "https://interviewbuddy.net/",
  },
  {
    id: "c3",
    name: "gen.xyz",
    logo: "/sponsors/xyz.png",
    website: "https://gen.xyz/",
  },
   {
    id: "c4",
    name: "PrepVerse",
    logo: "/sponsors/prepverse.png",
    website: "https://prepverse.io/",
  },
   {
    id: "c5",
    name: "n8n",
    logo: "/sponsors/n8n.png",
    website: "https://prepverse.io/",
  },

];
export const COMMUNITY_PARTNERS: Sponsor[] = [
  {
    id: "c1",
    name: "GDGocFIEM",
    logo: "/community_partners/fiem.jpg",
    website: "https://gdg.community.dev/gdg-on-campus-future-institute-of-engineering-management-kolkata-india/",

  },
   {
    id: "c2",
    name: "GDGocTMSL",
    logo: "/community_partners/tmsl.png",
    website: "https://gdg.community.dev/gdg-on-campus-techno-main-salt-lake-kolkata-india/",
  },
  {
    id: "c3",
    name: "NooBuild",
    logo: "/community_partners/NooBuild.jpeg",
    website: "https://www.noobuild.xyz/",
  },
  {
    id: "c4",
    name: "IEI Students' Chapter ECE",
    logo: "/community_partners/SCECE.png",
    website:"https://sceceaot.com"
  },
  {
    id: "c5",
    name: "Anonymous Legion",
    logo: "/community_partners/anynomous.png",
  },
  {
    id: "c6",
    name: "Ajinava Edge",
    logo: "/community_partners/ajinava.png",
    website: "https://www.teamilmtech.site/",
  }


];

/* =========================================================
   FAQ
   ---------------------------------------------------------
   Accordion content. Keep answers concise.
   ========================================================= */

export const FAQS: FaqItem[] = [
    {
        id: "faq-1",
        question: "What is HACKTONIX 5.0?",
        answer: "HACKTONIX 5.0 is a 24-hour in-person hackathon organized as part of Phoenix 2026. Participants team up to build innovative tech solutions, compete in multiple rounds, and present their projects to industry judges.",
    },
    {
        id: "faq-2",
        question: "Who can participate?",
        answer: "The hackathon is open to undergraduate and postgraduate students from any discipline. You don’t need to be a hardcore coder — designers, problem-solvers, and beginners are all welcome.",
    },
    {
        id: "faq-3",
        question: "What is the team size?",
        answer: "Each team can have a minimum of 1 and a maximum of 4 members. Solo participation is allowed, but need to be applied as a team.",
    },
    {
        id: "faq-4",
        question: "Do I need prior hackathon experience?",
        answer: "No. Prior experience is not required. Mentors will be available throughout the event to guide teams, especially first-time participants.",
    },
    {
        id: "faq-5",
        question: "Is there any registration fee?",
        answer: "No. Participation in HACKTONIX 5.0 is completely free. You just need to register in advance and show up on time.",
    },
    {
        id: "faq-6",
        question: "What should I bring to the hackathon?",
        answer: "Bring your laptop, chargers, any required hardware, and a valid college ID. We’ll take care of internet access, food, and the chaos.",
    },
    {
        id: "faq-7",
        question: "Will food and accommodation be provided?",
        answer: "Meals and refreshments will be provided during the event. Accommodation is not provided, so plan accordingly if you’re traveling from outside the city.",
    },
    {
        id: "faq-8",
        question: "What are the judging criteria?",
        answer: "Projects will be judged based on innovation, technical implementation, relevance to the problem statement, feasibility, and presentation.",
    },
    {
        id: "faq-9",
        question: "Can I work on an existing project?",
        answer: "No. All projects must be built from scratch during the hackathon. Reusing libraries and frameworks is fine, but the core idea and implementation must be original.",
    },
    {
        id: "faq-10",
        question: "What do winners get?",
        answer: "Winners receive cash prizes, goodies, certificates, and serious bragging rights. Everyone who completes the hackathon gets a participation certificate.",
    },
];

/* =========================================================
   GALLERY
   ---------------------------------------------------------
   Static event memories. Consider converting HEIC → JPG
   unless you enjoy random browser breakage pain.
   ========================================================= */

export const GALLERY_IMAGES = [
    "https://res.cloudinary.com/dix3afpgy/image/upload/v1774454469/1_rhqzlw.jpg",
    "https://res.cloudinary.com/dix3afpgy/image/upload/v1774454548/2_jsuiof.jpg",
    "https://res.cloudinary.com/dix3afpgy/image/upload/v1774454568/3_jlrhw9.jpg",
    "https://res.cloudinary.com/dix3afpgy/image/upload/v1774454632/4_zoyz6i.jpg",
    "https://res.cloudinary.com/dix3afpgy/image/upload/v1774454656/5_zezzfd.jpg",
    "https://res.cloudinary.com/dix3afpgy/image/upload/v1774454676/6_w5hrem.jpg",
    "https://res.cloudinary.com/dix3afpgy/image/upload/v1774454695/7_m4obcl.jpg",
    "https://res.cloudinary.com/dix3afpgy/image/upload/v1774454716/8_j6mox7.jpg",
    "https://res.cloudinary.com/dix3afpgy/image/upload/v1774454746/9_leqz93.jpg",
];

/* =========================================================
   REVIEWS
   ---------------------------------------------------------
   Social proof + vibes.
   ========================================================= */

export const REVIEWS = [
    {
        id: 1,
        name: "Aarav",
        role: "Hackathon Winner",
        text: "Absolute chaos. Zero sleep. Won cash. 10/10 would destroy my sanity again.",
    },
    {
        id: 2,
        name: "Meera",
        role: "Frontend Dev",
        text: "Energy was insane. Felt like caffeine injected straight into my soul.",
    },
    {
        id: 3,
        name: "Kabir",
        role: "First Timer",
        text: "Came scared. Left with swag, friends, and an unhealthy addiction to hackathons.",
    },
    {
        id: 4,
        name: "Ishita",
        role: "Designer",
        text: "Best damn event branding I’ve seen. Brutal. Loud. Sexy. Loved every second.",
    },
    {
        id: 5,
        name: "Rohan",
        role: "Backend Dev",
        text: "Production broke at 3am. Fixed it. Won prize money. Life is weird and awesome.",
    },
];
