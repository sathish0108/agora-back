import React, { useEffect } from 'react'
import Hammer from 'hammerjs'

function ArEvents({canvas,box}) {
    useEffect(() => {
        var hammertime = new Hammer(canvas.current)
    
        hammertime.get('pinch').set({ enable: true })
        hammertime.get('pan').set({ enable: true })
        hammertime.on('pinchin', function (e) {
          e.preventDefault()
          e.threshold = 5
    
          if (box.current?.scale.x > 0) {
            box.current?.scale.set(box.current.scale.x - 0.005, box.current.scale.y - 0.005, box.current.scale.z - 0.005)
          }
        })
        hammertime.on('pinchout', function (e) {
          e.preventDefault()
          // e.threshold = 5
          // if (!active) {
          box.current?.scale.set(box.current.scale.x + 0.005, box.current.scale.y + 0.005, box.current.scale.z + 0.005)
          // }
        })
        hammertime.on('panright', function (e) {
          e.preventDefault()
          // e.threshold = 5
          
          // if (!active) {
          box.current?.rotation.set(0, box.current.rotation.y + 0.05, 0)
          // }
        })
        hammertime.on('panleft', function (e) {
          e.preventDefault()
          // e.threshold = 5
          // if (!active) {
          box.current?.rotation.set(0, box.current.rotation.y - 0.05, 0)
          // }
        })
        return(
          ()=>{

            hammertime.handlers = []
          }
          // document.removeEventListener('pointermove',undefined,false)
          // 
        )
      }, [])
  return (
  <>
  </>
  )
}

export default ArEvents