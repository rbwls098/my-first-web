// Ch6 usePosts 커스텀 훅 — 보너스
// JSONPlaceholder에서 게시글을 가져오는 커스텀 훅

"use client";

import { useState, useEffect } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => {
        if (!res.ok) throw new Error("게시글을 불러오지 못했습니다");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { posts, isLoading, error };
}
