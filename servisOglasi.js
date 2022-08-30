const express = require('express');
const app = express();
const radSaOglasima = require('./moduli/radSaOglasima')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.get('/', (req,res)=>{
    res.send('Pocetna servis');
})



app.get('/svi-oglasi', (req,res)=>{
    res.send(radSaOglasima.allOglasi());
    
})
app.get('/oglas/:id', (req,res)=>{
    const izabranOglas = radSaOglasima.allOglasi().filter(oglas=>oglas.id == req.params.id);
    res.send(izabranOglas);
    
})
app.delete('/oglas/delete/:id',(req,res)=>{
    radSaOglasima.deleteOglasi(req.params.id);
    res.send(radSaOglasima.allOglasi());
})
app.put('/oglas/edit/:id',(req,res)=>{
    console.log(req.body);
    radSaOglasima.izmeniOglas(req.body);
    res.send(radSaOglasima.allOglasi());
})
app.post('/oglas/new',(req,res)=>{
    radSaOglasima.addOglas(req.body);
    res.send('Oglas je uspesno dodat');
})

app.get('/filtriraj',(req,res)=>{
    console.log(req.query);
    const filtriraniOglasi = radSaOglasima.getOglasBy(req.query.kategorija,req.query.dgd,req.query.ggd,req.query.dgc,req.query.ggc);
    res.send(filtriraniOglasi);
})


app.listen(5005,()=>{
    console.log("Servis je aktivan na portu 5005");
})