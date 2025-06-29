import { createClient } from '@supabase/supabase-js';
import { broadcastAlert } from './autoBroadcast';

const supabaseUrl = 'https://your-supabase-project.supabase.co';
const supabaseKey = 'your-anon-or-service-role-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function monitorForecastEvents() {
  supabase
    .channel('alerts')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'forecast_events'
      },
      (payload) => {
        const event = payload.new;
        if (event.trigger_alarm) {
          broadcastAlert(event);
        }
      }
    )
    .subscribe();
}