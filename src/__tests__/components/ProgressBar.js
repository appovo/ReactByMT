import ProgressBar from '../../components/ProgressBar'
import renderer from 'react-test-renderer'

var progressBarRenderer = null

describe('when given width, size and color (TestRenderer)', () => {
  beforeEach(() => {
    progressBarRenderer = renderer.create(
      <ProgressBar percent={33} big={true} color="red" />,
    )
  })
  it('renders properly', () => {
    expect(progressBarRenderer.toJSON()).toMatchSnapshot()
    expect(progressBarRenderer.toJSON().props).toMatchObject({
      className: expect.stringMatching(/progress--color-red/),
    })
    expect(progressBarRenderer.toJSON().props).toMatchObject({
      className: expect.stringMatching(/progress--big/),
    })
    expect(progressBarRenderer.toJSON().children[0].props.style).toMatchObject({
      width: '33%',
    })
  })
  it('renders a div element', () => {
    expect(progressBarRenderer.toJSON().type).toEqual('div')
  })
  it('renders children properly', () => {
    expect(progressBarRenderer.toJSON().children[0].type).toEqual('div')
  })
})
