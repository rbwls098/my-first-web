// 게시글 작성 페이지
import Navbar from "@/components/Navbar";
import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">새 게시글 작성</h2>
        <PostForm />
      </main>
    </div>
  );
}
