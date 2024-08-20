import Cell from './Cell'

type PaintingProps = {
  onClick: (cellId: number) => void
}
export default function Painting({ onClick }: PaintingProps) {
  return (
    <div className='painting'>
      <Row>
        <Col grow={20}>
          <Row>
            <Cell onClick={onClick} id={0} grow={2} />
            <Cell onClick={onClick} id={1} grow={4.4} />
            <Cell onClick={onClick} id={2} grow={3} />
          </Row>
          <Row grow={9}>
            <Col>
              <Cell onClick={onClick} id={3} grow={1} />
              <Cell onClick={onClick} id={4} grow={2} />
              <Cell onClick={onClick} id={5} grow={1} />
            </Col>
            <Col grow={9}>
              <Row grow={2}>
                <Cell onClick={onClick} id={6} grow={2} />
                <Col>
                  <Cell onClick={onClick} id={7} />
                  <Row>
                    <Cell onClick={onClick} id={8} />
                    <Cell onClick={onClick} id={9} />
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Cell onClick={onClick} id={10} grow={2} />
                  <Cell onClick={onClick} id={11} />
                </Col>
                <Col grow={2.5}>
                  <Row grow={8}>
                    <Col>
                      <Cell onClick={onClick} id={12} />
                      <Cell onClick={onClick} id={13} />
                      <Cell onClick={onClick} id={14} grow={0.3} />
                    </Col>
                    <Col>
                      <Cell onClick={onClick} id={15} grow={1} />
                      <Cell onClick={onClick} id={16} grow={1.5} />
                    </Col>
                  </Row>
                  <Cell onClick={onClick} id={17} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Cell onClick={onClick} id={18} grow={3.9} />
          <Cell onClick={onClick} id={19} />
        </Col>
      </Row>
    </div>
  )
}

function Row({ children, grow = 1, style }: { children?: any; grow?: number; style?: any }) {
  return (
    <div className='row' {...{ style: { ...style, flexGrow: grow } }}>
      {children}
    </div>
  )
}

function Col({ children, grow = 1, style }: { children?: any; grow?: number; style?: any }) {
  return (
    <div className='col' {...{ style: { ...style, flexGrow: grow } }}>
      {children}
    </div>
  )
}
