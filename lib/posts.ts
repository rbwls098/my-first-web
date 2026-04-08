export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: "첫 번째 게시글",
    content: "안녕하세요. 제 블로그의 첫 번째 게시글입니다. 만나서 반갑습니다.",
    author: "홍길동",
    date: "2026-04-01",
  },
  {
    id: 2,
    title: "두 번째 게시글",
    content: "두 번째 게시글입니다. Next.js App Router를 배우고 있습니다.",
    author: "이순신",
    date: "2026-04-03",
  },
  {
    id: 3,
    title: "세 번째 게시글",
    content: "세 번째 게시글입니다. Tailwind CSS로 스타일링하는 방법을 익히고 있습니다.",
    author: "강감찬",
    date: "2026-04-06",
  },
];
