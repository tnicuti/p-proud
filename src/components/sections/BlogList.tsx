"use client";

import { useState } from "react";
import { FilterBar } from "@/components/ui/FilterBar";
import { Grid } from "@/components/ui/Layout";
import { blogTopics, posts, type BlogTopic } from "@/content/posts";
import { PostCard } from "./Cards";

const options: { value: BlogTopic | ""; label: string }[] = [
  { value: "", label: "Tất cả" },
  ...blogTopics.map((t) => ({ value: t, label: t })),
];

export function BlogList() {
  const [topic, setTopic] = useState<BlogTopic | "">("");
  return (
    <>
      <FilterBar label="Lọc theo chủ đề" options={options} value={topic} onChange={setTopic} />
      <Grid cols={3}>
        {posts
          .filter((p) => !topic || p.topic === topic)
          .map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
      </Grid>
    </>
  );
}
