export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Microsoft 365 & Identity",
    skills: [
      "Microsoft 365",
      "Office 365",
      "Microsoft Entra ID",
      "Azure AD",
      "Active Directory",
      "Exchange Online",
      "Teams",
      "SharePoint Online",
      "OneDrive",
      "SSO",
      "Enterprise Applications",
      "Conditional Access",
      "MFA",
      "SSPR",
      "User Lifecycle",
      "Security Groups",
      "Distribution Groups",
      "GPO",
      "DNS",
      "DHCP",
    ],
  },
  {
    title: "Endpoint & Device Management",
    skills: [
      "Microsoft Intune",
      "Endpoint Manager",
      "Windows 10/11",
      "Windows Server",
      "macOS",
      "ChromeOS",
      "Apple Business Manager",
      "Google Admin",
      "Device Enrollment",
      "Compliance Policies",
      "Configuration Profiles",
      "Application Deployment",
      "Windows Update Rings",
      "BitLocker",
      "FileVault",
      "Endpoint Security",
      "Remote Wipe",
      "Inventory",
      "Reporting",
    ],
  },
  {
    title: "Infrastructure & Monitoring",
    skills: [
      "Hyper-V",
      "Parallels",
      "Kaseya VSA",
      "Auvik",
      "Juniper",
      "Aruba/HPE",
      "Ruckus",
      "Ubiquiti",
      "VLANs",
      "SSIDs",
      "Bandwidth Shaping",
      "Enterprise Wi-Fi",
      "Synology NAS",
      "Veeam",
      "Datto",
    ],
  },
  {
    title: "Security & IT Operations",
    skills: [
      "PCI DSS",
      "GDPR",
      "CCPA",
      "Least Privilege",
      "Phishing Response",
      "Security Awareness",
      "Patch Management",
      "Change Management",
      "Backup & Recovery",
      "Incident Management",
      "Problem Management",
      "Root Cause Analysis",
      "Monitoring",
      "SOPs",
      "Knowledge Transfer",
    ],
  },
  {
    title: "Business Systems & Delivery",
    skills: [
      "Budgeting",
      "Forecasting",
      "Project Management",
      "Vendor Evaluation",
      "Procurement",
      "SLA Management",
      "Escalation Management",
      "End-user Training",
      "Opera Cloud",
      "MICROS",
      "Silverware POS",
      "Shift4",
      "Visionline",
      "SynXis",
      "Delphi",
      "Dormakaba",
      "KitchenArmor",
    ],
  },
];

/**
 * Extra phrases (beyond the skill name itself) that count as a match inside
 * résumé copy. Matching is case-insensitive, whole-phrase.
 */
export const skillAliases: Record<string, string[]> = {
  "Microsoft 365": ["Microsoft 365 Apps", "Microsoft 365 accounts", "Microsoft 365 tenant", "Microsoft 365 users"],
  "Office 365": ["Microsoft 365"],
  "Microsoft Entra ID": ["Entra ID"],
  "Azure AD": ["Entra ID", "Azure AD"],
  "Active Directory": ["Active Directory"],
  "Exchange Online": ["Exchange Online", "mailboxes"],
  Teams: ["Teams"],
  "SharePoint Online": ["SharePoint"],
  OneDrive: ["OneDrive"],
  SSO: ["SSO"],
  "Enterprise Applications": ["Enterprise Applications"],
  "Conditional Access": ["Conditional Access"],
  MFA: ["MFA"],
  SSPR: ["SSPR"],
  "User Lifecycle": ["provisioning", "licensing", "user lifecycle"],
  "Security Groups": ["groups"],
  "Distribution Groups": ["groups", "mailboxes"],
  GPO: ["GPO", "Active Directory"],
  DNS: ["DNS"],
  DHCP: ["DHCP"],
  "Microsoft Intune": ["Intune"],
  "Endpoint Manager": ["Intune", "Endpoint Manager"],
  "Windows 10/11": ["Windows 10", "Windows 11", "Windows fleet", "Windows computers"],
  "Windows Server": ["Windows application servers", "Windows Server"],
  macOS: ["macOS", "Macs/MacBooks", "Apple"],
  ChromeOS: ["ChromeOS", "Chromebook", "Chromebooks", "Chrome"],
  "Apple Business Manager": ["Apple Business Manager", "Jamf"],
  "Google Admin": ["Google Workspace", "Google accounts"],
  "Device Enrollment": ["enrollment", "device registration"],
  "Compliance Policies": ["compliance policies"],
  "Configuration Profiles": ["configuration profiles"],
  "Application Deployment": ["application deployment", "software deployment"],
  "Windows Update Rings": ["update rings"],
  BitLocker: ["BitLocker"],
  FileVault: ["FileVault", "Apple"],
  "Endpoint Security": ["endpoint security", "endpoint"],
  "Remote Wipe": ["remote wipe"],
  Inventory: ["inventory"],
  Reporting: ["reporting", "health reporting"],
  "Hyper-V": ["Hyper-V", "servers"],
  Parallels: ["Parallels"],
  "Kaseya VSA": ["Kaseya VSA", "Kaseya"],
  Auvik: ["Auvik"],
  Juniper: ["Juniper"],
  "Aruba/HPE": ["Aruba"],
  Ruckus: ["Ruckus"],
  Ubiquiti: ["Ubiquiti", "APs"],
  VLANs: ["VLANs"],
  SSIDs: ["SSIDs"],
  "Bandwidth Shaping": ["bandwidth shaping"],
  "Enterprise Wi-Fi": ["Wi-Fi", "APs", "wireless"],
  "Synology NAS": ["Synology", "NAS"],
  Veeam: ["Veeam"],
  Datto: ["Datto"],
  "PCI DSS": ["PCI DSS"],
  GDPR: ["GDPR"],
  CCPA: ["CCPA"],
  "Least Privilege": ["least privilege", "controls"],
  "Phishing Response": ["phishing", "security training"],
  "Security Awareness": ["security training", "training"],
  "Patch Management": ["patch", "patching", "Patch Tuesday", "patch discipline"],
  "Change Management": ["change management", "cutover", "rollback"],
  "Backup & Recovery": ["backup", "backups", "Veeam", "Datto", "rollback"],
  "Incident Management": ["incident response", "escalation", "escalations"],
  "Problem Management": ["escalated", "resolving escalated"],
  "Root Cause Analysis": ["forensic review", "root cause"],
  Monitoring: ["monitoring", "alerting", "Auvik", "Kaseya VSA"],
  SOPs: ["SOPs", "documented"],
  "Knowledge Transfer": ["knowledge transfer", "trained", "mentored", "documented"],
  Budgeting: ["budget"],
  Forecasting: ["forecast"],
  "Project Management": ["Project managed", "project managed", "Managed the", "managed", "implementation"],
  "Vendor Evaluation": ["vendor", "vendors", "contract"],
  Procurement: ["procurement", "licensing", "contract"],
  "SLA Management": ["SLA", "service quality"],
  "Escalation Management": ["escalation", "escalations", "escalated"],
  "End-user Training": ["training", "trained", "learning sessions"],
  "Opera Cloud": ["Opera Cloud"],
  MICROS: ["MICROS"],
  "Silverware POS": ["Silverware POS", "POS"],
  Shift4: ["Shift4"],
  Visionline: ["Visionline"],
  SynXis: ["SynXis"],
  Delphi: ["Delphi"],
  Dormakaba: ["Dormakaba"],
  KitchenArmor: ["KitchenArmor"],
};

export type Job = {
  title: string;
  org: string;
  location?: string;
  dates: string;
  environment?: string;
  bullets: string[];
};

export const jobs: Job[] = [
  {
    title: "Director of IT Support (Director of IT & Systems)",
    org: "1440 Multiversity",
    location: "Scotts Valley, CA",
    dates: "Aug 2024 – Jul 2025",
    environment:
      "Nonprofit learning, conference, and hospitality campus supporting approximately 75 employees, 115 Microsoft 365 accounts, contingent workers and contractors, and events of up to 400 guests.",
    bullets: [
      "Administered Microsoft 365, Entra ID, Active Directory, Exchange Online, Intune, Google Workspace, and Apple Business Manager daily, including provisioning, licensing, groups and mailboxes, SSO, Enterprise Applications, Conditional Access, MFA, SSPR, device registration, and reporting.",
      "Governed the complete Windows fleet through Intune using enrollment, compliance policies, configuration profiles, application deployment, update rings, BitLocker, endpoint security, remote wipe, inventory, and health reporting.",
      "Supported a mixed estate of approximately 60 Windows computers, 80 Chromebooks, 15 Macs/MacBooks, and roughly 300 mobile and presentation devices; migrated Apple enrollment from Jamf to Apple Business Manager-based workflows.",
      "Maintained 11 Windows application servers and one NAS supporting cloud-connected and on-premises line-of-business systems, including Opera Cloud, MICROS, Visionline, Shift4, SynXis, and Delphi integrations.",
      "Managed the $550K campus network modernization; provisioned 32 Juniper switches, worked alongside installers and network engineers through deployment and cutover, expanded Wi-Fi from 95 to 115 APs, and supported VLANs, SSIDs, bandwidth shaping, and Auvik monitoring.",
      "Completed a forensic review of the IT budget and forecast, removing approximately $99K in annual operating expense through contract, licensing, and vendor rationalization without reducing operational capability.",
      "Coordinated a 30-day Opera Cloud migration across Visionline, Shift4, SynXis, and Delphi integrations with no major business disruption.",
      "Served as the primary technical escalation and vendor/MSP point person; maintained PCI DSS 3.2.1, GDPR, and CCPA controls, security training, SOPs, patch discipline, rollback readiness, and concise executive communication.",
    ],
  },
  {
    title: "IT Manager / Systems Administrator",
    org: "Pyramid Global Hospitality – Chaminade Resort & Spa",
    location: "Santa Cruz, CA",
    dates: "Aug 2015 – Aug 2024",
    environment:
      "100-employee resort environment supporting 99 Microsoft 365 users, up to 250 leisure guests, 500 conference guests, and 25 spa guests.",
    bullets: [
      "Administered property-level Microsoft 365, Active Directory, Entra ID, Intune, Exchange Online, Windows endpoints, Kaseya VSA, and local infrastructure within a centralized enterprise IT organization.",
      "Supported 28 laptops, 46 desktops, 15 Windows 10 Enterprise Silverware POS terminals, 11 KitchenArmor displays, printers, payment devices, conference technology, and business-critical hospitality applications.",
      "Project managed the $750K fiber backhaul modernization replacing legacy Cat5-to-RJ11 DSL connectivity to guest houses, coordinating vendors, installers, scheduling, business stakeholders, cutover, and production validation.",
      "Led the property implementation of an Aruba-to-Ruckus wireless migration, expanding coverage from 65 to 115 APs and improving network reliability and user satisfaction by approximately 60%.",
      "Facilitated the property's move from disparate desktop licensing to the centralized Benchmark/Pyramid Microsoft 365 tenant, Microsoft 365 Apps, Windows 10, and later Windows 11.",
      "Used Kaseya VSA daily for monitoring, alerting, patching, software deployment, scripting and automation, inventory, remote control, and reporting; reviewed Patch Tuesday releases, deployed in low-occupancy Sunday windows, and maintained rollback plans.",
      "Held POS and PMS production updates for at least one full patch cycle when risk warranted; emphasized OneDrive data-protection and sync hygiene, managed Veeam and Synology operations, and monitored corporate Datto backup status.",
      "Migrated 20+ payment endpoints to Ingenico EMV, P2PE, and E2EE technology; reduced POS transaction costs by 80% and deployed a 200-door Dormakaba smart-lock environment.",
    ],
  },
  {
    title: "Help Desk Supervisor",
    org: "BioReference Laboratories",
    location: "Campbell, CA",
    dates: "Jan 2015 – Aug 2015",
    bullets: [
      "Supervised Help Desk operations and escalations supporting approximately 75 internal users and 300 distributed phlebotomists, clinicians, sales, and marketing personnel.",
      "Administered Active Directory, workstation imaging, printers, VPN access, endpoint deployment, and remote support; assisted with laboratory systems alongside senior specialists during a unified-platform transition.",
    ],
  },
  {
    title: "Systems Administrator (Temporary)",
    org: "Central California Alliance for Health",
    location: "Scotts Valley, CA",
    dates: "Oct 2014 – Jan 2015",
    bullets: [
      "Provided Help Desk and project support for approximately 2,000 internal users across a two-building healthcare campus, resolving escalated infrastructure and end-user issues in a regulated Medi-Cal environment.",
    ],
  },
  {
    title: "Chrome Support Specialist & Trainer (Contract)",
    org: "Milestone Technologies – Google Chrome Help Desk",
    dates: "2012 – 2013",
    bullets: [
      "Supported consumer, SMB, and school Chromebook customers with ChromeOS, hardware, Wi-Fi, Google accounts, synchronization, browser, setup, and warranty/RMA issues during Google's first premium Chromebook launch.",
      "Delivered paid remote learning sessions helping customers replace Windows and macOS workflows with ChromeOS; trained and mentored new Chrome support specialists (\u201cChrome Ninjas\u201d).",
    ],
  },
  {
    title: "Computer Systems Support",
    org: "Fire Department of the City of New York (FDNY)",
    location: "Brooklyn, NY",
    dates: "2010 – 2011",
    bullets: [
      "Supported encrypted mobile workstations used by Fire Inspection and Arson Investigation teams, providing endpoint, infrastructure, and user support during organizational restructuring.",
    ],
  },
  {
    title: "IT Manager / Trading Systems Support",
    org: "Team Trading / VCM Trading",
    location: "New York, NY",
    dates: "2007 – 2009",
    bullets: [
      "Supported 15 in-house traders and executives plus approximately 500 distributed day-trading students worldwide across day trading, Forex, education, conferences, and trade-show operations.",
      "Maintained trading workstations, network connectivity, conferencing systems, and rapid incident response where downtime directly affected live market activity.",
    ],
  },
  {
    title: "IT Manager",
    org: "Barkley Trading",
    location: "New York, NY",
    dates: "2005 – 2006",
    bullets: [
      "Supported 25 traders across three branch offices, maintaining trading desks, servers, endpoints, networking, and business-critical settlement and reconciliation workflows.",
      "Additional capital-markets support engagements included A.B. Watley and E*TRADE Capital Markets.",
    ],
  },
];

export const impact = [
  {
    figure: "$99K",
    text: "Annual IT operating expense removed through forensic budget, forecast, contract, and vendor analysis while preserving service quality.",
  },
  {
    figure: "$750K",
    text: "Fiber backhaul modernization managed, replacing legacy Cat5/RJ11 DSL connectivity and coordinating an Aruba-to-Ruckus wireless expansion.",
  },
  {
    figure: "$550K",
    text: "Juniper campus modernization managed, including provisioning 32 switches and completing implementation in 8 days against a 14-day plan.",
  },
  {
    figure: "2,000 users",
    text: "Supported in a regulated healthcare campus environment.",
  },
];

export const summary =
  "Hands-on Senior Systems Administrator with 20+ years supporting business-critical environments across nonprofit education, hospitality, healthcare, public safety, and capital markets. Daily administrator of Microsoft 365 / Office 365, Microsoft Entra ID (Azure AD), Microsoft Intune, Active Directory, Exchange Online, Google Workspace, Apple Business Manager, Windows Server, endpoint fleets, and enterprise Wi-Fi. Trusted primary escalation point known for monitoring, compliance, disciplined patch and change management, clear communication, and leaving documented, sustainable environments. Brings project, vendor, budget, and forecasting ownership to hands-on senior individual-contributor roles.";

export const education = [
  {
    school: "Calbright College",
    detail: "Certificate, Human Resources Learning & Development, 2025",
    note: "Training design, adult learning, knowledge transfer, and employee development.",
  },
  {
    school: "Kingsborough Community College",
    detail: "Coursework in Physical Training, 1998–2002",
  },
];

export const remoteSetup = [
  "Dedicated professional home office",
  "1 Gbps fiber Internet",
  "Multi-monitor workstation",
  "Professional audio/video conferencing setup",
];
