import { MainLayout } from '@/components/layout'
import styles from '@/styles/about.module.css'
import Link from 'next/link'
import { server, Student } from '../models'
type Props = {
  students : Student[]
}

export default function About({students}: Props) {
  if(students.length === 0) {
    return (<p>No data</p>)
    }
  return (
    <ul className={styles.container}>
    {students?.map((item) => (
      <li key={item.id}>
          <div>
            <a>{item.name}</a>
             <a>{item.age}</a>
             <a>{item.mark}</a>
             <a>{item.gender}</a>
             <Link href={`/students/${item.id}`}>
              <p>more</p>
             </Link>
          </div>

      </li>
    ))}
  </ul>
  )
}
export async function getStaticProps() {

  const res = await fetch(`${server}/api/students`,{
    method: 'GET',
  })
  const students = await res.json()
  return {
    props: {
      students: students,
    },
    revalidate: 100, // In seconds
  }
}
About.Layout = MainLayout


