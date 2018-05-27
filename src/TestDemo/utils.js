import { matrix2d, vec2 } from 'gl-matrix'

// matrix2d:[
//   [a,c,e],
//   [b,d,f]
// ]
const matrixObjToIns = (obj,ins) => {
  return [
    [ obj.a,obj.c,obj.e ],
    [ obj.b,obj.d,obj.f ]
  ]
}

const matrix2dMulVec2 = ( matrix2Ins, vec2Ins ) => {
  return matrix2Ins.map(mLine=>{
    let res = 0
    mLine.forEach((mSingle,index)=>{
      res += mLine[index]*vec2Ins[index]
    })
    return res
  })
}

const vec2GetPoint = (matrix2Obj, vec2Obj) => {
  let vecPoint = matrix2dMulVec2(matrixObjToIns(matrix2Obj),[ ...vec2Obj,1 ])
  return {
    x: vecPoint[0],
    y: vecPoint[1]
  }
}

const angle = (vectorS,vectorE) => {
  const devider = Math.sqrt((vectorE.x*vectorE.x+vectorE.y*vectorE.y)*(vectorS.x*vectorS.x+vectorS.y*vectorS.y))
  let cosinput = (vectorE.x*vectorS.x+vectorE.y*vectorS.y)/devider
  const arccos = Math.acos(cosinput)
  let sininput = (-vectorE.x*vectorS.y+vectorS.x*vectorE.y)/devider
  const arcsin = Math.asin(sininput)

  const PIDevider = 180/Math.PI
  return sininput>0? arccos*PIDevider : -arccos*PIDevider
}

export default {
  angle,
  vec2GetPoint
}
