import type { EventConfig } from "./types";

/**
 * RuralConnect 2026 — single source of truth for public event content.
 *
 * Sources: "Plan.docx" (Event Concept + Execution Playbook v1.0) and
 * "Planning.pptx" (internal organising meeting deck), both 27 Oct 2026.
 * See docs/CONTENT-SOURCES.md for how each fact was verified and which
 * conflicts were resolved.
 *
 * Rules for editors:
 * - Anything not yet approved for publication stays `pending`; pending
 *   values and their internal notes are never rendered.
 * - Registration links and the contact address come from environment
 *   variables (see .env.example), not from this file.
 * - Do not add prize amounts, sponsor logos or IEEE/ComSoc branding until
 *   coordination has approved them.
 */
export const event: EventConfig = {
  identity: {
    name: "RuralConnect 2026",
    shortName: "RuralConnect",
    theme: "Technology Innovations for Rural Communication and Connectivity",
    format: "Two-day ideathon · Invited lectures · AI-IoT tutorials",
    description:
      "A two-day ideathon with invited lectures and AI-IoT tutorials on making rural communication and connectivity more affordable, resilient, inclusive and practical to deploy.",
  },

  // The deck's execution map states "Event dates are fixed: 14–15 Nov"
  // (Sat–Sun), superseding the playbook's tentative 13–14 Nov.
  dates: {
    status: "confirmed",
    value: { start: "2026-11-14", end: "2026-11-15", timeZone: "Asia/Kolkata" },
  },

  venue: {
    status: "pending",
    internalNote:
      "Deck: 'Confirm venue details and approvals before publishing.' C5 to supply booked room + address.",
  },

  tracks: [
    {
      id: "last-mile",
      number: "01",
      title: "Last-mile access",
      summary: "Community wireless, mesh and affordable backhaul.",
      description:
        "The final stretch to homes, farms and community centres is where connectivity usually stops. Propose ways to get it there at a cost a rural community can sustain.",
      focus: ["Community wireless", "Mesh networking", "Affordable backhaul"],
      glyph: "mesh",
    },
    {
      id: "resilient",
      number: "02",
      title: "Resilient networks",
      summary: "Emergency links and outage-tolerant communications.",
      description:
        "Power cuts, storms and long distances test every link. Design communications that keep working, or recover quickly, when infrastructure fails.",
      focus: ["Emergency links", "Outage tolerance", "Fast recovery"],
      glyph: "resilience",
    },
    {
      id: "ai-iot-lpwan",
      number: "03",
      title: "AI-IoT and LPWAN",
      summary: "Low-power sensing, routing and network adaptation.",
      description:
        "Sensors in fields and villages run on small batteries over long ranges. Rethink how they sense, route and adapt so the network lasts.",
      focus: ["Low-power sensing", "LPWAN routing", "Network adaptation"],
      glyph: "lowpower",
    },
    {
      id: "smart-rural",
      number: "04",
      title: "Smart rural networks",
      summary: "AI-assisted optimisation and resource management.",
      description:
        "Scarce spectrum, energy and backhaul have to be shared well. Apply AI to plan, optimise and manage rural network resources.",
      focus: ["AI-assisted optimisation", "Resource management", "Network planning"],
      glyph: "optimise",
    },
    {
      id: "inclusive",
      number: "05",
      title: "Inclusive applications",
      summary: "Agriculture, health and education, with network novelty.",
      description:
        "Services for farmers, clinics and classrooms qualify when the innovation lives in the network: how the service is delivered, not only what the app does.",
      focus: ["Agriculture", "Healthcare", "Education"],
      glyph: "inclusion",
    },
  ],

  ideathon: {
    maxTeamSize: 2,
    shortlistedTeams: 20,
    reserveTeams: "3–5",
    pitch: { presentationMinutes: 5, questionMinutes: 2 },
    applicationIncludes: [
      "A 300–500 word abstract of your idea",
      "A summary of the networking architecture",
      "The challenge track you are entering",
      "An optional architecture diagram",
      "A declaration that the work is original",
    ],
    rules: [
      "Every idea needs a clear communications or networking component. Generic AI solutions without rural network innovation are out of scope.",
      "Hardware prototypes are not required.",
      "Prior work is allowed only if it is declared, and it is treated the same way for every team.",
      "All teams receive the same rules, time allotment, format and scoring categories.",
      "Judges disclose conflicts of interest, and tie-breaks are fixed in advance.",
    ],
    process: [
      { title: "Apply", detail: "Submit your idea and rural network concept." },
      { title: "Review", detail: "At least three reviewers score every application." },
      { title: "Shortlist", detail: "20 teams are invited on site, with 3⁠–⁠5 reserves." },
      { title: "Build", detail: "Develop the idea with on-site mentor support." },
      { title: "Pitch", detail: "Five minutes to present, two for questions." },
      { title: "Recognition", detail: "The top three solutions are recognised." },
    ],
    shortlistingRubric: [
      { criterion: "Relevance", weight: 40 },
      { criterion: "Novelty", weight: 25 },
      { criterion: "Feasibility", weight: 20 },
      { criterion: "Impact", weight: 15 },
    ],
    finalRubric: [
      { criterion: "Communication innovation", weight: 30 },
      { criterion: "Rural relevance", weight: 20 },
      { criterion: "Feasibility", weight: 20 },
      { criterion: "Cost and energy", weight: 15 },
      { criterion: "Impact", weight: 10 },
      { criterion: "Pitch", weight: 5 },
    ],
    recognition: "The top three teams are recognised at the closing session.",
    applicationDeadline: {
      status: "pending",
      internalNote:
        "Playbook: '4 Nov: idea intake ends (proposed)'. Needs C2 + coordination sign-off.",
    },
    shortlistAnnouncement: {
      status: "pending",
      internalNote:
        "Playbook: '7 Nov: 20-team shortlist'. Publish once the intake deadline is fixed.",
    },
  },

  registration: {
    ideathon: {
      kind: "ideathon",
      title: "Ideathon application",
      audience: "For teams of one or two with a rural networking idea.",
      summary:
        "Apply with an idea in one of the five tracks. Shortlisted teams develop and pitch it on site across both days.",
      steps: [
        "Choose a challenge track and write your abstract.",
        "Submit the application as a team leader, with an optional second member.",
        "Reviewers shortlist 20 teams; you will hear back by email.",
        "Shortlisted teams confirm their place and attend both days.",
      ],
      conditions: [
        "Up to two people per team.",
        "A clear communications or networking component is required.",
        "Submitting does not guarantee selection.",
      ],
      closed: false,
    },
    attendee: {
      kind: "attendee",
      title: "General attendee registration",
      audience: "For anyone who wants to attend the lectures and tutorials.",
      summary:
        "Join the invited lectures and hands-on tutorials, and watch the shortlisted teams pitch.",
      steps: [
        "Register your interest with the attendee form.",
        "The organisers confirm places by email.",
        "Bring your confirmation to check-in on the day.",
      ],
      conditions: [
        "Places are limited and confirmed by the organisers.",
        "Attendee registration is separate from the ideathon application.",
      ],
      closed: false,
    },
  },

  programme: {
    status: "provisional",
    days: [
      {
        id: "day-1",
        label: "Day 1",
        theme: "Inspiration and build",
        date: "2026-11-14",
        sessions: [
          { start: "09:00", end: "09:30", title: "Registration and welcome", kind: "ceremony" },
          { start: "09:30", end: "10:00", title: "Inaugural session", kind: "ceremony" },
          {
            start: "10:00",
            end: "11:20",
            title: "Invited lectures: government and industry",
            kind: "lecture",
          },
          { start: "11:20", end: "11:35", title: "Break", kind: "break" },
          {
            start: "11:35",
            end: "12:30",
            title: "Tutorial 1: Rural wireless, LPWAN and IoT",
            kind: "tutorial",
          },
          {
            start: "12:30",
            end: "13:15",
            title: "Ideathon orientation and challenge briefing",
            kind: "ideathon",
          },
          { start: "13:15", end: "14:00", title: "Lunch", kind: "break" },
          {
            start: "14:00",
            end: "16:00",
            title: "Idea development with mentors",
            kind: "ideathon",
          },
          { start: "16:00", end: "16:15", title: "Break", kind: "break" },
          { start: "16:15", end: "17:00", title: "Invited lecture: industry", kind: "lecture" },
          { start: "17:00", end: "18:00", title: "Ideathon refinement", kind: "ideathon" },
        ],
      },
      {
        id: "day-2",
        label: "Day 2",
        theme: "Pitch and recognition",
        date: "2026-11-15",
        sessions: [
          { start: "09:00", end: "09:30", title: "Check-in and progress review", kind: "ceremony" },
          {
            start: "09:30",
            end: "10:20",
            title: "Tutorial 2: AI-IoT and intelligent networks",
            kind: "tutorial",
          },
          { start: "10:20", end: "11:00", title: "Invited lecture: government", kind: "lecture" },
          { start: "11:00", end: "11:15", title: "Break", kind: "break" },
          {
            start: "11:15",
            end: "12:30",
            title: "Final preparation with mentors",
            kind: "ideathon",
          },
          { start: "12:30", end: "13:15", title: "Lunch", kind: "break" },
          {
            start: "13:15",
            end: "15:45",
            title: "Team pitches and jury scoring",
            kind: "ideathon",
          },
          { start: "15:45", end: "16:15", title: "Jury deliberation and break", kind: "break" },
          {
            start: "16:15",
            end: "17:00",
            title: "Recognition, certificates and valedictory",
            kind: "ceremony",
          },
        ],
      },
    ],
  },

  organizers: [
    {
      name: "Prof. Sudip Misra",
      role: "Faculty guidance",
      affiliation: {
        status: "pending",
        internalNote: "Institution not stated in planning documents.",
      },
    },
    {
      name: "Rajdeep Ghosh",
      role: "Event coordination",
      affiliation: {
        status: "pending",
        internalNote: "Institution not stated in planning documents.",
      },
    },
    {
      name: "Kumarjit Ray",
      role: "Event coordination",
      affiliation: {
        status: "pending",
        internalNote: "Institution not stated in planning documents.",
      },
    },
  ],

  // C3 adds speakers here with `publication: "confirmed"` only after written acceptance.
  speakers: [],

  faq: [
    {
      id: "who-can-apply",
      question: "Who can take part in the ideathon?",
      answer: [
        "Teams of one or two people with an idea for rural communication or connectivity. Each application has a team leader and an optional second member.",
        "Twenty teams are shortlisted to take part on site.",
      ],
    },
    {
      id: "attendee-vs-ideathon",
      question: "Can I attend without entering the ideathon?",
      answer: [
        "Yes. General attendee registration is a separate form for people who want to join the lectures and tutorials. Places are limited and confirmed by the organisers.",
      ],
    },
    {
      id: "networking-component",
      question: "Does my idea have to involve networking?",
      answer: [
        "Yes. Every shortlisted idea must have communications or networking at its technical core. Applications in agriculture, health or education qualify when the innovation is in how the network delivers the service.",
      ],
    },
    {
      id: "prototype",
      question: "Do we need a working prototype?",
      answer: [
        "No. Hardware prototypes are not required. You will be judged on the idea, its network design, feasibility and impact.",
      ],
    },
    {
      id: "prior-work",
      question: "Can we build on work we have already done?",
      answer: [
        "Yes, if you declare it in your application. Declared prior work is treated the same way for every team.",
      ],
    },
    {
      id: "selection",
      question: "How are teams selected and judged?",
      answer: [
        "At least three reviewers score each application for relevance, novelty, feasibility and impact. On Day 2, shortlisted teams give a five-minute pitch followed by two minutes of questions, scored by the jury.",
      ],
    },
    {
      id: "programme-speakers",
      question: "When will speakers and the venue be announced?",
      answer: [
        "Speaker names and the venue are published on this page as soon as they are confirmed. The programme shown here is provisional, and timings may change.",
      ],
    },
    {
      id: "privacy",
      question: "What happens to the information I submit?",
      answer: [
        "The registration forms ask only for what the organisers need to review applications and run the event. Responses are kept in access-restricted records used only for this event.",
        "This website itself does not use cookies or analytics, and does not collect personal data.",
      ],
    },
  ],

  social: [],
};
