import { useRouter } from "next/router";
import { MainLayout } from "@/components/layout";
import { Student } from "@/models/index";
import {
  GetStaticPaths, GetStaticProps, GetStaticPropsContext
} from "next";
import styles from "@/styles/student.module.css";
type Props = {
  student: Student;
};

export default function Detail({ student }: Props) {
  const route = useRouter();
  if (route.isFallback) {
    return <div className={styles.container}>Loading...</div>; // fallback page when mode true
  }
  if (!student) {
    return null;
  }
  const { name, age, mark, gender } = student;
  return (
    <div className={styles.container}>
      <a>{name}</a>
      <a>{age}</a>
      <a>{mark}</a>
      <a>{gender}</a>
    </div>
  );
}
export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  if (!context.params?.stuId) {
    return { notFound: true };
  }
  const res = await fetch('http://localhost:3000/api/students',{
    method: 'GET',
  })
  const data = await res.json()
  const student = data?.filter(
    (item: Student) => item.id === context.params?.stuId
  )[0];
  console.log(student);
  return {
    props: {
      student:{...student},
    },
    revalidate: 100, // In seconds
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/students", {
    method: "GET",
  });
  const data = await res.json();
  return {
    paths: data.map((item: Student) => ({
      params: { stuId: item.id.toString() },
    })),
    fallback: true,
  };
}

Detail.Layout = MainLayout;
