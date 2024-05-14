export function hexToRgbA(hex: string, opacity: number){
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      let c = hex.substring(1).split('')
      
      if(c.length == 3){
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
      }

      let n = +`0x${c.join('')}`

      return `rgba(${[(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',')}, ${opacity})`
  }
  
  return hex
}
