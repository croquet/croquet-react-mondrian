import './styles.css'

import { useState } from 'react'
import { useIsConnected, usePublish, useModelRoot } from '@croquet/react'

import RootModel from './models/root'

import Dropdown from './components/Dropdown'
import CroquetQRCode from './components/CroquetQRCode'
import Colors from './components/Colors'
import Painting from './components/Painting'
import ViewCount from './components/ViewCount'
import { colors } from './data/paintingCells'

type MondrianProps = {
  showQR: boolean
  showUserCount: boolean
  showSessionDropdown: boolean
}
export default function Mondrian({ showQR = true, showUserCount = true, showSessionDropdown = true }: MondrianProps) {
  const model = useModelRoot<RootModel>()

  const [selectedColor, set_selectedColor] = useState(colors[0])
  const publishReset = usePublish((data) => [model.painting.id, 'reset', data])
  const publishPaint = usePublish((data) => [model.painting.id, 'paint', data])

  const resetPainting = () => publishReset()
  const paintCell = (cellId: number) => {
    if (selectedColor === null) return
    const payload = { cellId, newColor: selectedColor }
    publishPaint(payload)
  }

  const isConnected = useIsConnected()

  return (
    <div className='App'>
      {showSessionDropdown && <Dropdown />}
      {showUserCount && <ViewCount />}

      {isConnected ? (
        <>
          <Colors {...{ selectedColor, set_selectedColor, resetPainting }} />
          <Painting {...{ onClick: paintCell }} />
          {showQR && (
            <div className='qr-container'>
              <CroquetQRCode />
            </div>
          )}
        </>
      ) : (
        <p>Disconnected. Please choose a session to connect to</p>
      )}
    </div>
  )
}
