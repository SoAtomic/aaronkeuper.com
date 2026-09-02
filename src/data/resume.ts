export type SkillGroup = {
  title: string;
  skills: string[];
};

export type FluencyGroup = {
  title: string;
  label: "Personal Projects" | "Recruiting Context";
  skills: string[];
};

export type SkillTaggedText = {
  text: string;
  skills?: string[];
};

export type ExperienceItem = {
  title: string;
  org: string;
  location?: string;
  dates: string;
  bullets: SkillTaggedText[];
};

export type Job = ExperienceItem & {
  environment?: string;
  environmentSkills?: string[];
};

export type ImpactItem = SkillTaggedText & {
  figure: string;
};

export const careerPath = [
  { title: "Technical Sourcing", dates: "2013-2014", label: "Technical Sourcer" },
  { title: "Enterprise IT", dates: "2014-2025", label: "Systems / Infrastructure" },
  {
    title: "Technical Sourcer / Recruiter",
    dates: "2026 ->",
    label: "Now",
  },
];

export const recruitingCapabilities = [
  "Technical Sourcing",
  "Candidate Research",
  "Boolean Search",
  "Pipeline Development",
  "Candidate Qualification",
  "Recruiter Support",
  "Technical Role Intake",
  "Contingent Staffing",
  "Candidate Experience",
  "Recruiting Coordination",
  "Talent Operations",
  "Applicant Tracking / Recruiting Systems",
];

export const recruitingExperience: ExperienceItem[] = [
  {
    title: "Agency Technical Sourcer",
    org: "NetPolarity",
    dates: "Jul 2013 - Mar 2014",
    bullets: [
      {
        text: "Completed an intensive three-month sourcing and recruiting training program before moving into full-time agency technical sourcing.",
      },
      {
        text: "Sourced technical candidates for enterprise accounts including Intel, Lab126/Amazon, Microsoft, and Google.",
      },
      { text: "Built candidate pipelines for specialized technical requisitions." },
      {
        text: "Supported recruiters by identifying candidates aligned to technical and business requirements.",
      },
    ],
  },
  {
    title: "Staffing / Recruiting - Contingent Workforce",
    org: "Kelly Services",
    dates: "Apr 2014 - Jun 2014",
    bullets: [
      {
        text: "Supported recruiting and hiring for contingent and temporary manual-labor positions in a high-volume staffing environment.",
      },
      {
        text: "Worked with fast-turnaround candidate identification, qualification, placement coordination, and contingent workforce operations.",
      },
    ],
  },
  {
    title: "Technical Sourcer / Recruiter Support",
    org: "The Judge Group",
    dates: "Jul 2014 - Sep 2014",
    bullets: [
      {
        text: "Supported technical sourcing and recruiter workflows for enterprise client accounts including Chase, Intel, Lab126, Oracle, and Indeed.",
      },
      {
        text: "Helped identify and move qualified technical candidates through active requisition pipelines.",
      },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Cloud & Identity",
    skills: [
      "Microsoft 365",
      "Entra ID",
      "Active Directory",
      "Exchange Online",
      "SSO",
      "MFA",
      "Conditional Access",
      "Identity Lifecycle",
    ],
  },
  {
    title: "Endpoint & Infrastructure",
    skills: [
      "Microsoft Intune",
      "Windows",
      "macOS",
      "ChromeOS",
      "Windows Server",
      "Apple Business Manager",
      "Hyper-V",
      "Enterprise Wi-Fi",
      "Juniper",
      "Aruba",
      "Ruckus",
      "Ubiquiti",
      "VLANs",
    ],
  },
  {
    title: "Operations & Security",
    skills: [
      "Monitoring",
      "Incident Management",
      "Change Management",
      "Patch Management",
      "Root Cause Analysis",
      "Backup & Recovery",
      "Least Privilege",
      "Security Awareness",
      "SOPs",
      "Escalation Management",
    ],
  },
];

export const technicalFluencyGroups: FluencyGroup[] = [
  {
    title: "Personal Projects",
    label: "Personal Projects",
    skills: ["Swift", "React", "TypeScript", "GitHub", "AWS", "Azure", "SDLC", "Agile", "Scrum"],
  },
  {
    title: "Recruiting Context",
    label: "Recruiting Context",
    skills: ["Breadboarding", "Semiconductor Design", "CPU Architecture", "GPU Architecture"],
  },
];

export const skillAliases: Record<string, string[]> = {
  "Microsoft 365": ["Microsoft 365 Apps", "Microsoft 365 accounts", "Microsoft 365 users"],
  "Entra ID": ["Microsoft Entra ID", "Azure AD"],
  "Exchange Online": ["mailboxes"],
  "Identity Lifecycle": ["provisioning", "licensing", "user lifecycle"],
  "Microsoft Intune": ["Intune"],
  Windows: ["Windows 10", "Windows 11", "Windows computers", "Windows endpoints", "Windows fleet"],
  ChromeOS: ["Chromebook", "Chromebooks", "Chrome"],
  "Apple Business Manager": ["Jamf"],
  "Device Compliance": ["compliance policies", "configuration profiles"],
  "Application Deployment": ["software deployment"],
  Aruba: ["Aruba/HPE"],
  "Enterprise Wi-Fi": ["Wi-Fi", "wireless"],
  "Backup & Recovery": ["backup", "backups", "rollback", "Veeam", "Datto"],
  "Security Awareness": ["security training"],
  "Patch Management": ["patch", "patching", "Patch Tuesday", "patch discipline"],
  "Change Management": ["change management", "cutover", "rollback"],
  "Incident Management": ["incident response"],
  "Root Cause Analysis": ["forensic review", "root cause"],
  Monitoring: ["alerting", "Auvik"],
  SOPs: ["documented"],
  "Escalation Management": ["technical escalation", "escalations", "primary escalation"],
};

export const skillHighlightAliases: Record<string, string[]> = {
  "Device Compliance": ["compliance policies", "configuration profiles"],
  "Endpoint Security": ["endpoint", "endpoints"],
  Monitoring: ["monitoring", "health reporting"],
  "Enterprise Wi-Fi": ["APs", "wireless"],
  "Backup & Recovery": ["Veeam", "Datto"],
  "Security Awareness": ["training"],
  SOPs: ["SOPs", "documented"],
  "Escalation Management": ["escalation", "escalated"],
};

export const rolesUnderstood = [
  "Systems Administrator",
  "Microsoft 365 Administrator",
  "Endpoint Administrator",
  "IT Support Engineer",
  "Help Desk / Service Desk",
  "Desktop Support",
  "Infrastructure Engineer",
  "Systems Engineering",
  "Software Developer",
  "Software Architects",
  "Big Data Architecture & Administration",
  "Machine Learning",
  "AI Engineering",
  "Network Administrator",
  "Identity & Access Administration",
  "IT Manager",
  "Technical Support",
  "Systems Support",
];

export const jobs: Job[] = [
  {
    title: "Director of IT Support (Director of IT & Systems)",
    org: "1440 Multiversity",
    location: "Scotts Valley, CA",
    dates: "Aug 2024 - Jul 2025",
    environment:
      "Nonprofit learning, conference, and hospitality campus supporting approximately 75 employees, 115 Microsoft 365 accounts, contingent workers and contractors, and events of up to 400 guests.",
    environmentSkills: ["Microsoft 365"],
    bullets: [
      {
        text: "Administered Microsoft 365, Entra ID, Active Directory, Exchange Online, Intune, Google Workspace, and Apple Business Manager across identity, endpoint, mailbox, SSO, MFA, Conditional Access, provisioning, and reporting workflows.",
        skills: [
          "Microsoft 365",
          "Entra ID",
          "Active Directory",
          "Exchange Online",
          "Microsoft Intune",
          "Apple Business Manager",
          "SSO",
          "MFA",
          "Conditional Access",
          "Identity Lifecycle",
        ],
      },
      {
        text: "Supported a mixed endpoint and infrastructure environment including Windows computers, Chromebooks, Macs/MacBooks, mobile and presentation devices, Windows application servers, Synology NAS, and cloud-connected line-of-business systems.",
        skills: [
          "Windows",
          "ChromeOS",
          "macOS",
          "Windows Server",
          "Apple Business Manager",
          "Backup & Recovery",
        ],
      },
      {
        text: "Managed the $550K campus network modernization, including Juniper switching, Wi-Fi expansion, VLANs, SSIDs, bandwidth shaping, Auvik monitoring, vendor coordination, deployment, cutover, and production validation.",
        skills: [
          "Juniper",
          "Enterprise Wi-Fi",
          "VLANs",
          "Monitoring",
          "Change Management",
          "Escalation Management",
        ],
      },
      {
        text: "Removed approximately $99K in annual IT operating expense through budget, contract, licensing, and vendor rationalization while preserving operational capability and clear stakeholder communication.",
        skills: ["Root Cause Analysis", "Change Management", "Escalation Management"],
      },
    ],
  },
  {
    title: "IT Manager / Systems Administrator",
    org: "Pyramid Global Hospitality - Chaminade Resort & Spa",
    location: "Santa Cruz, CA",
    dates: "Aug 2015 - Aug 2024",
    environment:
      "100-employee resort environment supporting 99 Microsoft 365 users, leisure guests, conference guests, spa operations, hospitality applications, endpoints, infrastructure, and vendor-supported systems.",
    environmentSkills: ["Microsoft 365"],
    bullets: [
      {
        text: "Administered property-level Microsoft 365, Active Directory, Entra ID, Intune, Exchange Online, Windows endpoints, Kaseya VSA, and local infrastructure within a centralized enterprise IT organization.",
        skills: [
          "Microsoft 365",
          "Active Directory",
          "Entra ID",
          "Microsoft Intune",
          "Exchange Online",
          "Windows",
          "Monitoring",
        ],
      },
      {
        text: "Project managed a $750K fiber backhaul modernization and an Aruba-to-Ruckus wireless migration, coordinating vendors, installers, scheduling, stakeholder communication, cutover, and production validation.",
        skills: [
          "Aruba",
          "Ruckus",
          "Enterprise Wi-Fi",
          "Change Management",
          "Escalation Management",
        ],
      },
      {
        text: "Supported laptops, desktops, Windows POS terminals, displays, printers, payment devices, conference technology, and business-critical hospitality applications.",
        skills: ["Windows", "Endpoint Security", "Application Deployment"],
      },
      {
        text: "Managed monitoring, alerting, patching, software deployment, inventory, reporting, OneDrive data-protection practices, Veeam and Synology operations, and corporate Datto backup status.",
        skills: [
          "Monitoring",
          "Patch Management",
          "Application Deployment",
          "Backup & Recovery",
          "Change Management",
        ],
      },
    ],
  },
  {
    title: "Help Desk Supervisor",
    org: "BioReference Laboratories",
    location: "Campbell, CA",
    dates: "Jan 2015 - Aug 2015",
    bullets: [
      {
        text: "Supervised Help Desk operations and escalations supporting approximately 75 internal users and 300 distributed phlebotomists, clinicians, sales, and marketing personnel.",
        skills: ["Escalation Management", "Incident Management"],
      },
      {
        text: "Administered Active Directory, workstation imaging, printers, VPN access, endpoint deployment, and remote support; assisted with laboratory systems during a unified-platform transition.",
        skills: ["Active Directory", "Application Deployment", "Endpoint Security"],
      },
    ],
  },
  {
    title: "Systems Administrator (Temporary)",
    org: "Central California Alliance for Health",
    location: "Scotts Valley, CA",
    dates: "Oct 2014 - Jan 2015",
    bullets: [
      {
        text: "Provided Help Desk and project support for approximately 2,000 internal users across a two-building healthcare campus, resolving escalated infrastructure and end-user issues in a regulated Medi-Cal environment.",
        skills: ["Escalation Management", "Incident Management"],
      },
    ],
  },
  {
    title: "Chrome Support Specialist & Trainer (Contract)",
    org: "Milestone Technologies - Google Chrome Help Desk",
    dates: "2012 - 2013",
    bullets: [
      {
        text: "Supported consumer, SMB, and school Chromebook customers with ChromeOS, hardware, Wi-Fi, Google accounts, synchronization, browser, setup, and warranty/RMA issues during Google's first premium Chromebook launch.",
        skills: ["ChromeOS", "Enterprise Wi-Fi", "Incident Management"],
      },
      {
        text: "Delivered paid remote learning sessions helping customers replace Windows and macOS workflows with ChromeOS; trained and mentored new Chrome support specialists.",
        skills: ["Windows", "macOS", "ChromeOS"],
      },
    ],
  },
  {
    title: "Computer Systems Support",
    org: "Fire Department of the City of New York (FDNY)",
    location: "Brooklyn, NY",
    dates: "2009 - 2010",
    bullets: [
      {
        text: "Supported encrypted mobile workstations used by Fire Inspection and Arson Investigation teams, providing endpoint, infrastructure, and user support during organizational restructuring.",
        skills: ["Endpoint Security", "Windows", "Incident Management"],
      },
    ],
  },
  {
    title: "Earlier Capital Markets Technology & Operations",
    org: "New York, NY",
    dates: "2003 - 2009",
    bullets: [
      {
        text: "VCM Trading (became Team Trading) - IT Manager, 2007-2009.",
        skills: ["Incident Management"],
      },
      {
        text: "Legend Securities - Executive Assistant & Trade Reconciliation, 2006.",
        skills: ["Incident Management"],
      },
      {
        text: "E*TRADE Capital Markets - Trade Support, 2005-2006.",
        skills: ["Incident Management"],
      },
      {
        text: "Barkley Trading - Contractor, IT Manager, 2003-2005.",
        skills: ["Windows Server", "Endpoint Security", "Incident Management"],
      },
      {
        text: "A.B. Watley - Remote Trade Systems Support, 2003-2005.",
        skills: ["Incident Management"],
      },
    ],
  },
];

export const impact: ImpactItem[] = [
  {
    figure: "$99K",
    text: "Annual IT operating expense removed without reducing operational capability.",
    skills: ["Root Cause Analysis", "Change Management"],
  },
  {
    figure: "$750K",
    text: "Fiber/network modernization managed.",
    skills: ["Aruba", "Ruckus", "Enterprise Wi-Fi", "Change Management"],
  },
  {
    figure: "$550K",
    text: "Campus network modernization managed.",
    skills: ["Juniper", "Enterprise Wi-Fi", "VLANs", "Monitoring"],
  },
  {
    figure: "2,000 users",
    text: "Supported within a regulated healthcare environment.",
    skills: ["Incident Management", "Escalation Management"],
  },
];

export const summary =
  "I began working in technical sourcing and staffing before moving into enterprise IT, where I spent more than a decade supporting the technologies, teams, vendors, and operational environments recruiters hire for. I am now returning to technical sourcing and recruiting at the junior/re-entry level, bringing that practical domain experience with me.";

export const education = [
  {
    school: "Calbright College",
    detail: "Certificate - Human Resources Talent Acquisition, 2025",
    note: "Recruiting and talent acquisition professional development.",
  },
  {
    school: "Calbright College",
    detail: "Certificate - Human Resources Learning & Development, 2025",
    note: "Training design, adult learning, knowledge transfer, and employee development.",
  },
  {
    school: "Kingsborough Community College",
    detail: "Coursework in Physical Training, 1998-2002",
  },
];

export const remoteSetup = [
  "Dedicated professional home office",
  "1 Gbps fiber Internet",
  "Multi-monitor workstation",
  "Professional audio/video conferencing setup",
];
