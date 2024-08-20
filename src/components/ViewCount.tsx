import { useConnectedViews } from '@croquet/react'
import { BsPeopleFill } from 'react-icons/bs'

export default function ViewCount() {
  const { viewCount: nUsers } = useConnectedViews()
  return (
    <div className='user-count'>
      <BsPeopleFill />
      <span>{nUsers}</span>
    </div>
  )
}
