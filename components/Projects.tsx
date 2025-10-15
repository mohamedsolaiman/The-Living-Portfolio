
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, Code } from 'lucide-react';
import type { Project } from '../types';

const projectsData: Project[] = [
  { id: 1, title: 'E-commerce Platform', category: 'Web App', image: 'https://picsum.photos/seed/project1/600/400', problem: 'Client needed a scalable e-commerce solution with a modern UI and fast performance.', role: 'Lead Front-End Developer', stack: ['React', 'Next.js', 'Stripe', 'GraphQL'], challenges: 'Implementing a real-time inventory system and optimizing image loading for thousands of products.', liveUrl: '#', codeUrl: '#' },
  { id: 2, title: 'Data Visualization Dashboard', category: 'Data Science', image: 'https://picsum.photos/seed/project2/600/400', problem: 'A financial firm required an interactive dashboard to visualize complex market data.', role: 'UI/UX Engineer', stack: ['React', 'D3.js', 'TypeScript', 'WebSockets'], challenges: 'Rendering large datasets efficiently without sacrificing interactivity and ensuring cross-browser compatibility.', liveUrl: '#', codeUrl: '#' },
  { id: 3, title: 'Project Management Tool', category: 'SaaS', image: 'https://picsum.photos/seed/project3/600/400', problem: 'A startup wanted a collaborative project management tool with a focus on intuitive design.', role: 'Full-Stack Developer', stack: ['React', 'Node.js', 'PostgreSQL', 'Framer Motion'], challenges: 'Designing a flexible drag-and-drop interface for task management and implementing real-time collaboration features.', liveUrl: '#', codeUrl: '#' },
  { id: 4, title: 'Mobile Fitness App', category: 'Mobile App', image: 'https://picsum.photos/seed/project4/600/400', problem: 'A fitness brand needed a companion app for their workout programs.', role: 'React Native Developer', stack: ['React Native', 'Firebase', 'Expo'], challenges: 'Ensuring consistent performance across different devices and integrating with native health APIs.', liveUrl: '#', codeUrl: '#' },
];

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => (
    <motion.div
        layoutId={`card-container-${project.id}`}
        onClick={onClick}
        className="cursor-pointer bg-brand-surface rounded-lg overflow-hidden group border border-brand-surface hover:border-brand-primary/50 transition-all duration-300 shadow-lg"
        whileHover={{ y: -5 }}
    >
        <div className="overflow-hidden">
            <motion.img
                layoutId={`card-image-${project.id}`}
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="p-4">
            <motion.h3 layoutId={`card-title-${project.id}`} className="text-xl font-bold">{project.title}</motion.h3>
            <motion.p layoutId={`card-category-${project.id}`} className="text-sm text-brand-primary">{project.category}</motion.p>
        </div>
    </motion.div>
);

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
        <motion.div
            layoutId={`card-container-${project.id}`}
            className="bg-brand-surface rounded-lg overflow-y-auto max-h-[90vh] max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
        >
            <button onClick={onClose} className="sticky top-4 right-4 ml-auto block text-brand-subtle hover:text-brand-primary transition-colors z-10 bg-brand-surface/50 rounded-full p-1">
                <X size={24} />
            </button>
            <div className="overflow-hidden h-64 -mt-12">
                <motion.img layoutId={`card-image-${project.id}`} src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
                <motion.h3 layoutId={`card-title-${project.id}`} className="text-3xl font-bold mb-1">{project.title}</motion.h3>
                <motion.p layoutId={`card-category-${project.id}`} className="text-md text-brand-primary mb-6">{project.category}</motion.p>
                
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 text-brand-subtle">
                    <div>
                        <h4 className="font-bold text-brand-text mb-2 border-b border-brand-primary/20 pb-1">The Problem</h4>
                        <p className="text-sm">{project.problem}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-brand-text mb-2 border-b border-brand-primary/20 pb-1">My Role</h4>
                        <p className="text-sm">{project.role}</p>
                    </div>
                    <div className="md:col-span-2">
                        <h4 className="font-bold text-brand-text mb-2 border-b border-brand-primary/20 pb-1">Challenges & Solutions</h4>
                        <p className="text-sm">{project.challenges}</p>
                    </div>
                     <div className="md:col-span-2">
                        <h4 className="font-bold text-brand-text mb-2 border-b border-brand-primary/20 pb-1">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.stack.map(tech => <span key={tech} className="bg-brand-secondary/20 text-brand-secondary text-xs font-medium px-2 py-1 rounded-md">{tech}</span>)}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex space-x-4">
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-brand-primary text-brand-bg font-bold rounded-md hover:opacity-90 transition-all"><ExternalLink size={18} className="mr-2"/> Live Demo</a>}
                    {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-brand-secondary text-brand-text font-bold rounded-md hover:opacity-90 transition-all"><Code size={18} className="mr-2"/> View Code</a>}
                </div>
            </div>
        </motion.div>
    </motion.div>
);

const Projects: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="py-20 md:py-28 bg-brand-bg">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    Project Excellence
                    <span className="block h-1 w-20 bg-brand-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map(p => <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />)}
                </div>

                <AnimatePresence>
                    {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;
