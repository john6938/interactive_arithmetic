# interactive_arithmetic
Client-side JS for learners to practise arithmetic operations<br />

TODO:<br />
1. Multiplication (2 x 2 digital)<br />
   a. Regular method - steps, calculation, calculation in place, i.e. in vertical sum keeping place value<br />
       Options needed (1) leave empty or insert zero for ones place in second row of calculation (2) posiion of carried over digit to next column (e.g. sub or super script)<br />
   b. Block method (grid) - steps, calculation, calculation in place<br />
       Visual representation needed<br />
   c. Line method - steps, calculation, calculation in place<br />
       Visual representation needed<br />

''npx p5-server server''<br />
localhost:3000

#   update 1/27/24
p5 failing due to limited server stability -> switched to vitejs. <br />
still need to work on optimizing functionality of canvas closing, resizing. <br />
nodejs lts required <br />
```npm i``` <br />
```npm run dev``` for local hosting

#   update 2/5/24
resizing canvas for visualization <br />
add X button for closing canvas of visualization modal <br />
mannually set up port for ping optimization if desired <br />
```npm run dev -- -p "port_number"```

#   update 2/7/24
optimizing canvas for japanese method for more user-friendly visualization <br />
resizing and fixing bugs for regular method visualization <br />
still need to work on aligning products in regular method (may need to fix manually since fixing by code does not work)<br />
still need to change color for units and tens in visualization for a more user-friendly approach <br />
install latest vitejs version to avoid bugs <br />
```npm i -g vite``` for global installation

#   update 2/7/24
done with japanese method visualization. <br />
still need to work on remainders positioning of regular method. <br />

#   update 2/17/24
adding grid method visualization. <br />
still need to work on remainders positioning of regular method. <br />

#   update 2/18/24
done with grid method visualization. <br />
still need to work on remainders positioning of regular method. <br />

#   update 2/26/24
done.