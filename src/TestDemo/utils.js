const angle = (vectorS,vectorE) => {
  const devider = Math.sqrt((vectorE.x*vectorE.x+vectorE.y*vectorE.y)*(vectorS.x*vectorS.x+vectorS.y*vectorS.y))
  let cosinput = (vectorE.x*vectorS.x+vectorE.y*vectorS.y)/devider
  const arccos = Math.acos(cosinput)
  let sininput = (-vectorE.x*vectorS.y+vectorS.x*vectorE.y)/devider
  const arcsin = Math.asin(sininput)

  const PIDevider = 180/Math.PI
  return sininput>0? arccos*PIDevider : -arccos*PIDevider
}

console.log('sg')

export default {
  angle
}
