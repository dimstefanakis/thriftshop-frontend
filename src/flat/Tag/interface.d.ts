export interface TagProps {
  tag: TagInterface;
  type?: string;
}

interface TagInterface {
  name: string;
  id: string | number;
}
