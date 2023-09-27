import { useEffect, useRef } from 'react'
import './Instruction.css'

const Instruction = () => {
  const spaceRef = useRef<HTMLSpanElement>(null);
  const arrowUpRef = useRef<HTMLSpanElement>(null);
  const arrowDownRef = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);
  const iRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Space') {
        spaceRef.current?.classList.add('active');
      }

      if (e.code == 'ArrowUp') {
        arrowUpRef.current?.classList.add('active');
      }

      if (e.code == 'ArrowDown') {
        arrowDownRef.current?.classList.add('active');
      }

      if (e.code == 'KeyA') {
        aRef.current?.classList.add('active');
      }

      if (e.code == 'KeyI') {
        iRef.current?.classList.add('active');
      }
    })

    document.addEventListener('keyup', (e) => {
      if (e.code == 'Space') {
        spaceRef.current?.classList.remove('active');
      }

      if (e.code == 'ArrowUp') {
        arrowUpRef.current?.classList.remove('active');
      }

      if (e.code == 'ArrowDown') {
        arrowDownRef.current?.classList.remove('active');
      }

      if (e.code == 'KeyA') {
        aRef.current?.classList.remove('active');
      }

      if (e.code == 'KeyI') {
        iRef.current?.classList.remove('active');
      }
    })
  }, [])

  return (
    <div id='instruction'>
      <p>
        <span className='key' ref={spaceRef}>Spacebar</span> to pause random movement
      </p>
      <p>
        <span className='key' ref={arrowUpRef}>↑</span> or <span className='key' ref={arrowDownRef}>↓</span> to select the other polygon
      </p>
      <p>
        <span className='key' ref={aRef}>A</span> to add a new polygon
      </p>
      <p>
        <span className='key' ref={iRef}>I</span> to intersect polygons
      </p>
    </div>
  )
}

export default Instruction