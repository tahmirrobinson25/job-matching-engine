import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../dist/src/generated/prisma/client.js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set before running the seed script.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const jobs = [
  {
    title: 'Software Engineer',
    company: 'Northstar Labs',
    location: 'New York, NY',
    salary: 135000,
    type: 'Full-time',
    description: 'Build reliable services and polished customer-facing features for a growing SaaS platform. Partner with product, design, and fellow engineers to plan work, review code, and improve the performance and resilience of systems used by thousands of customers.',
  },
  {
    title: 'Frontend Engineer',
    company: 'Brightline',
    location: 'Remote',
    salary: 125000,
    type: 'Full-time',
    description: 'Create accessible, responsive React interfaces that make complex workflows feel simple and fast. You will collaborate closely with designers, strengthen the shared component library, and use customer feedback to continually improve the web platform experience.',
  },
  {
    title: 'Backend Engineer',
    company: 'Dataforge',
    location: 'Boston, MA',
    salary: 140000,
    type: 'Full-time',
    description: 'Design secure APIs, dependable data pipelines, and scalable backend services using TypeScript and PostgreSQL. This role includes shaping technical decisions, mentoring teammates through thoughtful reviews, and improving observability across production systems.',
  },
  {
    title: 'Full Stack Developer',
    company: 'CivicStack',
    location: 'Washington, DC',
    salary: 118000,
    type: 'Full-time',
    description: 'Deliver complete product features from discovery through deployment across a React frontend and Node.js backend. Work in a small cross-functional team where you will own technical tradeoffs, test thoroughly, and directly see the impact of your work.',
  },
  {
    title: 'Data Analyst',
    company: 'Atlas Retail',
    location: 'Chicago, IL',
    salary: 90000,
    type: 'Full-time',
    description: 'Turn retail and customer data into clear dashboards, well-reasoned analyses, and practical recommendations for business partners. You will define useful metrics, investigate trends, and communicate findings in a way that helps teams make confident decisions.',
  },
  {
    title: 'Product Designer',
    company: 'Mosaic Health',
    location: 'Remote',
    salary: 110000,
    type: 'Full-time',
    description: 'Research, prototype, and design thoughtful workflows for a healthcare platform used by patients and care teams. You will conduct usability studies, translate complex requirements into intuitive experiences, and help maintain a high-quality design system.',
  },
  {
    title: 'DevOps Engineer',
    company: 'Cloudport',
    location: 'Austin, TX',
    salary: 132000,
    type: 'Full-time',
    description: 'Improve deployment automation, observability, and cloud infrastructure reliability for a distributed application. You will build helpful developer tooling, manage infrastructure as code, and collaborate with engineering teams to make releases safer and faster.',
  },
  {
    title: 'QA Automation Engineer',
    company: 'Orbit Commerce',
    location: 'Denver, CO',
    salary: 105000,
    type: 'Contract',
    description: 'Develop meaningful automated test coverage for web applications and backend APIs while helping teams catch defects earlier. You will create maintainable test suites, investigate quality trends, and partner with developers to improve release confidence.',
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Signal AI',
    location: 'San Francisco, CA',
    salary: 160000,
    type: 'Full-time',
    description: 'Build and operate machine-learning systems that power personalized product recommendations at scale. You will work with data scientists and platform engineers to prepare data, evaluate models, deploy reliable services, and monitor real-world performance.',
  },
  {
    title: 'Software Engineering Intern',
    company: 'Launchpad Systems',
    location: 'Seattle, WA',
    salary: 65000,
    type: 'Internship',
    description: 'Work with experienced engineers on production features and internal developer tooling during a structured summer internship. You will receive mentorship, participate in code reviews and planning, and ship a scoped project that has a visible impact on the product.',
  },
  {
    title: 'Cybersecurity Analyst',
    company: 'Harbor Security',
    location: 'Baltimore, MD',
    salary: 115000,
    type: 'Full-time',
    description: 'Monitor security signals, investigate suspicious activity, and help strengthen controls across cloud and corporate systems. You will document incident findings, improve detection playbooks, and work with engineering teams to reduce risk before issues become customer-impacting events.',
  },
  {
    title: 'Mobile Engineer',
    company: 'Trailhead Mobile',
    location: 'Portland, OR',
    salary: 128000,
    type: 'Full-time',
    description: 'Build high-quality mobile experiences for iOS and Android that help people plan and enjoy outdoor adventures. Collaborate with product and design to deliver reliable offline functionality, smooth interactions, and a maintainable application architecture.',
  },
  {
    title: 'Technical Product Manager',
    company: 'Relay Systems',
    location: 'Remote',
    salary: 145000,
    type: 'Full-time',
    description: 'Lead the strategy and delivery of technical platform capabilities used by internal teams and external customers. You will turn customer problems into clear requirements, align stakeholders around priorities, and measure whether released features deliver meaningful outcomes.',
  },
  {
    title: 'Data Engineer',
    company: 'Summit Finance',
    location: 'Charlotte, NC',
    salary: 138000,
    type: 'Full-time',
    description: 'Create trustworthy data pipelines and modeled datasets that support reporting, analytics, and machine-learning use cases. You will improve data quality, collaborate with analysts and engineers, and help establish practical standards for reliable data delivery.',
  },
  {
    title: 'Site Reliability Engineer',
    company: 'Vector Grid',
    location: 'Remote',
    salary: 150000,
    type: 'Full-time',
    description: 'Keep critical services dependable by improving monitoring, incident response, capacity planning, and operational automation. This role balances hands-on engineering with partnership across product teams to establish sensible reliability goals and learn from production incidents.',
  },
  {
    title: 'UX Researcher',
    company: 'Kindred Education',
    location: 'Philadelphia, PA',
    salary: 108000,
    type: 'Full-time',
    description: 'Plan and conduct qualitative research that helps an education platform better serve students, families, and teachers. You will synthesize interviews and usability sessions into clear insights, then work with design and product partners to influence roadmap decisions.',
  },
  {
    title: 'Business Intelligence Developer',
    company: 'Greenway Logistics',
    location: 'Atlanta, GA',
    salary: 102000,
    type: 'Full-time',
    description: 'Develop dependable reporting models and self-service dashboards for operations, finance, and leadership teams. You will partner with stakeholders to clarify questions, validate data definitions, and turn operational information into timely, actionable visibility.',
  },
  {
    title: 'Cloud Solutions Architect',
    company: 'Pioneer Cloud',
    location: 'Dallas, TX',
    salary: 155000,
    type: 'Full-time',
    description: 'Guide customers through secure, scalable cloud solution designs that solve real business and technical constraints. You will lead architecture discussions, create technical prototypes, and work with account teams to ensure successful adoption after implementation.',
  },
  {
    title: 'API Integration Engineer',
    company: 'Bridgeworks',
    location: 'New York, NY',
    salary: 122000,
    type: 'Contract',
    description: 'Design and deliver integrations between partner systems and a modern commerce platform using well-documented APIs. You will troubleshoot data flows, work directly with technical stakeholders, and create reusable patterns that make future integrations easier to support.',
  },
  {
    title: 'Junior Software Developer',
    company: 'Maple Street Tech',
    location: 'Columbus, OH',
    salary: 78000,
    type: 'Full-time',
    description: 'Join an engineering team building practical tools for local businesses and learn through close mentorship. You will contribute tested code, participate in team rituals, and develop confidence working across frontend, backend, and database tasks.',
  },
  {
    title: 'Platform Engineer',
    company: 'Meridian Health',
    location: 'Minneapolis, MN',
    salary: 142000,
    type: 'Full-time',
    description: 'Build internal platform capabilities that let product engineers deliver secure services with less operational overhead. You will improve developer workflows, standardize deployment patterns, and create clear documentation that makes the platform easy to adopt.',
  },
  {
    title: 'Marketing Data Scientist',
    company: 'Echo Media',
    location: 'Los Angeles, CA',
    salary: 130000,
    type: 'Full-time',
    description: 'Use experimentation, segmentation, and predictive analysis to help marketing teams understand audience behavior and campaign effectiveness. You will translate ambiguous business questions into rigorous analyses and present recommendations that influence investment decisions.',
  },
  {
    title: 'Systems Administrator',
    company: 'Ironclad Manufacturing',
    location: 'Pittsburgh, PA',
    salary: 88000,
    type: 'Full-time',
    description: 'Maintain the systems and employee technology that keep a multi-site manufacturing organization productive and secure. You will manage identity and endpoint services, resolve complex issues, document procedures, and identify opportunities to automate routine support work.',
  },
  {
    title: 'Technical Writer',
    company: 'Open Circuit',
    location: 'Remote',
    salary: 95000,
    type: 'Contract',
    description: 'Create clear, accurate documentation that helps developers successfully adopt a workflow automation platform. You will work with engineers and support teams to explain APIs, product capabilities, and best practices through guides, references, and practical examples.',
  },
  {
    title: 'Product Operations Specialist',
    company: 'Willow Commerce',
    location: 'Miami, FL',
    salary: 82000,
    type: 'Full-time',
    description: 'Improve the processes, tools, and feedback loops that help product teams make better decisions and execute consistently. You will organize customer insights, coordinate planning activities, and use data to surface opportunities for a smoother product development process.',
  },
];

async function main() {
  const existingJobs = await prisma.job.count();

  if (existingJobs > 0) {
    console.log(`Skipped seeding: the jobs table already contains ${existingJobs} job(s).`);
    return;
  }

  const result = await prisma.job.createMany({ data: jobs });
  console.log(`Seeded ${result.count} jobs.`);
}

main()
  .catch((error) => {
    console.error('Failed to seed jobs:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
