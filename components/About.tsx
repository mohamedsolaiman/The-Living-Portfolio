
import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Briefcase, GraduationCap, Code, Server, Feather, GitBranch, TerminalSquare, Layers, BrainCircuit, ShieldCheck } from 'lucide-react';
import type { TimelineEvent, Skill } from '../types';

const timelineEvents: TimelineEvent[] = [
    { year: '2016', title: 'Started University', description: 'Began my B.S. in Computer Science, diving deep into algorithms, data structures, and software engineering principles.' },
    { year: '2018', title: 'First Internship', description: 'Gained real-world experience as a front-end intern, working with JavaScript and building responsive web pages.' },
    { year: '2020', title: 'Graduation & First Role', description: 'Graduated with honors and joined a tech startup as a Junior React Developer, contributing to a large-scale SaaS platform.' },
    { year: '2022', title: 'Senior Developer Promotion', description: 'Promoted to Senior Front-End Engineer, leading component library development and mentoring junior developers.' },
    { year: 'Present', title: 'Freelance & Open Source', description: 'Focusing on complex freelance projects and contributing to open-source libraries, constantly pushing the boundaries of my skills.' },
];

const skills: Skill[] = [
    { name: 'React', description: 'Building complex UIs with a component-based architecture.', icon: Code },
    { name: 'TypeScript', description: 'Ensuring type safety and scalability in large applications.', icon: TerminalSquare },
    { name: 'Next.js', description: 'Leveraging SSR and SSG for optimal performance and SEO.', icon: Layers },
    { name: 'Node.js', description: 'Developing server-side logic and RESTful APIs.', icon: Server },
    { name: 'Animation', description: 'Creating fluid experiences with Framer Motion.', icon: Feather },
    { name: 'State Management', description: 'Using Zustand and Redux Toolkit for predictable state.', icon: BrainCircuit },
    { name: 'Testing', description: 'Writing robust tests with Jest and RTL.', icon: ShieldCheck },
    { name: 'Git & CI/CD', description: 'Version control and automated deployment pipelines.', icon: GitBranch },
];

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
            staggerChildren: 0.1
        },
    },
};

const SectionWrapper: React.FC<{ id: string, title: string, children: React.ReactNode }> = ({ id, title, children }) => (
    <section id={id} className="py-20 md:py-28 bg-brand-bg">
        <div className="container mx-auto px-6">
            <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                {title}
                <span className="block h-1 w-20 bg-brand-primary mx-auto mt-2 rounded-full"></span>
            </motion.h2>
            {children}
        </div>
    </section>
);


const About: React.FC = () => {
    return (
        <SectionWrapper id="about" title="About the Architect">
            <motion.div 
              className="flex flex-col items-center gap-16"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
                {/* Timeline */}
                <div className="w-full max-w-2xl">
                    <h3 className="text-2xl font-bold mb-8 text-center text-brand-primary">My Journey</h3>
                    <div className="relative border-l-2 border-brand-surface ml-3">
                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                className="mb-10 ml-6"
                                variants={sectionVariants}
                            >
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-brand-primary rounded-full -left-3.5 ring-8 ring-brand-bg">
                                    {index % 2 === 0 ? <Briefcase size={14} className="text-brand-bg"/> : <GraduationCap size={14} className="text-brand-bg"/>}
                                </span>
                                <h4 className="flex items-center mb-1 text-lg font-semibold text-brand-text">
                                    {event.title}
                                    <span className="bg-brand-secondary/20 text-brand-secondary text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">{event.year}</span>
                                </h4>
                                <p className="text-base font-normal text-brand-subtle">{event.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="w-full max-w-4xl">
                    <h3 className="text-2xl font-bold mb-8 text-center text-brand-primary">In My Element</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {skills.map((skill) => (
                            <motion.div
                                key={skill.name}
                                variants={sectionVariants}
                                className="bg-brand-surface p-4 rounded-lg border border-transparent hover:border-brand-primary/50 transition-all duration-300 flex flex-col items-center text-center"
                            >
                                <skill.icon className="h-8 w-8 mb-3 text-brand-primary" />
                                <h4 className="text-md font-bold mb-1">{skill.name}</h4>
                                <p className="text-brand-subtle text-xs">{skill.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </SectionWrapper>
    );
};

export default About;
