export interface IProject {
  id: string;
  title: string;
  clientName: string;
  status: 'NEW' | 'DESIGN' | 'DESIGN_REVIEW' | 'DEVELOPMENT' | 'INTERNAL_REVIEW' | 'COMPLETED';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  designer?: string | null;
  developer?: string | null;
}

export interface IClient {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
  projectCount: number;
}
