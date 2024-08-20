import { ReactModel } from '@croquet/react'
import { PaintingModel } from './painting'

class RootModel extends ReactModel {
  painting: PaintingModel

  init(options) {
    super.init(options)
    this.painting = PaintingModel.create(options)
  }
}

RootModel.register('RootModel')

export default RootModel
