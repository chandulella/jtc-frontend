const express=require('express');
const path=require('path');
const app=express();

//=====not for dynamic routes===
// app.use(express.static(__dirname+'/dist/frntend'));
// app.get('', function(req, res) {
//     res.sendFile(path.join(__dirname + '/dist/frntend/index.html'));
// });
console.log(__dirname)
app.use(express.static(__dirname+'/dist/jtc-frontend'));
app.get('*', (request, response) => {
    console.log(__dirname,__dirname+'/dist/jtc-frontend',__dirname+'dist/jtc-frontend')
	response.sendFile(path.join(__dirname, '/dist/jtc-frontend', 'index.html'));
});

app.listen(process.env.PORT || 8080,()=>{
    console.log("Successful")
})