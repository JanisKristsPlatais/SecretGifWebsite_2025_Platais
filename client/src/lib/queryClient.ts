import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { staticApi } from "../staticRoutes";

// Check if we're running on GitHub Pages
const isGitHubPages = () => {
  return window.location.hostname.includes('github.io');
};

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // If on GitHub Pages, use static implementation
  if (isGitHubPages()) {
    // Handle specific API endpoints
    if (url === '/api/access-status' && method === 'GET') {
      const result = await staticApi.checkAccessStatus();
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url === '/api/grant-access' && method === 'POST') {
      await staticApi.grantAccess();
      return new Response(null, { status: 204 });
    }
    
    if (url === '/api/reset-access' && method === 'POST') {
      await staticApi.resetAccess();
      return new Response(null, { status: 204 });
    }
    
    // Default response for unhandled endpoints
    return new Response(JSON.stringify({ error: 'Not implemented' }), {
      status: 501,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Normal API request for non-GitHub Pages environment
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // If on GitHub Pages, use static implementation
    if (isGitHubPages()) {
      const url = queryKey[0] as string;
      
      if (url === '/api/access-status') {
        return staticApi.checkAccessStatus();
      }
      
      // Default response for unhandled endpoints
      throw new Error('API endpoint not implemented for static GitHub Pages version');
    }
    
    // Normal query for non-GitHub Pages environment
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
 

