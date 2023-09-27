import './PolygonsList.css'

interface Props {
  polygonsCount: number,
  selectedPolygonId: number
}

const PolygonsList = ({polygonsCount, selectedPolygonId} : Props) => {
  const polygonIds = [...Array(polygonsCount).keys()].map(i => i);
  const elements = polygonIds.map(i => {
    const classNames = i == selectedPolygonId ? 'list active' : 'list';
    return <p key={`polygonList${i}`}><span className={classNames}>Polygon {i + 1}</span></p>
  })

  return (
    <div id='polygonsList'>
      {elements}
    </div>
  )
}

export default PolygonsList