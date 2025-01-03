const timeFormatValidator = (...args)=>{
    //trimming values and checking their length
    let faultMsg="";
    for(let i=0;i<args.length;i++){
        if(typeof(args[i])==="string"){
            args[i]=args[i].trim();

            if(args[i].length!=5){
                faultMsg=faultMsg+` ${args[i]}, `
            }

            let checkHr = parseInt(args[i].split(":")[0]);
            let checkMin = parseInt(args[i].split(":")[1]);

            if(checkHr>24 || checkHr<0 || checkMin<0 || checkMin>59)
                return `Fail ! ${args[i]} is not correct 24-Hr Format (HH:MM)`

        }
    }
    if(faultMsg==="") 
        return 'Pass'
    else
        return `Fail ! ${faultMsg} format is wrong. Please provide in HH:MM`
}

const timeDurationInMinutes = (start,end)=>{
    // Expected Format 24Hr Format (HH:MM)
    if(start.length<4 || start.length>5 || end.length<4 || end.length>5){
        return `Invalid Format Given`
    }
    //finding the time duration in minutes
    let startHr = parseInt(start.split(":")[0]);
    let startMin = parseInt(start.split(":")[1]);

    let endHr = parseInt(end.split(":")[0]);
    let endMin = parseInt(end.split(":")[1]);
    
    let totalStartMinutes = startHr * 60 + startMin;
    let totalEndMinutes = endHr * 60 + endMin;

    let durationMinutes = totalEndMinutes - totalStartMinutes;
    return durationMinutes;
}

module.exports={
    timeFormatValidator,
    timeDurationInMinutes
}