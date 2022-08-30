const express = require('express');
const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));


app.get('/',async(req,res)=>{
    await axios.get(`http://localhost:5005/svi-oglasi`)
    .then(result=>{
        oglasi = result.data;
        res.render('index',{data:result.data});
        console.log(oglasi);
    })
    .catch(err=>{
        res.send('Doslo je do greske' + err);
    })
    
})
app.get('/oglas/new',(req,res)=>{
    res.render('novOglas');
})

app.post('/oglas/new',async (req,res)=>{
    const Cena = new Object();
    Cena.valuta = req.body.valuta;
    Cena.vrednost = req.body.vrednost;

    const Tagovi = new Object();
    Tagovi.tagovi = [];
    req.body.tagovi.split(" ").forEach(tag => {
        Tagovi.tagovi.push(tag);
    });

    const Email = new Object();
    Email.mail = [];
    //let regex = /\r/gi;
    req.body.privatni.split('\n').forEach(mejl=>{
        const privatni = new Object();
        privatni.tip = 'privatni';
        privatni.mail = mejl;
        Email.mail.push(privatni);
    })
    
    req.body.poslovni.split('\n').forEach(mejl=>{
        const poslovni = new Object();
        poslovni.tip = 'poslovni';
        poslovni.mail = mejl;
        Email.mail.push(poslovni);
    })

    await axios.post(`http://localhost:5005/oglas/new`,{
        id:0,
        kategorija:req.body.kategorija,
        cena:Cena,
        opis:req.body.text,
        datum:req.body.datum,
        email:Email,
        tagovi:Tagovi.tagovi


    })
    .then(result=>{
        res.redirect('/');
        //res.render('index',{data:result.data});
    })
    .catch(err=>{
        res.send('Doslo je do greske' + err);
    })
})

app.get('/oglas/edit/:id',async (req,res)=>{
    await axios.get(`http://localhost:5005/oglas/${req.params.id}`)
    
    .then(result=>{
        let tagovi = "";
        result.data[0].tagovi.forEach(tag => {
            tagovi += `${tag}` + ' ';
        });
        
        let privatni = "";
        let poslovni = "";
        result.data[0].email.mail.forEach(mejl=>{
            if(mejl.tip == "privatni"){
                privatni += `${mejl.mail+'\n'}`;
            }
            else{
                poslovni += `${mejl.mail+'\n'}`;
            }
        })
        
        res.render('izmeniOglas',{data:result.data,tagovi:tagovi,privatni:privatni,poslovni:poslovni});
        
    })
    .catch(err=>{
        res.send('Doslo je do greske' + err);
    })
    
    
})

app.get('/oglas/delete/:id',async (req,res)=>{
    await axios.delete(`http://localhost:5005/oglas/delete/${req.params.id}`)
    .then(result=>{
        res.render('index',{data:result.data});
    })
    .catch(err=>{
        res.send('Doslo je do greske' + err);
    })
})

app.post('/oglas/edit',async (req,res)=>{
    console.log(req.body);
    await axios.put(`http://localhost:5005/oglas/edit/${req.body.id}`,req.body)
    .then(result=>{
        console.log(result.data);
        res.redirect('/');
    })
    .catch(err=>{
        res.send('Doslo je do greske' + err);
    })
    
})

app.get('/filtriraj',async (req,res)=>{
    await axios.get(`http://localhost:5005/filtriraj?kategorija=${req.query.kategorija}&dgd=${req.query.donjaGranicaDatum}&ggd=${req.query.gornjaGranicaDatum}&dgc=${req.query.donjaGranicaCene}&ggc=${req.query.gornjaGranicaCene}`)
    .then(result=>{
        res.render('index',{data:result.data});
    })
    .catch(err=>{
        console.log('Doslo je do greske:' +err);
    })
    
})

app.listen(5000,()=>{
    console.log('Server je aktivan na portu 5000');
})