import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models/common";
import { Post } from "../models";
import styles from "@/styles/index.module.css";

const Home: NextPageWithLayout = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    (async () => {
      const data = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
      });
      const posts = await data.json();
      setPosts(posts);
    })();
  }, []);

  return (
    <div className={styles.container}>
      {posts.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.description}</p>
          <img src={item.imageUrl} alt={item.title} width={1000} height={200} />
          <Link href={`/post/${item.id}`}>
            <a>click more</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

Home.Layout = MainLayout;
export default Home;
