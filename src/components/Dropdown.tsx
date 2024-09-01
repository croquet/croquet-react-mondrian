import { useChangeSession, useCroquetSession, useIsConnected, useLeaveSession } from '@croquet/react'
import { sessions } from '../data/sessions'

export default function Dropdown() {
  const changeSession = useChangeSession()
  const leaveSession = useLeaveSession()
  const isConnected = useIsConnected()
  const session = useCroquetSession()

  // @ts-ignore
  const sessionName = session?.name as string | undefined

  const options = [{ value: null, label: 'Disconnected' }].concat(sessions.map((s) => ({ value: s, label: s.name })))

  const selectedOption = isConnected ? sessions.findIndex((s) => s.name === sessionName) + 1 : 0
  if (isConnected && selectedOption === 0) {
    console.error('Failed to detect current session within options: ', sessionName)
  }

  const handleChange = (selectedIdx) => {
    const s = sessions[selectedIdx - 1]
    const searchParams = new URLSearchParams(window.location.search)
    if (!s) {
      leaveSession()
      searchParams.delete('session')
    } else {
      changeSession({ name: s.name, password: s.password })
      searchParams.set('session', s.name)
    }
    if (searchParams.size > 0) {
      window.history.replaceState(null, '', `${window.location.pathname}?${searchParams.toString()}`)
    } else {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }
  return (
    <select value={selectedOption} onChange={(e) => handleChange(e.target.selectedIndex)}>
      {options.map((option, i) => (
        <option key={i} value={i}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
