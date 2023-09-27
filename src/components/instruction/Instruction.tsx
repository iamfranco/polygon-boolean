import { useEffect, useRef } from 'react'
import './Instruction.css'

const Instruction = () => {
  const spaceRef = useRef<HTMLSpanElement>(null);
  const shiftRef = useRef<HTMLSpanElement>(null);
  const controlRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Space') {
        spaceRef.current?.classList.add('active');
      }

      if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
        shiftRef.current?.classList.add('active');
      }

      if (e.code == 'ControlLeft' || e.code == 'ControlRight') {
        controlRef.current?.classList.add('active');
      }
    })

    document.addEventListener('keyup', (e) => {
      if (e.code == 'Space') {
        spaceRef.current?.classList.remove('active');
      }

      if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
        shiftRef.current?.classList.remove('active');
      }

      if (e.code == 'ControlLeft' || e.code == 'ControlRight') {
        controlRef.current?.classList.remove('active');
      }
    })
  }, [])

  return (
    <div id='instruction'>
      <p>
        <span className='key' ref={spaceRef}>Spacebar</span> to pause random movement
      </p>
      <p>
        <span className='key' ref={shiftRef}>Shift</span> or <span className='key' ref={controlRef}>Ctrl</span> to select the other polygon
      </p>
    </div>
  )
}

export default Instruction