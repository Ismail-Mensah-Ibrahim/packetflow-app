# Database Architecture

PacketFlow's primary database is **Supabase (PostgreSQL)**.

## Core Tables
1. **users**
   - Automatically managed via Firebase Auth hooks or Supabase Auth.
   - `id` (UUID), `email`

2. **profiles**
   - Stores user-specific settings and metadata.
   - `id` (references users.id), `full_name`, `bio`, `avatar_url`

3. **projects**
   - Stores the network topologies.
   - `id` (UUID), `user_id`, `name`, `description`, `topology_data` (JSONB)
   - `topology_data` holds the heavily structured arrays of `nodes` and `edges`.

4. **notifications**
   - Tracks app-level alerts.
   - `id` (UUID), `user_id`, `title`, `message`, `read` (boolean)

## Policies (Row Level Security)
All tables enforce Row Level Security (RLS) to ensure users can only `SELECT`, `UPDATE`, or `DELETE` their own data.
