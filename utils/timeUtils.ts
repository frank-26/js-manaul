import moment from 'moment';

const FORMAT = 'YYYY-MM-DD HH:mm:ss';
// utcstr -> timestring
export const formatUnixTime = (timestamp: number | string, format = FORMAT) => {
  if (typeof timestamp === 'string') return moment(timestamp).format(format);

  return timestamp ? moment.unix(timestamp).format(format) : '-';
};

export const formatString = (str: string, format = FORMAT) =>
  moment(str).format(format);

// timestring -> utc string
export const formatString2UTC = (str: string) =>
  moment(str)
    .utcOffset(8)
    .format();

export function timestamp2moment(timestamp: number) {
  if (!timestamp) {
    return null;
  }

  return moment(new Date(timestamp * 1000));
}

export function moment2timestamp(momentObj: any) {
  if (!momentObj) {
    return null;
  }

  return Math.round(momentObj.unix());
}
