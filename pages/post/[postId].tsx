import { useRouter } from "next/router";
import { MainLayout } from "@/components/layout";
import { Post } from "@/models/index";
import {
  GetStaticPaths, GetStaticProps, GetStaticPropsContext
} from "next";
import styles from "@/styles/post.module.css";
type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  const route = useRouter();

  if (route.isFallback) {
    return <div className={styles.container}>Loading...</div>; // fallback page when mode true
  }
  if (!post) {
    return null;
  }
  const { id,description,imageUrl,title } = post;
  return (
    <div className={styles.container}>
      <a>{title}</a>
      <a>{description}</a>
      <img src={imageUrl} alt={title} width={200} height={200}/>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  if (!context.params?.postId) {
    return { notFound: true };
  }
  const res = await fetch('http://localhost:3000/api/posts',{
    method: 'GET',
  })
  const data = await res.json()
  const post = data?.filter(
    (item: Post) => item.id === context.params?.postId
  )[0];

  return {
    props: {
      post:{...post},
    },
    revalidate: 100, // In seconds
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/posts", {
    method: "GET",
  });
  const data = await res.json();
  return {
    paths: data.map((item: Post) => ({
      params: { postId: item.id.toString() },
    })),
    fallback: true,
  };
}

PostDetail.Layout = MainLayout;
