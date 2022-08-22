import Clock from '../../components/Clock'
// import ReactDOM from 'react-dom/client'
import renderer from 'react-test-renderer'

// describe('<Clock />', () => {
//   it('renders correctly when given minutes and seconds', () => {
//     const root = ReactDOM.createRoot(document.createElement('div'))
//     root.render(<Clock minutes={10} seconds={20} />)
//     expect(root.childNodes[0].nodeName).toEqual('H2')
//   })
//   it('sets className to empty string if not given anything else', () => {
//     expect(<Clock minutes={10} seconds={20} />).toEqual(
//       <Clock className="" minutes={10} seconds={20} />,
//     )
//   })
// })

var clockRenderer = null

describe('when given minutes and seconds (TestRenderer)', () => {
  beforeEach(() => {
    clockRenderer = renderer.create(<Clock minutes={10} seconds={20} />)
  })
  it('renders properly', () => {
    expect(clockRenderer.toJSON()).toMatchSnapshot()
    expect(clockRenderer.toJSON().props).toMatchObject({
      className: expect.stringMatching(/Clock/),
    })
    expect(clockRenderer.toJSON().children).toEqual(
      expect.arrayContaining(['10', '20']),
    )
  })
  it('renders an h2 element', () => {
    expect(clockRenderer.toJSON().type).toEqual('h2')
  })
  it('renders a Clock classname', () => {
    expect(clockRenderer.toJSON().type).toEqual('h2')
  })
  it('renders time properly', () => {
    expect(clockRenderer.toJSON().children).toEqual(
      expect.arrayContaining(['10', '20']),
    )
  })
  xit('sets className to empty string if not given anything else', () => {
    expect(<Clock minutes={10} seconds={20} />).toEqual(
      <Clock className="" minutes={10} seconds={20} />,
    )
  })
})
