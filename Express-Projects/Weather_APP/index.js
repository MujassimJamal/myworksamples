var express = require('express') 
var app = express(); 
var request = require('request') 
var ejs = require('ejs')

app.set('view engine', 'ejs')

// Deafult location 
app.get('/', (req, res)=>{
    var city = req.params.city ;
    request('https://api.openweathermap.org/data/2.5/weather?q=Vadodara&appid=89a67aa889d2bc6f5ebb2fbe111b8b85&units=metric')
    .on('data', function(raw_data){
        var objData = JSON.parse(raw_data);
        var arrData = [objData] ;
        console.log(arrData) ;

        // //code for Date
        const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        const day = ['SUN','MON','TUE','WED','THU','FRI','SAT'] ;

        let current_datetime = new Date() ;
        let formatted_date = day[current_datetime.getDay()] + " | " + months[current_datetime.getMonth()] + 
        " | " + current_datetime.getDate()

        //icon api
        var icon_source = "http://openweathermap.org/img/wn/50d@2x.png"
        res.render('weather', {data:arrData, date:formatted_date, icon:icon_source})
    })

    .on("error", function(error){
        if(error) return console.log("Error Occured :" + error)
    })
})

// Parameterized Location 
app.get('/:city', (req, res)=>{
    var city = req.params.city ;
    request('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=89a67aa889d2bc6f5ebb2fbe111b8b85&units=metric')
    .on('data', function(raw_data){
        var objData = JSON.parse(raw_data);
        var arrData = [objData] ;
        console.log(arrData) ;

        // //code for Date
        const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        const day = ['SUN','MON','TUE','WED','THU','FRI','SAT'] ;

        let current_datetime = new Date() ;
        let formatted_date = day[current_datetime.getDay()] + " | " + months[current_datetime.getMonth()] + 
        " | " + current_datetime.getDate()

        //icon api
        var icon_source = "http://openweathermap.org/img/wn/" + arrData[0].weather[0].icon+ "@2x.png"
        res.render('weather', {data:arrData, date:formatted_date, icon:icon_source})
    })

    .on("error", function(error){
        if(error) return console.log("Error Occured :" + error)
    })
})

app.listen(7860, 'localhost',()=>{
    console.log('Server running at http://locahost:7860/') ;
})