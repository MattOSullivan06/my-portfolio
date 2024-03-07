export interface DateData {
  datetime: string;
}

export interface FormattedDate {
  dayOfWeek: string | undefined;
  dateText: string | undefined;
  formattedDate: string | undefined;
}

export interface IpifyResponse {
  ip: string;
}
