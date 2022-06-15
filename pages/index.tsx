import axiosClient from "@/api/axios-client";
import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models/common";
import styles from "@/styles/index.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "../models";

const Home: NextPageWithLayout = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    (async () => {
      const {data} =  await axiosClient.get('/posts')
      setPosts(data);
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
