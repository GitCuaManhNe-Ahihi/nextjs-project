import { MainLayout } from '@/components/layout'
import styles from '@/styles/profile.module.css'
import { useAuth } from 'hooks'
type Props = {}

export default function Profile({}: Props) {
  const {profile} = useAuth()
  console.log(profile)
  return (
      <div className={styles.container}>
        {
          !Object(profile)["data"]?<p>You should login </p>:
          <div>
            <p>{Object(profile).data.username}</p>
            <p>{Object(profile).data.email}</p>
            <p>{Object(profile).data.city}</p>
          </div>
        }
      </div>
  )
}



Profile.Layout = MainLayout
