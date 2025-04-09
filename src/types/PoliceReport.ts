export interface PoliceReportData {
  // Internal Affairs Section (Administrative Use)
  departmentNo: string;
  internalAffairsCaseNo: string;

  // Person Making Report Section
  name: string;
  alias: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  employerSchool: string;
  race: string;
  gender: string;
  dob: string;
  age: string;
  sex: string;
  phoneSecondary: string;

  // Incident Details Section
  natureOfComplaint: string;
  complaintAgainst: string;
  badgeNos: string;
  incidentDate: string;
  incidentTime: string;
  reportedDateTime: string;
  howReported: string;
  incidentLocation: string;
  distArea: string;
  beat: string;
  incidentDescription: string;
}

export const emptyPoliceReport: PoliceReportData = {
  departmentNo: '',
  internalAffairsCaseNo: '',
  name: '',
  alias: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  employerSchool: '',
  race: '',
  gender: '',
  dob: '',
  age: '',
  sex: '',
  phoneSecondary: '',
  natureOfComplaint: '',
  complaintAgainst: '',
  badgeNos: '',
  incidentDate: '',
  incidentTime: '',
  reportedDateTime: '',
  howReported: '',
  incidentLocation: '',
  distArea: '',
  beat: '',
  incidentDescription: '',
};
