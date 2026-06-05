'use client';

import { Sparkles, Loader2, MapPin, Coffee, Camera, ShoppingBag, Utensils, Clock, Star, RefreshCcw, AlertTriangle, Wand2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { GenerateTravelSuggestionOutput } from '@/ai/flows/generate-travel-suggestion-flow';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SuggestionCardProps {
  suggestion: GenerateTravelSuggestionOutput | null;
  isLoading: boolean;
  error?: string | null;
  onCreatePlan: () => void;
  hasCityData: boolean;
}

const ActivityIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case 'dining': return <Utensils className={className} />;
    case 'culture': return <Camera className={className} />;
    case 'shopping': return <ShoppingBag className={className} />;
    case 'relaxation': return <Coffee className={className} />;
    default: return <Star className={className} />;
  }
};

export function SuggestionCard({ suggestion, isLoading, error, onCreatePlan, hasCityData }: SuggestionCardProps) {
  return (
    <Card className="glass-card rounded-2xl animate-fade-in-up animate-stagger-4 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-4 p-5 md:p-6 border-b border-slate-50">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-primary font-code text-[8px] font-bold tracking-widest uppercase">
            <Sparkles className="h-2.5 w-2.5 text-yellow-500" />
            AI Insight
          </div>
          <CardTitle className="text-lg md:text-xl font-headline font-bold text-slate-900 tracking-tight">
            {suggestion?.itineraryTitle || 'Curated Itinerary'}
          </CardTitle>
        </div>
        {suggestion && !isLoading && (
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 px-2 py-0 rounded-full text-[7px] font-bold uppercase tracking-widest">
            Bespoke
          </Badge>
        )}
      </CardHeader>
      <CardContent className="relative p-5 md:p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <div className="text-center space-y-0.5">
              <p className="text-slate-900 font-headline text-base font-bold">Curating your path...</p>
              <p className="text-slate-400 font-body text-[10px]">Processing local atmospheric trends.</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
            <div className="p-3 rounded-full bg-orange-50">
              <AlertTriangle className="h-6 w-6 text-orange-400" />
            </div>
            <div className="space-y-1.5 max-w-sm">
              <h4 className="text-base font-headline font-bold text-slate-900">Concierge Unavailable</h4>
              <p className="text-slate-500 font-body text-[10px] leading-relaxed">{error}</p>
              <Button 
                onClick={onCreatePlan} 
                variant="outline" 
                size="sm"
                className="mt-2 h-8 rounded-lg font-code text-[7px] tracking-widest border-orange-100 text-orange-600 uppercase"
              >
                <RefreshCcw className="h-2.5 w-2.5 mr-1" />
                Retry Generation
              </Button>
            </div>
          </div>
        ) : suggestion ? (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute left-[14px] md:left-[18px] top-4 bottom-4 w-[1px] bg-slate-100" />
              
              <div className="space-y-6">
                {suggestion.itinerary.map((item, index) => (
                  <div key={index} className="relative flex gap-4 group/item">
                    <div className="relative z-10 flex h-7 w-7 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-100 shadow-sm transition-all duration-300">
                       <ActivityIcon type={item.type} className="h-3.5 w-3.5 text-primary" />
                    </div>

                    <div className="flex-1 space-y-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="flex items-center gap-1 text-[8px] font-code font-bold text-slate-400 uppercase tracking-widest">
                          <Clock className="h-2.5 w-2.5" />
                          {item.time}
                        </span>
                        <Badge variant="secondary" className="bg-slate-50 text-slate-400 font-code text-[6px] uppercase tracking-widest px-1.5 py-0 rounded">
                          {item.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-0.5">
                        <h4 className="text-base md:text-lg font-headline font-bold text-slate-900">
                          {item.activity}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                          <MapPin className="h-2.5 w-2.5 opacity-50" />
                          <span className="font-medium">{item.location}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-body font-light max-w-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {suggestion.insiderTip && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-50/30 border border-indigo-100/50 flex gap-3 items-start">
                <div className="p-1.5 rounded-md bg-white shadow-sm shrink-0 border border-indigo-50">
                  <Star className="h-3 w-3 text-indigo-500 fill-indigo-500" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[7px] font-code font-bold text-indigo-500 uppercase tracking-widest">
                    Concierge Tip
                  </span>
                  <p className="text-xs md:text-sm text-slate-700 font-headline font-medium leading-snug">
                    "{suggestion.insiderTip}"
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
             <div className="p-4 rounded-full bg-blue-50/50">
                <Wand2 className="h-10 w-10 text-primary opacity-40 animate-pulse" />
             </div>
             <div className="space-y-2 max-w-xs">
                <h3 className="font-headline text-lg font-bold text-slate-900">Atmospheric Path</h3>
                <p className="font-body text-[10px] text-slate-400 leading-relaxed">
                  Generate a travel itinerary tailored to the current weather and local city trends.
                </p>
             </div>
             <Button 
               onClick={onCreatePlan} 
               disabled={!hasCityData}
               className="h-10 px-6 rounded-xl font-headline font-bold text-sm tracking-tight transition-all active:scale-95"
             >
               <Sparkles className="h-4 w-4 mr-2" />
               Create AI Plan
             </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
