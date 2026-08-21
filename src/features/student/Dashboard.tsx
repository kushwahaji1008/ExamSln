import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';

// Component Imports
import WelcomeCard from './components/WelcomeCard';
import StatsCards from './components/StatsCards';
import ContinueLearning from './components/ContinueLearning';
import UpcomingExams from './components/UpcomingExams';
import ScheduleCard, { type ScheduleEvent } from './components/ScheduleCard';
import RecentActivity, { type ActivityItem } from './components/RecentActivity';
import RecommendedCourses from './components/RecommendedCourses';

export default function Dashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    // Simulate API fetch to aggregate all dashboard data
    const fetchDashboard = async () => {
      setIsLoading(true);
      try {
        // Mock payload representing aggregated API data
        setTimeout(() => {
          setDashboardData({
            stats: {
              activeCourses: 3,
              completedExams: 14,
              averageScore: 88,
            },
            activeCourse: {
              id: '101',
              title: 'Fullstack Next.js Bootcamp',
              currentChapter: 'Server Actions & Mutations',
              progressPercentage: 65,
              timeLeft: '45 mins',
            },
            schedule: [
              { id: 's1', title: 'React Workshop', type: 'live-class', time: '14:00', instructor: 'Sarah Jenkins' },
              { id: 's2', title: 'Midterm Submission Due', type: 'deadline', time: '23:59' }
            ] as ScheduleEvent[],
            upcomingExams: [
              { id: '1', title: 'Advanced React Patterns', date: '2026-08-15T10:00:00Z', duration: 60 },
              { id: '2', title: 'System Design Basics', date: '2026-08-18T14:30:00Z', duration: 90 },
            ],
            recentActivity: [
              { id: 'a1', title: 'System Architecture Midterm', type: 'exam', timestamp: '2 days ago', score: 85 },
              { id: 'a2', title: 'Completed: DB Normalization', type: 'lesson', timestamp: '3 days ago' },
              { id: 'a3', title: 'Fast Learner Badge', type: 'achievement', timestamp: '1 week ago' },
            ] as ActivityItem[],
            recommended: [
              { id: 'r1', title: 'Advanced GraphQL API Design', instructor: 'Alex Chen', rating: 4.8, students: 12500 },
              { id: 'r2', title: 'Microservices with Node & Docker', instructor: 'Priya Sharma', rating: 4.9, students: 8430 },
              { id: 'r3', title: 'Figma to React Masterclass', instructor: 'Marcus Doe', rating: 4.7, students: 5200 },
            ],
          });
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Failed to load dashboard', error);
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-5rem)] w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8 font-sans text-slate-100 pb-16">
      
      {/* Top Row: Welcome & High-level Stats */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <WelcomeCard userName={user?.fullName || 'Student'} />
        </div>
        <div className="lg:col-span-4">
          <StatsCards 
            activeCourses={dashboardData?.stats.activeCourses} 
            completedExams={dashboardData?.stats.completedExams}
            averageScore={dashboardData?.stats.averageScore}
          />
        </div>
      </div>

      {/* Middle Row: Primary Content and Sidebars */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (Main Focus) */}
        <div className="lg:col-span-8 space-y-6">
          <ContinueLearning course={dashboardData?.activeCourse} />
          
          {/* Side-by-side grid for Activity & Upcoming Exams on large screens */}
          <div className="grid gap-6 sm:grid-cols-2">
            <RecentActivity activities={dashboardData?.recentActivity} />
            <UpcomingExams exams={dashboardData?.upcomingExams} />
          </div>
        </div>

        {/* Right Column (Timeline & Schedule Focus) */}
        <div className="lg:col-span-4 space-y-6">
          <ScheduleCard events={dashboardData?.schedule} />
        </div>
      </div>

      {/* Bottom Row: Discovery */}
      <div className="pt-6 border-t border-border/5">
        <RecommendedCourses courses={dashboardData?.recommended} />
      </div>
      
    </div>
  );
}