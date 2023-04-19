import moment from "moment";

export const formatarData = (data) => {
  if (!data) return "";
  return moment(data).format("DD/MM/YYYY");
};
