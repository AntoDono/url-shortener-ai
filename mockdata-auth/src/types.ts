export type User = {
  id: string;
  email: string;
  password: string;
};

export type Link = {
  id: string;
  url: string;
  alias: string;
  accessed: number;
  user_id: string;
  access_log: Array<{
    ip: string;
    user_agent: string;
  }>;
};
