const situationDefault = [
  // 'delay',
  'path',
  'radius',
  'plot',
  'fill',
  'stroke',
  'load',
  'size',
  'center',
  'width',
  'clear',
  'move'
]

let attrLoad = (sitList) => (ins,attrConfig) => {
  const situation = attrConfig
  let newIns = ins

  sitList.map(sit=>{
    if(situation[sit]!=undefined) {
      if(sit=='size'||sit=='move'||sit=='center') {
        if(Array.isArray(situation[sit])&&situation[sit].length==2) {
          newIns[sit](...situation[sit])
        }
        else console.log(`${sit} should be a array with 2 parameters`)
      }
      else if(sit=='path')
        newIns.d(situation[sit])
      else if(sit=='clear'||sit=='move') {
        console.log('sgsgsg',sit)
        newIns[sit]()
        
        return newIns
      }

      else newIns[sit](situation[sit])
    }
  })

  return newIns
}

export default attrLoad(situationDefault)
