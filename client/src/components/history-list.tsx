import { useOptimizations } from "@/hooks/use-optimizations";
import { formatDistanceToNow } from "date-fns";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface HistoryListProps {
  onSelect: (original: string, optimized: string) => void;
}

export function HistoryList({ onSelect }: HistoryListProps) {
  const { data: history, isLoading } = useOptimizations();

  if (isLoading) {
    return (
      <div className="space-y-3" data-testid="history-panel">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2" data-testid="text-history-heading">
          <Clock className="w-3.5 h-3.5" />
          History
        </h3>
        <div className="flex justify-center py-8" data-testid="history-loading">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="space-y-3" data-testid="history-panel">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2" data-testid="text-history-heading">
          <Clock className="w-3.5 h-3.5" />
          History
        </h3>
        <p className="text-xs text-muted-foreground text-center py-6" data-testid="text-history-empty">
          Your optimizations will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-testid="history-panel">
      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2" data-testid="text-history-heading">
        <Clock className="w-3.5 h-3.5" />
        History
      </h3>
      <ScrollArea className="h-[500px]">
        <div className="space-y-2 pr-2">
          {history.map((item) => (
            <button
              key={item.id}
              className="group w-full text-left rounded-lg border border-border/50 hover:border-border p-3 transition-colors bg-card hover:bg-accent/30"
              onClick={() => onSelect(item.originalPrompt, item.optimizedPrompt)}
              data-testid={`button-history-${item.id}`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-foreground line-clamp-2 leading-relaxed" data-testid={`text-history-prompt-${item.id}`}>
                  {item.originalPrompt}
                </p>
                <ArrowRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5" data-testid={`text-history-time-${item.id}`}>
                {item.createdAt && formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
