import { useModelSelector } from '@croquet/react'
import RootModel from 'src/models/root'

type CellProps = {
  grow?: number
  id: number
  onClick: (id: number) => void
}
export default function Cell({ grow = 1, id, onClick }: CellProps) {
  const color = useModelSelector<RootModel, string>((model) => model.painting.cells[id].color)

  return (
    <div
      {...{
        id: `cell-${id}`,
        className: 'cell',
        onClick: () => onClick(id),
        style: {
          flexGrow: grow,
          backgroundColor: color,
        },
      }}
    >
      {id}
    </div>
  )
}
