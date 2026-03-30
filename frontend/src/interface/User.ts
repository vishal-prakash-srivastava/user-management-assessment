export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onUserAdded: () => void;
  initialData: User | null;
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  password?: string; // Optional during edits
}