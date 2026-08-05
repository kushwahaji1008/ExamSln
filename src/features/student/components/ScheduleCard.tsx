import React from 'react';
import { Video, Calendar as CalendarIcon, Clock } from 'lucide-react';

export interface ScheduleEvent {
  id: string;
  title: string;
  type: 'live-class' | 'deadline';
  time: string;
  instructor?: string;
}

interface ScheduleCardProps {
  events?: ScheduleEvent[];
  dateString?: string;
}

export default function ScheduleCard({ events = [], dateString = 'Today' }: ScheduleCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-indigo-400" />
          Schedule
        </h2>
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          {dateString}
        </span>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-6 text-center">
          <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
            <Clock className="h-5 w-5 text-slate-500" />
          </div>
          <p className="text-sm font-medium text-slate-300">Your day is clear.</p>
          <p className="text-xs text-slate-500 mt-1">No scheduled classes or deadlines.</p>
        </div>
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {events.map((event) => (
            <div 
              key={event.id}
              className="flex items-start gap-4 rounded-2xl bg-slate-950/60 p-4 border border-white/5 transition hover:bg-slate-800"
            >
              <div className="flex flex-col items-center justify-center pt-0.5">
                <span className="text-xs font-bold text-slate-300">{event.time.split(' ')[0]}</span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase">{event.time.split(' ')[1]}</span>
              </div>

              <div className="w-px h-10 bg-slate-800 mx-1" />

              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-200 leading-tight">
                  {event.title}
                </h4>
                {event.type === 'live-class' && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
                    <Video className="h-3.5 w-3.5" />
                    <span>Live Class {event.instructor && `with ${event.instructor}`}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}