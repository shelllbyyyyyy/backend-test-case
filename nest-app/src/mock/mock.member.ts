import { MockBookProps } from './mock.book';

interface MockMemberProps {
  code: string;
  name: string;
  books: MockBookProps[];
  count: number;
  penalty: boolean;
  penalizedAt?: Date | null;
}

export const mockMembers: MockMemberProps[] = [
  {
    code: 'M001',
    name: 'Angga',
    books: [],
    count: 0,
    penalty: false,
    penalizedAt: null,
  },
  {
    code: 'M002',
    name: 'Ferry',
    books: [],
    count: 0,
    penalty: false,
    penalizedAt: null,
  },
  {
    code: 'M003',
    name: 'Putri',
    books: [],
    count: 0,
    penalty: false,
    penalizedAt: null,
  },
];
