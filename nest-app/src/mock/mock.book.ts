export interface MockBookProps {
  code: string;
  title: string;
  author: string;
  stock: number;
  borrowedAt?: Date | null;
  returnedAt?: Date | null;
  borrowedBy?: any;
}

export const mockBooks: MockBookProps[] = [
  {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
    borrowedAt: null,
    returnedAt: null,
    borrowedBy: null,
  },
  {
    code: 'SHR-1',
    title: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    stock: 1,
    borrowedAt: null,
    returnedAt: null,
    borrowedBy: null,
  },
  {
    code: 'TW-11',
    title: 'Twilight',
    author: 'Stephenie Meyer',
    stock: 1,
    borrowedAt: null,
    returnedAt: null,
    borrowedBy: null,
  },
  {
    code: 'HOB-83',
    title: 'The Hobbit, or There and Back Again',
    author: 'J.R.R. Tolkien',
    stock: 1,
    borrowedAt: null,
    returnedAt: null,
    borrowedBy: null,
  },
  {
    code: 'NRN-7',
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    stock: 1,
    borrowedAt: null,
    returnedAt: null,
    borrowedBy: null,
  },
];
