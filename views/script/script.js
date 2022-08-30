
// $().ready(()=>{
//     //Ispis oglasa
//     const getOglasi = async()=>{
//         const response = await axios.get("http://localhost:5005/svi-oglasi");
//         const oglasi = response.data;
//         console.log(oglasi);
//         prikazOglasa(oglasi);
//     }
//     getOglasi();
//     function prikazOglasa(oglasi){
//         $('#prikazRedova').html("");

//          for(let i =0; i<oglasi.length;i++){
//             $('#prikazRedova').append(`
//             <tr>
//                 <td>${oglasi[i].kategorijaOglasa.naziv}</td>
//                 <td>${oglasi[i].kategorijaOglasa.kategorija}</td>
//                 <td>${oglasi[i].cena.vrednost+' '+oglasi[i].cena.valuta}</td>
//                 <td>${oglasi[i].opis}</td>
//                 <td>${oglasi[i].datum_isteka}</td>
//                 <td>${oglasi[i].tagovi}</td>

//                 <td>
//                     <a href="/oglas/edit/${oglasi[i].id} " class="btn btn-info">Izmeni</a>
//                 </td>
//                 <td>
//                     <a href="/oglas/delete/${oglasi[i].id} " class="btn btn-danger">Obrisi</a>
//                 </td>
//             </tr>
//             `);
//             $('')
                
              
//         }

//     }
// })