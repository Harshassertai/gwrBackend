module.exports.dateRanges = (startDate,endDate) => {
  const startingDate = new Date(startDate).getDate();
  let startingMonth = new Date(startDate).getMonth();
  console.log("starting month ",parseInt('0'+startingMonth.toString()))
  const startingYear = new Date(startDate).getFullYear();
  // console.log('startingDate',startingDate)
  // console.log('startingMonth',startingMonth)
  // console.log('startingYear', startingYear)
    const endingDate = new Date(endDate).getDate();
  const endingMonth = new Date(endDate).getMonth();
  const endingYear = new Date(endDate).getFullYear();
  // console.log('endingDate',endingDate)
  // console.log('endingMonth',endingMonth)
  // console.log('endingYear', endingYear)

  let dateDiffValue = endingDate - startingDate;
  let monthDiffValue = endingMonth - startingMonth;
  let newdatevalue = startingDate;
  let pusheddates = [];
  
  if (monthDiffValue == 0 && dateDiffValue <= 7) {
    if (startingMonth < 9) {
      startingMonth = startingMonth + 1
    for (let j = 0; j <= dateDiffValue; j++){
      pusheddates.push(`${startingYear}-${'0'+startingMonth.toString()}-${newdatevalue}`)
      newdatevalue++;
    }
    } else {
      for (let j = 0; j <= dateDiffValue; j++){
      pusheddates.push(`${startingYear}-${startingMonth+1}-${newdatevalue}`)
      newdatevalue++;
    }
    }
   
  } else {
    console.log('Select Upto 7 days Data only')
  }
  // else {
  //   for (let i = 0; i <= monthDiffValue; i++){
  //     for (let j = 0; j <= dateDiffValue; j++){
  //       if (newdatevalue == 31) {
  //         newdatevalue = 1
  //         startingMonth=startingMonth+1
  //       }
  //     pusheddates.push(`${startingYear}-${startingMonth+1}-${newdatevalue}`)
  //     newdatevalue++;
  //   } 
  // }
  // }
  console.log("Pushed Dates ---> ", pusheddates)
  return pusheddates;
}