import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertOptimization } from "@shared/routes";

// GET /api/history
export function useOptimizations() {
  return useQuery({
    queryKey: [api.optimize.history.path],
    queryFn: async () => {
      const res = await fetch(api.optimize.history.path);
      if (!res.ok) throw new Error("Failed to fetch history");
      return api.optimize.history.responses[200].parse(await res.json());
    },
  });
}

// POST /api/optimize
export function useOptimizePrompt() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { prompt: string }) => {
      const validated = api.optimize.generate.input.parse(data);
      
      const res = await fetch(api.optimize.generate.path, {
        method: api.optimize.generate.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 500) {
          const error = api.optimize.generate.responses[500].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to optimize prompt");
      }

      return api.optimize.generate.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      // Refresh history after a successful optimization
      queryClient.invalidateQueries({ queryKey: [api.optimize.history.path] });
    },
  });
}
