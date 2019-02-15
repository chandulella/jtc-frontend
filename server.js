const express=require('express');
const path=require('path');
const app=express();


app.use(express.static(__dirname+'/dist/jtc-frontend', {index: false}));
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'dist/jtc-frontend', 'index.html'));
});

app.listen(process.env.PORT || 8080,()=>{
    console.log("Successful")
})