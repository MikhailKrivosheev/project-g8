export type TTicket = {
  id: number;
  price: string;
  widget_type: 'ticketscloud' | 'timepad';
  data_tc_event: string;
  data_tc_token: string;
  timepad_event_id: string;
  timepad_customized_id: string;
  type: 'buy_ticket' | 'submit_job';
  published: boolean;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  button_text: string;
}[];
