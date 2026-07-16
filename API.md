# API & Services

This document outlines how PacketFlow communicates with external services and databases.

## Supabase Data Fetching
Rather than using a centralized API folder, PacketFlow utilizes direct Supabase client queries wrapped in React Query hooks or standard async functions.

### Standard Pattern
When a component needs data, it typically imports a service function or calls Supabase directly inside a `queryFn`:

```typescript
import { supabase } from '@/lib/supabase';

export async function fetchProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });
    
  if (error) throw error;
  return data;
}
```

## Caching Strategy
- **React Query**: Handles the in-memory cache for the UI.
- **Topology Cache**: The canvas utilizes `src/lib/topologyCache.ts` via `expo-file-system` to write massive network states (nodes/edges) to the local disk. This prevents the user from losing their entire canvas if the app crashes before they hit "Save".

## Real-time Sync
*(If implemented)* Supabase Realtime subscriptions can be used to listen for changes on specific project rows to allow collaborative editing. Currently, project states are saved explicitly via manual or debounced saves.
