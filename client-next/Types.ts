export type experienceType = {
  id?: string;
  company: string;
  date: string;
  description: string;
  location: string;
  role: string;
};

export type projectType = {
  title: string;
  description: string;
};

export type workInfoType = {
  projects: projectType[];
  experience: experienceType[];
};

export interface educationType {
  id?: string;
  discipline: string;
  honors: string;
  nameOfInstitution: string;
  yearEnded: string;
}

export interface achievementType {
  achievementTitle: string;
  awarder: string;
  date: string;
  event: string;
}
export interface skillType {
  skill: string;
  tools: string;
}

export type contactInfoType = {
  email: string;
  location: string;
  telephone: string;
  website: string;
};

export type personalInfo = {
  firstName: string;
  lastName: string;
  occupation: string;
};

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
};

export type ILoginSuccess = {
  payload: {
    token: string;
    user: UserType;
  };
};

export interface IValues {
  company: string;
  contactName: string;
  contactPhone: string;
  coverLetter: string;
  dateApplied: string;
  lastTimeContacted: string;
  likelihoodOfHiring: string;
  linkToOpening: string;
  location: string;
  mainContact: [];
  position: string;
  receptionMail: string;
  referral: string;
  relocation: string;
  remote: string;
  resume: string;
  source: string;
  status: string;
  strategy: string;
  tags: [];
  type: string;
}
