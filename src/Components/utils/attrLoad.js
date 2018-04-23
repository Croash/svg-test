const situationDefault = [
  // 'delay',
  'path',
  'radius',
  'plot',
  'fill',
  'stroke',
  'load',
  'size',
  'width'
]

let animeLoad = (situationDefault) => (ins,attrConfig) => {
  const { config={ time:5000, easing:'<', delay: 0, attr:{} }, situation } = attrConfig
  let newIns = ins

  situationDefault.map(sit=>{
    if(situation[sit]!=undefined) {
      if(sit=='size') {
        if(Array.isArray(situation[sit])&&situation[sit].length==2)
          newIns = newIns.size(...situation[sit])
        else console.log('size should be a array with 2 parameters')
      }
      else 
      newIns = newIns[sit](situation[sit])
    }
  })

  return newIns
}

export default animeLoad(situationDefault)
