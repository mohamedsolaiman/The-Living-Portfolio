
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Demo 1: Real-time data visualization
const initialData = [
    { name: '0s', value: 12 }, { name: '1s', value: 19 },
    { name: '2s', value: 3 }, { name: '3s', value: 5 },
    { name: '4s', value: 2 }, { name: '5s', value: 3 },
];
let time = 5;

const RealtimeChart: React.FC = () => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const interval = setInterval(() => {
            time++;
            const newDataPoint = { name: `${time}s`, value: Math.floor(Math.random() * 30) };
            setData(currentData => [...currentData.slice(1), newDataPoint]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="name" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #38BDF8', color: '#E2E8F0' }} />
                    <Line type="monotone" dataKey="value" stroke="#38BDF8" strokeWidth={2} dot={{ r: 4, fill: '#38BDF8' }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// Demo 2: Draggable Card
const DraggableCard: React.FC = () => {
    return (
        <div className="w-full h-64 flex items-center justify-center bg-brand-surface/50 rounded-lg overflow-hidden relative border border-brand-surface">
            <p className="text-brand-subtle z-0">Drag the card within this container</p>
            <motion.div
                drag
                dragConstraints={{ left: -150, right: 150, top: -80, bottom: 80 }}
                dragElastic={0.2}
                whileTap={{ scale: 1.1, cursor: 'grabbing' }}
                className="w-40 h-24 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg shadow-2xl flex items-center justify-center text-brand-bg font-bold cursor-grab z-10"
            >
                Drag Me
            </motion.div>
        </div>
    );
};

const sandboxItems = [
    { title: 'Real-time Data Visualization', description: 'A simulation of real-time data using Recharts and React hooks to manage state updates.', component: <RealtimeChart /> },
    { title: 'Physics-based Animation', description: 'An interactive card with drag-and-drop functionality, powered by Framer Motion.', component: <DraggableCard /> }
];

const Sandbox: React.FC = () => {
    return (
        <section id="sandbox" className="py-20 md:py-28 bg-brand-surface">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    The Sandbox
                    <span className="block h-1 w-20 bg-brand-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>

                <p className="text-center max-w-2xl mx-auto text-brand-subtle mb-12">
                    This is where genius is at play. A space for passion projects, experiments, and demonstrations of complex concepts.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {sandboxItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-brand-bg p-6 rounded-lg border border-brand-surface"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <h3 className="text-2xl font-bold mb-2 text-brand-primary">{item.title}</h3>
                            <p className="text-brand-subtle mb-4 text-sm">{item.description}</p>
                            <div className="mt-4">{item.component}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sandbox;
