useDemo(
    ()=>{
        return 2;
    }, 
    [deps]
);

useDemo(()=>{}, argument2);
useDemo(argument1,[argument2]);
useDemo(argument1,argument2);

f(1, 2);
f(1, [2]);
f(()=>{},[2])

var demo = useDemo(
    ()=>{
        return 2;
    }, 
    [deps]
);

var demo = useDemo(()=>{}, argument2);
var demo = useDemo(argument1,[argument2]);
var demo = useDemo(argument1,argument2);

var result = f(1, 2);
var result = f(1, [2]);
var result = f(()=>{},[2])

useDemo(()=>{},[deps],2);
var demo = useDemo(()=>{},[deps],2);

