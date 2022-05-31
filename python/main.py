import math, os, random
def mandelbrot(size, it, grad, cd, xo, yo, zo):
    os.system('clear')
    pixelsarray,l= [[]],4/size,
    rs1 = []
    for a in range(3):rs1.append(random.randint(0,cd))
    for a in range(size):
        for b in range(size): pixelsarray[a].append([0, 0, 0])
        pixelsarray.append([])
    l = 2/(size/2)
    for k in range(size):
        for a in range(size):
            b = ((a *  l)+(-2)+xo)+(((k* l)+(-2)+yo)*1j)
            num = 0
            itlen = 0
            for c in range(it):
                num = ((num*num)+(1/zo)*b)
                try:
                    if num > 2:
                        itlen = c+1
                        break
                except:
                    if num.real > 2 or num.imag > 2:
                        itlen = c+1
                        break
            rg = round((itlen+rs1[0])*grad)%255
            bg = round((itlen+rs1[1])*grad)%255
            gg = round((itlen+rs1[2])*grad)%255
            if itlen == 0:  pixelsarray[k][a] = [0,0,0]
            else: pixelsarray[k][a]= [rg,bg,gg]
    h,w,halflen = len(pixelsarray),len(pixelsarray[0]), len(pixelsarray) / 2
    for a2 in range(math.floor(h)):
       a = a2
       if h != math.floor(halflen): a = a2 * (len(pixelsarray)/(h*1))
       if a % ((len(pixelsarray)/h)*2) != 0:
          temp = ""
          for b2 in range(w): 
              b,clr = b2,[0,0,0,0,0,0]
              if w != len(pixelsarray[0]): b = b2 * (len(pixelsarray[0])/w)
              try:
                  for c in range(3): clr[c] = pixelsarray[math.floor(a)][math.floor(b)][c]
                  for c in range(3): clr[c+3] = pixelsarray[math.floor(a)-1][math.floor(b)][c]
              except Exception: pass
              temp += f"\033[38;2;{clr[0]};{clr[1]};{clr[2]}m\033[48;2;{clr[3]};{clr[4]};{clr[5]}m▄\033[0m"
          print(temp)
w_h = 400
iterations = 70
gradient = 0.7
cd = 200
xoff = -1
yoff = 0
zoom = 2
mandelbrot(w_h, iterations, gradient, cd, xoff, yoff, zoom)