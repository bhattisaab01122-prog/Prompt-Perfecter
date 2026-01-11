import { useOptimizations } from "@/hooks/use-optimizations";
import { formatDistanceToNow } from "date-fns";
import { History, ArrowRight, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HistoryListProps {
  onSelect: (original: string, optimized: string) => void;
}

export function HistoryList({ onSelect }: HistoryListProps) {
  const { data: history, isLoading } = useOptimizations();

  if (isLoading) {
    return (
      <Card className="h-full border-none shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="w-5 h-5" />
            Recent Optimizations
          </CardTitle>
        </CardHeader>
        <div className="flex justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (!history || history.length === 0) {
    return (
      <Card className="h-full border-none shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="w-5 h-5" />
            Recent Optimizations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/20">
            No history yet. Start optimizing!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-none shadow-none bg-transparent flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <History className="w-5 h-5" />
          Recent Optimizations
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 px-6 overflow-hidden">
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {history.map((item) => (
              <div 
                key={item.id}
                className="group relative flex flex-col gap-2 rounded-lg border p-3 text-sm transition-all hover:bg-accent/50 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">Original</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {item.createdAt && formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <p className="line-clamp-2 text-muted-foreground">
                    {item.originalPrompt}
                  </p>
                </div>
                
                <div className="my-1 border-t border-dashed" />
                
                <div className="flex w-full flex-col gap-1">
                  <span className="font-semibold text-primary">Optimized</span>
                  <p className="line-clamp-2 text-muted-foreground font-mono text-xs">
                    {item.optimizedPrompt}
                  </p>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-2 top-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onSelect(item.originalPrompt, item.optimizedPrompt)}
                >
                  <ArrowRight className="w-4 h-4" />
                  <span className="sr-only">Load</span>
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
