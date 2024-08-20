import './styles.css'

import { useState } from 'react'
import {
  useChangeSession,
  useCroquetSession,
  usePublish,
  useModelRoot,
} from '@croquet/react' //prettier-ignore

import RootModel from './models/root'

import Dropdown from './components/Dropdown'
import CroquetQRCode from './components/CroquetQRCode'
import Colors from './components/Colors'
import Painting from './components/Painting'
import ViewCount from './components/ViewCount'

import { sessions } from './data/sessions'
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

  const { name: sessionName } = useCroquetSession()
  const changeSession = useChangeSession()
  const dropdownOptions = sessions.map((s) => ({ value: s, label: s.name }))
  const selectedOption = sessions.findIndex((s) => s.name === sessionName)
  const handleDropdownChange = (selectedIdx) => {
    const s = sessions[selectedIdx]
    changeSession({ name: s.name, password: s.password })

    // Update URL session
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('session', s.name)
    window.history.replaceState(null, '', `${window.location.pathname}?${searchParams.toString()}`)
  }

  return (
    <div className='App'>
      {showSessionDropdown && (
        <Dropdown
          {...{
            selected: selectedOption,
            options: dropdownOptions,
            onChange: handleDropdownChange,
          }}
        />
      )}

      {showUserCount && <ViewCount />}

      <Colors {...{ selectedColor, set_selectedColor, resetPainting }} />
      <Painting {...{ onClick: paintCell }} />
      {showQR && (
        <div className='qr-container'>
          <CroquetQRCode />
        </div>
      )}
    </div>
  )
}
