import './Instruction.css'

const Instruction = () => {
  return (
    <div id='instruction'>
      <p>
        <span className='key'>Spacebar</span> to pause random movement
      </p>
      <p>
        <span className='key'>Shift</span> or <span className='key'>Ctrl</span> to select the other polygon
      </p>
    </div>
  )
}

export default Instruction